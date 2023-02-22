import { ITranslated } from "../../interfaces/translated"
import { ITranslations } from "../../interfaces/translations"
import "./styles.scss"

interface IProps {
  translated: ITranslations
}

export function Translated({ translated }: IProps) {
  return (
    <div className="translated">
      <h1>{translated.text}</h1>
      <hr />
      {translated.translations.map((translation: string, key) => (
        <span key={key}>{translation}</span>
      ))}
    </div>
  )
}
