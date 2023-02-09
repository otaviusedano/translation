import './styles.scss'

export function Alert ({children}: any) {
  return (
    <span className='alert'>
      {children}
    </span>
  )
}