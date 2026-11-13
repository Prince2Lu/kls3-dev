import s from './home.module.css'

// Wordmark KLS3 : Syne 700, le « 3 » toujours en #4B7BF5
export default function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`${s.wordmark} ${className ?? ''}`}>
      KLS<span>3</span>
    </span>
  )
}
