import "./styles.scss"

interface IProps {
  children: React.ReactNode
  onClick: () => void
}

export function Button({ children, onClick }: IProps) {
  return <button onClick={onClick}>{children}</button>
}
