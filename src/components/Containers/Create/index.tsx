import './styles.scss'

export function CreateContainer ({children}: any) {
  return (
    <div className='container__create'>
      {children}
    </div>
  )
}