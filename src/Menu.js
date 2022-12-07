import { NavLink } from "react-router-dom";

const Menu = ({ clearForm }) => {
  return (
    <header>
      <ul className="wrapper">
        <li>
          <strong>CurrencyExchange</strong>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? `active` : null)}
            to="/"
          >
            CURRENCY CONVERTOR
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? `active` : null)}
            to="/history"
            onClick={clearForm}
          >
            VIEW CONVERSION HISTORY
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Menu;
