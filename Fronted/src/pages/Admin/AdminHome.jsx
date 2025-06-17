import { Outlet, Link, NavLink } from "react-router-dom";
import "./Css/AdminHome.css";

export default function AdminHome() {
  return (
    <div className="admin-home">
      <h1>Panel de administración</h1>
      <nav>
        <NavLink to={"/"}>Volver a la tienda</NavLink>
        <span> | </span>
        <Link to="products">Ver productos</Link>
        <span> | </span>
        <Link to="discounts">Ver descuentos</Link>
        <span> | </span>
        <Link to="categories">Ver categorias</Link>
        <span> | </span>
        <Link to="brands">Ver marcas</Link>
        <span> | </span>
        <Link to="productSection">Configuracion</Link>
        <span> | </span>
      </nav>
      <Outlet />
    </div>
  );
}
