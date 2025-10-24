import { useState } from 'react'

export default function Home() {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([
    { sender: 'Aetherion', text: 'Is Best listening, Hello Prince I’m Aetherion.' }
  ])
  const [loading, setLoading] = useState(false)

  async function sendMessage(e) {
    e.preventDefault()
    if (!message.trim()) return
    const newChat = [...chat, { sender: 'Prince', text: message }]
    setChat(newChat)
    setMessage('')
    setLoading(true)

    try {
      const res = await fetch('/api/remember', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_name: 'Prince Beckham', message })
      })
      const data = await res.json()
      if (data.reply) {
        setChat([...newChat, { sender: 'Aetherion', text: data.reply }])
      }
    } catch (err) {
      setChat([...newChat, { sender: 'Aetherion', text: '⚠️ Connection issue, please retry.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, skyblue, white)',
      fontFamily: 'Poppins, sans-serif'
    }}>
      <h1 style={{ fontSize: '2rem', color: '#0b2239', marginBottom: '1rem' }}>💠 Aetherion v1</h1>
      <div style={{
        width: '90%',
        maxWidth: '600px',
        height: '70vh',
        background: 'rgba(255,255,255,0.3)',
        backdropFilter: 'blur(12px)',
        borderRadius: '16px',
        padding: '1rem',
        overflowY: 'auto',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
      }}>
        {chat.map((msg, i) => (
          <div key={i} style={{
            textAlign: msg.sender === 'Aetherion' ? 'left' : 'right',
            marginBottom: '0.8rem'
          }}>
            <span style={{
              background: msg.sender === 'Aetherion' ? '#e3f2fd' : '#bbdefb',
              color: '#0b2239',
              padding: '10px 15px',
              borderRadius: '16px',
              display: 'inline-block',
              maxWidth: '80%'
            }}>
              <strong>{msg.sender}: </strong>{msg.text}
            </span>
          </div>
        ))}
        {loading && <p style={{ color: '#0b2239' }}>Aetherion is thinking...</p>}
      </div>
      <form onSubmit={sendMessage} style={{ marginTop: '1rem', width: '90%', maxWidth: '600px' }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Say something to Aetherion..."
          style={{
            width: '80%',
            padding: '0.8rem',
            border: 'none',
            borderRadius: '10px',
            outline: 'none',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            marginRight: '10px'
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.8rem 1.2rem',
            border: 'none',
            borderRadius: '10px',
            backgroundColor: '#0b2239',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          Send
        </button>
      </form>
    </div>
  )
}
