import './styles.scss'

export function HeaderContainer ({children}: any) {
  return (
    <header className='container__header'>
      {children}
    </header>
  )
}