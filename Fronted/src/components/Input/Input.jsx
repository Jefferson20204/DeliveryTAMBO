import "./Input.css";

const Input = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  autoComplete,
  required,
  disabled,
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
      disabled={disabled}
    />
  );
};

export default Input;
