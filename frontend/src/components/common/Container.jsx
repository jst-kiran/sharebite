/**
 * Container component wrapping layout sections.
 */
function Container({ children, className = "", as: Component = "div", ...props }) {
  return (
    <Component className={`container-page ${className}`} {...props}>
      {children}
    </Component>
  );
}

export default Container;
