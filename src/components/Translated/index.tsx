import './styles.scss'

export function Translated ({translated}: any) {
  return (
    <div className='translated'>
      <h1>{translated.text}</h1>
      <hr />
      {
        translated.translations.map((translation: any, key: any) => (
          <span key={key}>{translation}</span>
        ))
      }
    </div>
  )
}