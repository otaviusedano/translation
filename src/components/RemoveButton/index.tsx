import { FiX } from "react-icons/fi";

import './styles.scss'

export function RemoveButton ({onClick}: any) {
  return (
    <FiX onClick={() => onClick()} className='remove-button' />
  )
}