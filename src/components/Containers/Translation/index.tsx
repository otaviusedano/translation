import { IChildren } from "../../../interfaces/children"
import "./styles.scss"

export function TranslationContainer({ children }: IChildren) {
  return <div className="container__translation">{children}</div>
}
