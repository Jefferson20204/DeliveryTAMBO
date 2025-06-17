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
<<<<<<< HEAD
        id={id || name} // Usamos el id proporcionado o name como fallback
=======
        id={id || name}
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
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
