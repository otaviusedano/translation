import { IChildren } from "../../../interfaces/children"
import "./styles.scss"

export function CreateContainer({ children }: IChildren) {
  return <div className="container__create">{children}</div>
}
