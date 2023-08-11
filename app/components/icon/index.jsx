import { IconContext } from 'react-icons'

export default function Icon({ size, children }) {
  return (
    <IconContext.Provider value={{ size }}>
      <div>{children}</div>
    </IconContext.Provider>
  )
}
