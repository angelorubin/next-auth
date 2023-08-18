import { IconContext } from 'react-icons'

export default function Icon({ size, children, style }) {
  return (
    <IconContext.Provider value={{ size, style: { ...style } }}>
      <div>{children}</div>
    </IconContext.Provider>
  )
}
