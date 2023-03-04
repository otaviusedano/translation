import { useState } from "react"
import { IoIosCheckmark } from "react-icons/io"
import Imgix from "react-imgix"

import "./styles.scss"
import "lazysizes"

export function Image({ src, selecteds, isDowloaded }: any) {
  const [isSelected, setIsSelectd] = useState(false)

  function handleClick() {
    setIsSelectd(!isSelected)

    if (!selecteds.includes(src)) selecteds.push(src)
    else {
      const index = selecteds.indexOf(src)
      if (index > -1) {
        selecteds.splice(index, 1)
      }
    }

    console.log(selecteds)
    return
  }

  return (
    <div className={`image ${isDowloaded ? "isDowloaded" : ""}`}>
      <Imgix
        imgixParams={{ fit: "crop", ar: "1:1" }}
        sizes="(min-width: 1440px) 18vw, (min-width: 960px) 33vw, (min-width: 340px) 50vw"
        htmlAttributes={{
          onClick: () => handleClick(),
          src: "data-src",
          srcSet: "data-srcset",
          sizes: "data-sizes",
        }}
        className={`lazyload ${isSelected ? "selected" : ""}`}
        src={src}
      />
      <IoIosCheckmark
        onClick={() => handleClick()}
        className={`icone ${isSelected ? "active" : ""}`}
        fontSize={64}
        color={"rgba(255, 255, 255, 0.87)"}
      />
    </div>
  )
}
