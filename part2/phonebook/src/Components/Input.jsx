const Input = ({text, value, handleChange}) => (
    <div>
      {text} <input value={value} onChange={handleChange} />
    </div>
  )

  export default Input