import "./Input.css";

const Input = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  autoComplete,
  required,
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input"
      autoComplete={autoComplete}
      required={required}
    />
  );
};

export default Input;
