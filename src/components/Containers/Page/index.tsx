import './styles.scss'

export function PageContainer ({children}: any) {
  return (
    <div className='container__page'>
      {children}
    </div>
  )
}