import { IChildren } from "../../interfaces/children"
import "./styles.scss"

export function Alert({ children }: IChildren) {
  return <span className="alert">{children}</span>
}
