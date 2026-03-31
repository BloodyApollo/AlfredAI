import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useEffect, useRef } from 'react'
import './ChatWindow.css'

function ChatWindow({ messages, loading }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <div key={index} className={`bubble ${msg.sender === 'ai' ? 'ai' : ''}`}>
          {msg.sender === 'ai'
            ? <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ href, children }) => (
                    <a href={href} target="_blank" rel="noreferrer" style={{ color: '#7eb8f7' }}>
                      {children}
                    </a>
                  )
                }}>{msg.text}</ReactMarkdown>
            : msg.text
          }
        </div>
      ))}
      {loading && (
        <div className="bubble ai typing">
          <span></span><span></span><span></span>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  )
}

export default ChatWindow