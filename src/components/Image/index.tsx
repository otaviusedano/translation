import { memo, useEffect, useState } from "react"
import { IoIosCheckmark } from "react-icons/io"
import Imgix, { Picture, Source } from "react-imgix"

import "./styles.scss"

interface IProps {
  src: string
  selecteds?: string[]
  isDowloaded?: boolean
  alt?: string
}

function ImageComponent({ src, selecteds, isDowloaded, alt }: IProps) {
  const [isSelected, setIsSelectd] = useState(false)

  const srcLoading =
    "https://images.pexels.com/photos/3023211/pexels-photo-3023211.jpeg"

  useEffect(() => {
    if (!selecteds?.length) setIsSelectd(false)
    return
  }, [selecteds])

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
    <div className={`image ${isDowloaded ? "isDowloaded" : ""} lazyload`}>
      <Imgix
        imgixParams={{ fit: "crop", ar: "1:1" }}
        sizes="(min-width: 1440px) 15vw, (min-width: 960px) 33vw, (min-width: 340px) 50vw"
        htmlAttributes={{
          onClick: () => (!isDowloaded ? handleSelectImage() : null),
          src: "data-src",
          srcSet: "data-srcset",
          sizes: "data-sizes",
          alt: alt,
          loading: "lazy",
        }}
        className={`${isSelected ? "selected" : ""} lazyload`}
        src={src ? src : srcLoading}
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
