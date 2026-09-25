/**
 * InputField using original project form field styles.
 */
function InputField({ label, id, error, helperText, className = "", ...rest }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="field-label">
          {label}
        </label>
      )}
      <input id={id} className="field-input" {...rest} />
      {helperText && !error && (
        <p className="mt-1 text-xs text-ink/50">{helperText}</p>
      )}
      {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

export default InputField;
