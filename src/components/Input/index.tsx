import "./styles.scss"

interface IProps {
  onChange: (value: string) => void
  setCountPage: React.Dispatch<React.SetStateAction<number>>
}

export function Input({ onChange, setCountPage }: IProps) {
  return (
    <input
      type="text"
      placeholder="Escreva em inglês"
      onChange={(e) => {
        onChange(e.target.value)
        setCountPage(1)
      }}
    />
  )
}
