import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import "./styles.scss"

interface IProps {
  isNextPage?: boolean
  onClick?: () => void
}

export function SelectPage({ isNextPage, onClick }: IProps) {
  return (
    <div
      className="container__select-page"
      role={isNextPage ? "isNextPage" : ""}
    >
      {isNextPage ? (
        <button onClick={onClick}>
          <span>Próxima Página</span>
          <IoIosArrowForward />
        </button>
      ) : (
        <button onClick={onClick}>
          <IoIosArrowBack />
          <span>Página Anterior</span>
        </button>
      )}
    </div>
  )
}
