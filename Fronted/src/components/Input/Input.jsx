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
  label,
  id,
}) => {
  return (
    <div className="input-container">
      {label && (
        <label htmlFor={id || name} className="input-label">
          {label}
          {required && <span className="required-asterisk">*</span>}
        </label>
      )}
      <input
        id={id || name} // Usamos el id proporcionado o name como fallback
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
    </div>
  );
};

export default Input;
