import { useRef, useEffect } from 'react'

export default function useKey (key, cb) {
  const callbackRef = useRef(cb)

  useEffect(() => {
    callbackRef.current = cb
  })

  useEffect(() => {
    function handler (event) {
      if (event.ctrlKey && event.code === key) {
        callbackRef.current(event)
      }
    }

    document.addEventListener('keypress', handler)
    return () => document.removeEventListener('keypress', handler)
  }, [key])
}