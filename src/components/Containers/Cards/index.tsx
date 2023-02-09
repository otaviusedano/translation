import './styles.scss'

export function CardsContainer ({children, isSavedCards}: any) {
  return (
    <div className={`container__cards ${isSavedCards ? 'saved' : ''}`}>
      {children}
    </div>
  )
}