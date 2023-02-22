import { IChildren } from "../../../interfaces/children"
import "./styles.scss"

export function PageContainer({ children }: IChildren) {
  return <div className="container__page">{children}</div>
}
