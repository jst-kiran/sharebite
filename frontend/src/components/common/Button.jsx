/**
 * Reusable button using original project button styles (btn-primary, btn-secondary).
 */
function Button({
  children,
  variant = "primary",
  type = "button",
  className = "",
  disabled = false,
  ...rest
}) {
  const base = variant === "primary" ? "btn-primary" : "btn-secondary";
  return (
    <button type={type} className={`${base} ${className}`} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}

export default Button;
