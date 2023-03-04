import { PropsWithChildren } from "react"
import "./styles.scss"

export function ImagesContainer({ children }: PropsWithChildren) {
  return <div className="container__image">{children}</div>
}
