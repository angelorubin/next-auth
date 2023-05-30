import { useEffect, useState } from 'react'

export default function SnackBar({ message, visibility, bgColor, padding, time = 3000 }) {
  const [showElement, setShowElement] = useState(false)

  const hideElementAfterDelay = () => {
    setTimeout(() => {
      setShowElement(false)
    }, time) // Tempo em milissegundos (3 segundos = 3000 milissegundos)
  }

  useEffect(() => {
    setShowElement(visibility)
    hideElementAfterDelay()
  }, [showElement, visibility])

  return (
    <>
      {showElement && (
        <div className={`absolute flex flex-col items-center w-screen h-full`}>
          <div className={`relative inset-x-0 top-0 ${padding} ${bgColor}`}>{message}</div>
        </div>
      )}
    </>
  )
}
