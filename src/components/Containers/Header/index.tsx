import { IChildren } from "../../../interfaces/children"
import "./styles.scss"

export function HeaderContainer({ children }: IChildren) {
  return <header className="container__header">{children}</header>
}
