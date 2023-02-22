import { FiX } from "react-icons/fi"

import "./styles.scss"

interface IProps {
  onClick: () => void
}

export function RemoveButton({ onClick }: IProps) {
  return <FiX onClick={() => onClick()} className="remove-button" />
}
