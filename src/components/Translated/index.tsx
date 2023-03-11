import { Image } from "../Image"

import { ITranslations } from "../../interfaces/translations"
import "./styles.scss"
import { RemoveButton } from "../RemoveButton"

interface IProps {
  selecteds: ITranslations
  onClick: (translation: ITranslations) => void
}

export function Translated({ selecteds, onClick }: IProps) {
  if (!selecteds.text) return null
  return (
    <div className="translated">
      <RemoveButton
        onClick={() => {
          onClick(selecteds)
        }}
      />
      <h1>{selecteds?.text}</h1>
      <hr />
      {selecteds?.images?.map((translation: string, index) => (
        <Image isDowloaded key={index} src={translation} />
      ))}
    </div>
  )
}
