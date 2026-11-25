import { useEffect, useState } from 'react'

const pad = (n: number) => String(n).padStart(2, '0')

/** Counts down from `initialSeconds`, ticking every second, and stops at zero. */
export function useCountdown(initialSeconds: number) {
  const [endTime] = useState(() => Date.now() + initialSeconds * 1000)
  const [remaining, setRemaining] = useState(initialSeconds)

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(Math.max(0, Math.round((endTime - Date.now()) / 1000)))
    }, 1000)
    return () => clearInterval(id)
  }, [endTime])

  return {
    days: pad(Math.floor(remaining / 86400)),
    hours: pad(Math.floor((remaining % 86400) / 3600)),
    minutes: pad(Math.floor((remaining % 3600) / 60)),
    seconds: pad(remaining % 60),
  }
}
