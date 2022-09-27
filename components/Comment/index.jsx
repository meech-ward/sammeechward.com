import styles from './Comment.module.css'
import Image from 'next/image'

export default function Comment({ text, username, avatar }) {
  let truncatedText = text.slice(0, 100)
  
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Image src={avatar} width={50} height={50}></Image>
        <p><span className={styles.username}>{username}</span> {truncatedText}{truncatedText.length < text.length && "..."}</p>
        <button>Like</button>
      </div>
      <button>Reply</button>
    </div>
  )
}