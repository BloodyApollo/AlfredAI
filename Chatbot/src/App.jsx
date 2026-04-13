import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import InputBox from './InputBox'
import ChatWindow from './ChatWindow'
import { sendMessage } from './gemini'
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { v4 as uuidv4 } from 'uuid';

function Chat() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const params = new URLSearchParams(window.location.search)
  const userName = params.get('name') || 'Student'
  const userAge = params.get('age') || 'unknown'
  const userId = params.get('uid') || 'guest'
  const [sessionId] = useState(() => uuidv4())

  
async function generateSummary(messages) {
    const fullChat = messages.map(m => `${m.sender}: ${m.text}`).join("\n");
    const summary = await sendMessage(
      `Summarize this chat so next time you talk to the user you can remember this. You will be the only one reading this summary so keep it as brief as you need:\n${fullChat}`,
      null,        // no file
      userName,
      userAge,
      userId       // add this
    );
    return summary;
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      if (messages.length === 0) return;

      try {
        const summary = await generateSummary(messages);
        await setDoc(doc(db, "Users", userId, "summaries", sessionId), {
          summary,
          createdAt: serverTimestamp()
        });
        console.log("Auto-saved chat summary");
      } catch (err) {
        console.error("Auto-save error:", err);
      }
    }, 3600000); // every hour

    return () => clearInterval(interval);
  }, [messages]);

  async function handleSend(message, file) {
    setMessages(prev => [...prev, { text: message || file?.name, sender: 'user' }]);
    setLoading(true);

    try {
      if (message.toLowerCase().includes("save")) {
        const summary = await generateSummary(messages);
        await setDoc(doc(db, "Users", userId, "summaries", sessionId), {
          summary,
          createdAt: serverTimestamp()
        });
        setMessages(prev => [...prev, { text: "✅ Your chats have been saved!", sender: "ai" }]);
      } else {
        const reply = await sendMessage(message, file, userName, userAge, userId);
        setMessages(prev => [...prev, { text: reply, sender: 'ai' }]);
      }
    } catch (err) {
      console.error("Error in handleSend:", err);
    }

    setLoading(false);
  }

  

  return (
    <div>
      <ChatWindow messages={messages} loading={loading} />
      <InputBox onSend={handleSend} />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App