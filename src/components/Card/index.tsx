import { useState } from 'react'
import './styles.scss'

export function Card ({translation, seleteds}: any) {
  const [ selected, setSelected ] = useState(false)

  function changeBackgroundColor (className: string, translation: any) {
    const index = seleteds.indexOf(translation);

    if (className === 'card ') {
      seleteds.push(translation)
      setSelected(true)
    }

    if (className === 'card selected') {

      if (index > -1) {
        seleteds.splice(index, 1)
      }
      setSelected(false)
    }
  }

  return (
    <div
      onClick={(e: any) => {
        changeBackgroundColor(e.target.className, translation)
      }}
      className={`card ${selected ? 'selected' : ''}`}
    >
      {translation}
    </div>
  )
}