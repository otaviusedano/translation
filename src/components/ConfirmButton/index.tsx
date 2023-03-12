import { PropsWithChildren } from "react"
import "./styles.scss"

interface IProps {
  children: React.ReactNode
  onClick: () => void
}

export function ConfirmButton({ children, onClick }: IProps) {
  return (
    <button className="confirmButton" onClick={onClick}>
      {children}
    </button>
  )
}
