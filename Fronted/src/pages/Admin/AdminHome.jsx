import { Outlet, Link, NavLink } from "react-router-dom";

export default function AdminHome() {
  return (
    <div className="m-1">
      <h1>Panel de administración</h1>
      <nav>
        <NavLink to={"/"}>Volver a la tienda</NavLink>
        <span> | </span>
        <Link to="products">Ver productos</Link>
        <span> | </span>
        <Link to="discounts">Ver descuentos</Link>
        <span> | </span>
        <Link to="categories">Ver categorias</Link>
      </nav>
      <Outlet />
    </div>
  );
}
