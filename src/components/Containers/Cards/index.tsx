import "./styles.scss"

interface IProps {
  children?: React.ReactNode
  isSavedCards?: boolean
}

export function CardsContainer({ children, isSavedCards }: IProps) {
  return (
    <div className={`container__cards ${isSavedCards ? "saved" : ""}`}>
      {children}
    </div>
  )
}
