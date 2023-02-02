import { NavLink } from 'react-router-dom';
import css from './Header.module.css';

const Header = () => {
  const changeActive = ({ isActive }) =>
    `${isActive ? css.navActive : css.navLink}`;

  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <NavLink to="/" className={changeActive}>
          Home
        </NavLink>
        <NavLink to="/movies" className={changeActive}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
