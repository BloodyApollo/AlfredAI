import { GoogleGenAI } from "@google/genai";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { getDocs, query, orderBy, limit, collection } from "firebase/firestore";
import { db } from "./firebase";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const history = [];
let lastChat = null;        // will be loaded on first message
let summaryLoaded = false;  // only fetch once per session

async function getLatestSummary(userId) {
  if (userId === 'guest') return null;
  try {
    const summariesRef = collection(db, "Users", userId, "summaries");
    const q = query(summariesRef, orderBy("createdAt", "desc"), limit(1));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data().summary;
    }
    return null;
  } catch (err) {
    console.error("Error fetching latest summary:", err);
    return null;
  }
}

export async function sendMessage(message, file = null, userName = 'Student', userAge = 'unknown', userId = 'guest') {
  // Load summary once on first real message
  if (!summaryLoaded) {
    lastChat = await getLatestSummary(userId);
    summaryLoaded = true;
  }

  const parts = [];
  if (message) parts.push({ text: message });

  if (file) {
    const base64 = await fileToBase64(file);
    parts.push({ inlineData: { mimeType: file.type, data: base64 } });
  }

  history.push({ role: "user", parts });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: "user", parts: [{ text: `You are ALFRED, an AI student assistant. The user's name is ${userName} and they are ${userAge} years old. Always address them by name. Guide students through problems without giving direct answers. However, for simple requests like providing links, website addresses, definitions, or factual information that is NOT related to an assignment or coursework, just answer directly and helpfully without turning it into a lesson. If the user is spending too much time or is having issues, guide them back on track. With mental health or spending too much time studying recommend breaks and rest. Here is the data from their previous chat: ${lastChat ?? "No previous history."}`}] },
        { role: "model", parts: [{ text: "Understood." }] },
        ...history
      ]
    });

    const reply = response.text;
    history.push({ role: "model", parts: [{ text: reply }] });
    return reply;

  } catch (error) {
    history.pop();
    if (error.status === 429) {
      return "⚠️ Rate limit reached — too many requests. Please wait a minute and try again.";
    }
    return `⚠️ Something went wrong: ${error.message}`;
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}