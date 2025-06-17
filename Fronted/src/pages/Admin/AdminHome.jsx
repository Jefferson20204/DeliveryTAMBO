import { Outlet, Link, NavLink } from "react-router-dom";
<<<<<<< HEAD
import ExportButtons from "../../components/Buttons/ExportButtons";

export default function AdminHome() {
  return (
    <div className="p-auto">
=======
import "./Css/AdminHome.css";

export default function AdminHome() {
  return (
    <div className="admin-home">
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
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
<<<<<<< HEAD
        <ExportButtons />
=======
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
      </nav>
      <Outlet />
    </div>
  );
}
