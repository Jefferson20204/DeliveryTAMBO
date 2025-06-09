export const MenuIcon = ({ size = 24, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24" // ViewBox ajustado para mejor alineación
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true" // Mejora accesibilidad
  >
    <path
      d="M6 12H18M6 15.5H18M6 8.5H18"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default MenuIcon;
