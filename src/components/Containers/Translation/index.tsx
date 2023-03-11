import { memo } from "react"
import { IChildren } from "../../../interfaces/children"
import "./styles.scss"

export function TranslationContainer({ children }: IChildren) {
  return <div className="container__translation">{children}</div>
}

// export const TranslationContainer = memo(TranslationContainerComponent)
