import "./styles.scss"

interface IProps {
  onChange: (value: string) => void
}

export function Input({ onChange }: IProps) {
  return <input type="text" onChange={(e) => onChange(e.target.value)} />
}
