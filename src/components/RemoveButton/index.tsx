import { memo } from "react"
import { FiX } from "react-icons/fi"

import "./styles.scss"

interface IProps {
  onClick: () => void
}

export function RemoveButtonComponent({ onClick }: IProps) {
  return <FiX onClick={() => onClick()} className="remove-button" />
}

export const RemoveButton = memo(RemoveButtonComponent)
