import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import InputBox from './InputBox'
import ChatWindow from './ChatWindow'
import { sendMessage } from './gemini'
import { setDoc, doc, serverTimestamp, addDoc, collection } from "firebase/firestore";
import { getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "./firebase";
import { v4 as uuidv4 } from 'uuid'; // npm i uuid




function Chat() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const params = new URLSearchParams(window.location.search)
  const userName = params.get('name') || 'Student'
  const userAge = params.get('age') || 'unknown'
  const userId = "john2" // fix this
  const [sessionId] = useState(() => uuidv4()); // unique per page load
  
  useEffect(() => {
    const interval = setInterval(async () => {
      if (messages.length === 0) return;
  
      try {
        // Summarize the current messages
        const summary = await generateSummary(messages);
  
        // Save to Firestore
        await setDoc(collection(db, "Users", userId, "summaries", sessionId), {
          summary,
          createdAt: serverTimestamp()
        });
  
        console.log("Auto-saved chat summary");
      } catch (err) {
        console.error("Auto-save error:", err);
      }
    }, 3600000); // every 10 seconds
  
    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [messages]);

  async function handleSend(message, file) {
    setMessages(prev => [...prev, { text: message || file?.name, sender: 'user' }]);
    setLoading(true);
  
    const userId = userName; // fixed ID for testing
  
    try {
      if (message.toLowerCase().includes("save")) {
        // Summarize and save
        const summary = await generateSummary(messages);
        await addDoc(collection(db, "Users", userId, "summaries", sessionId), {
          summary,
          createdAt: serverTimestamp()
        });
        setMessages(prev => [...prev, { text: "✅ Your chats have been saved!", sender: "ai" }]);
      } else {
        // Normal AI response
        const reply = await sendMessage(message, file, userName, userAge);
        setMessages(prev => [...prev, { text: reply, sender: 'ai' }]);
      }
    } catch (err) {
      console.error("Error in handleSend:", err);
    }
  
    setLoading(false);
  }
  async function generateSummary(messages) {
    const fullChat = messages.map(m => `${m.sender}: ${m.text}`).join("\n");
    const summary = await sendMessage(`Summarize this chat so nexrt time you talk to the user you can rember this you will be the only one reading this summery so keep it as breif as you need:\n${fullChat}`);
    return summary;
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
