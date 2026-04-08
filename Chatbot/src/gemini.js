import { GoogleGenAI } from "@google/genai";
import { setDoc, doc, serverTimestamp, addDoc, collection } from "firebase/firestore";
import { getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "./firebase";
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const history = []

const lastChat = getLatestSummary("john2");
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result.split(',')[1])
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
async function getLatestSummary(userId) {
  try {
    const summariesRef = collection(db, "users", userId, "summaries");
    const q = query(summariesRef, orderBy("createdAt", "desc"), limit(1));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const latest = querySnapshot.docs[0].data();
      return latest.summary;  // only return the summary text
    }

    return null; // no summary found
  } catch (err) {
    console.error("Error fetching latest summary:", err);
    return null;
  }
}

export async function sendMessage(message, file = null, userName = 'Student', userAge = 'unknown') {
  const parts = []

  if (message) parts.push({ text: message })

  if (file) {
    const base64 = await fileToBase64(file)
    parts.push({
      inlineData: {
        mimeType: file.type,
        data: base64
      }
    })
  }

  history.push({ role: "user", parts })

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: "user", parts: [{ text: `You are ALFRED, an AI student assistant. The user's name is ${userName} and they are ${userAge} years old. Always address them by name. Guide students through problems without giving direct answers. However, for simple requests like providing links, website addresses, definitions, or factual information that is NOT related to an assignment or coursework, just answer directly and helpfully without turning it into a lesson. if the user is spending too much time or is having issues, guide them back on track. with mental health or spending too much time studying recomend breaks and rest: and here is the data from previous chat: ${lastChat}`}] },
        { role: "model", parts: [{ text: "Understood." }] },
        ...history
      ]
    })

    const reply = response.text
    console.log('Tokens used:', response.usageMetadata)

    history.push({
      role: "model",
      parts: [{ text: reply }]
    })

    return reply

  } catch (error) {
    history.pop()
    if (error.status === 429) {
      return "⚠️ Rate limit reached — too many requests. Please wait a minute and try again."
    }
    return `⚠️ Something went wrong: ${error.message}`
  }
}