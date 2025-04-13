import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';
import clsx from 'clsx';

const getLinkStyles = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function AuthNav() {
  return (
    <div>
      <NavLink className={getLinkStyles} to="/register">
        Register
      </NavLink>
      <NavLink className={getLinkStyles} to="/login">
        Log In
      </NavLink>
    </div>
  );
}
