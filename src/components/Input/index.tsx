import "./styles.scss"

interface IProps {
  onChange: (value: string) => void
  value: string
}

export function Input({ onChange, value }: IProps) {
  return (
    <input
      type="text"
      placeholder="Escreva em inglês"
      value={value}
      onChange={(e) => {
        onChange(e.target.value)
      }}
    />
  )
}
