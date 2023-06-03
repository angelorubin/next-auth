import { useEffect, useState } from 'react'

export default function SnackBar({ message, visibility, bgColor, padding, time = 3000, margin }) {
  const [showElement, setShowElement] = useState(visibility)

  const hideElementAfterDelay = () => {
    setTimeout(() => {
      setShowElement(false)
    }, time)
  }

  useEffect(() => {
    setShowElement(visibility)
    hideElementAfterDelay()
  }, [showElement, visibility])

  return (
    <>
      {showElement && (
        <div className={`fixed top-0 left-50 ${margin}`}>
          <div className={`flex ${padding} ${bgColor}`}>{message}</div>
        </div>
      )}
    </>
  )
}
