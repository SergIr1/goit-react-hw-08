import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import css from './Navigation.module.css';
import clsx from 'clsx';

const getLinkStyles = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav>
      <NavLink className={getLinkStyles} to="/">
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink className={getLinkStyles} to="/tasks">
          Tasks
        </NavLink>
      )}
    </nav>
  );
}
