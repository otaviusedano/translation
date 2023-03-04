import { Image } from "../Image"

import { ITranslations } from "../../interfaces/translations"
import "./styles.scss"

interface IProps {
  selecteds: ITranslations
}

export function Translated({ selecteds }: IProps) {
  return (
    <div className="translated">
      <h1>{selecteds.text}</h1>
      <hr />
      {selecteds.images.map((translation: string, index) => (
        <Image isDowloaded key={index} src={translation} />
      ))}
    </div>
  )
}
