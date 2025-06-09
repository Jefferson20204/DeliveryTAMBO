import logo from "../../assets/img/Logo/logo-tambo2.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bg-footer">
      <div className="px-auto">
        {/*logo y etiqueta de tambo*/}
        <div className="footer-section-container">
          <div className="footer-section">
            <img src={logo} alt="Logo Tambo" className="logo" />
          </div>
          {/*Primera columna "Recursos"*/}
          <div className="footer-section">
            <h5 className="footer-title">Recursos</h5>
            <ul className="footer-links">
              <li>
                <a href="#" className="link">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#" className="link">
                  Productos
                </a>
              </li>
              <li>
                <a href="#" className="link">
                  Precios
                </a>
              </li>
              <li>
                <a href="#" className="link">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="link">
                  Registrate
                </a>
              </li>
            </ul>
          </div>
          {/*Segunda columna "Reclamos"*/}
          <div className="footer-section">
            <h5 className="footer-title">Reclamos</h5>
            <ul className="footer-links">
              <li>
                <a href="#" className="link">
                  Libro de reclamaciones
                </a>
              </li>
              <li>
                <a href="#" className="link">
                  Sugerenicias
                </a>
              </li>
              <li>
                <a href="#" className="link">
                  Telefono
                </a>
              </li>
              <li>
                <a href="#" className="link">
                  Redes
                </a>
              </li>
            </ul>
          </div>

          {/*Tercera columna "Información"*/}
          <div className="footer-section">
            <h5 className="footer-title">Información</h5>
            <ul className="footer-links">
              <li>
                <a href="#" className="link">
                  Visión
                </a>
              </li>
              <li>
                <a href="#" className="link">
                  Misión
                </a>
              </li>
              <li>
                <a href="#" className="link">
                  Objetivos
                </a>
              </li>
              <li>
                <a href="#" className="link">
                  Resumen
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="copyright-footer">
          <a href="#" className="copyright-link">
            &copy; {new Date().getFullYear()} Tambo Express Los Olivos
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
