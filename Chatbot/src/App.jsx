import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import InputBox from './InputBox'
import ChatWindow from './ChatWindow'
import { sendMessage } from './gemini'

function Chat() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const params = new URLSearchParams(window.location.search)
  const userName = params.get('name') || 'Student'
  const userAge = params.get('age') || 'unknown'

  async function handleSend(message, file) {
    setMessages(prev => [...prev, { text: message || file?.name, sender: 'user' }])
    setLoading(true)
    const reply = await sendMessage(message, file, userName, userAge)
    setLoading(false)
    setMessages(prev => [...prev, { text: reply, sender: 'ai' }])
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
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App