import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [message, setMessage] = useState("")

  useEffect(() => {
    const intro = "Is Best listening, Hello Prince I’m Aetherion."
    let index = 0
    const typing = setInterval(() => {
      setMessage(intro.slice(0, index))
      index++
      if (index > intro.length) clearInterval(typing)
    }, 70)
    return () => clearInterval(typing)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.glass}>
        <h1 className={styles.title}>Aetherion</h1>
        <p className={styles.text}>{message}</p>
      </div>
    </div>
  )
}
