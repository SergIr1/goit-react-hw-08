import AppBar from '../AppBar/AppBar';
import css from './Layout.module.css';

export default function Layout() {
  return (
    <div className={css.container}>
      <AppBar />
    </div>
  );
}
