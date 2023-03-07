import { memo, useState } from "react"
import { IoIosCheckmark } from "react-icons/io"
import Imgix from "react-imgix"

import "./styles.scss"

interface IProps {
  src: string
  selecteds?: string[]
  isDowloaded?: boolean
  alt?: string
}

function ImageComponent({ src, selecteds, isDowloaded, alt }: IProps) {
  const [isSelected, setIsSelectd] = useState(false)

  function handleSelectImage() {
    setIsSelectd(!isSelected)

    if (!selecteds?.includes(src)) selecteds?.push(src)
    else {
      const index = selecteds.indexOf(src)
      if (index > -1) {
        selecteds?.splice(index, 1)
      }
    }

    return
  }

  return (
    <div className={`image ${isDowloaded ? "isDowloaded" : ""}`}>
      <Imgix
        imgixParams={{ fit: "crop", ar: "1:1" }}
        sizes="(min-width: 1440px) 15vw, (min-width: 960px) 33vw, (min-width: 340px) 50vw"
        htmlAttributes={{
          onClick: () => (!isDowloaded ? handleSelectImage() : null),
          src: "data-src",
          srcSet: "data-srcset",
          sizes: "data-sizes",
          alt: alt,
        }}
        className={`${isSelected ? "selected" : ""} lazyload`}
        src={src}
      />
      <IoIosCheckmark
        onClick={() => handleSelectImage()}
        className={`icone ${isSelected ? "active" : ""}`}
        fontSize={64}
        color={"rgba(255, 255, 255, 0.87)"}
      />
    </div>
  )
}

export const Image = memo(ImageComponent)
