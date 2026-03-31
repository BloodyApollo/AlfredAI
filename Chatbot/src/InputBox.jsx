import { useState, useRef } from 'react'
import './InputBox.css'

function InputBox({ onSend }) {
  const [message, setMessage] = useState('')
  const [file, setFile] = useState(null)
  const fileRef = useRef(null)

  function handleFile(e) {
    setFile(e.target.files[0])
  }

  function handleSend() {
    if (!message && !file) return
    onSend(message, file)
    setMessage('')
    setFile(null)
    fileRef.current.value = ''
  }

  return (
    <div className="container">
      <label className="file-label" htmlFor="file-upload">
        📎 {file ? file.name : 'Attach'}
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".pdf, image/*"
        ref={fileRef}
        onChange={handleFile}
        className="file-input"
      />
      <input
        className="input"
        type="text"
        placeholder="Type something..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button className="button" onClick={handleSend}>Send</button>
    </div>
  )
}

export default InputBox