import { Link, Outlet } from "react-router-dom";
//import React from "react";

export function Layount(estado) {
  const setPagina = estado.setPagina;
  const cerrarNav = estado.setNav;
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/" onClick={() => [setPagina("Home"), cerrarNav(false)]}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/Default"
              onClick={() => [setPagina("Default"), cerrarNav(false)]}
            >
              Default
            </Link>
          </li>
          <li>
            <Link
              to="/Catalogo"
              onClick={() => [setPagina("Catalogo"), cerrarNav(false)]}
            >
              Catalogo
            </Link>
          </li>
          <li>
            <Link
              to="/Login"
              onClick={() => [setPagina("Login"), cerrarNav(false)]}
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/Reservas"
              onClick={() => [setPagina("Reservas"), cerrarNav(false)]}
            >
              Reservas
            </Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
  //
}
