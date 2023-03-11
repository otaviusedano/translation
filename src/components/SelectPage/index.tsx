import { memo, useMemo } from "react"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import "./styles.scss"

interface IProps {
  isNextPage?: boolean
  countPage: number
  setCountPage: React.Dispatch<React.SetStateAction<number>>
}

export function SelectPage({ isNextPage, countPage, setCountPage }: IProps) {
  function handleNextPage() {
    setCountPage(countPage + 1)
  }

  function handlePrevPage() {
    if (countPage === 1) return
    setCountPage(countPage - 1)
  }

  return (
    <div
      className="container__select-page lazyload"
      role={isNextPage ? "isNextPage" : ""}
    >
      {isNextPage ? (
        <button onClick={() => handleNextPage()}>
          <span>Próxima Página</span>
          <IoIosArrowForward />
        </button>
      ) : (
        <button onClick={() => handlePrevPage()}>
          <IoIosArrowBack />
          <span>Página Anterior</span>
        </button>
      )}
    </div>
  )
}
