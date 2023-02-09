import './styles.scss'

export function Input ({onChange}: any) {
  return (
    <input type="text" onChange={(e) => onChange(e.target.value)} />
  )
}