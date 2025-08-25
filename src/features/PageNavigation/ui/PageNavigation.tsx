import { NavLink } from 'react-router-dom';
import styles from './PageNavigation.module.scss';
import routes from '@/app/constants/routes';
import clsx from 'clsx';

type Props = {};

// Simple navigation bar component
export function PageNavigation({}: Props) {
  // Helper to generate link class names
  function getLinkClass(isActive: boolean) {
    return clsx(styles.link, { [styles.link_active]: isActive });
  }

  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>
        <li>
          <NavLink className={({ isActive }) => getLinkClass(isActive)} to={routes.garage}>
            GARAGE
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => getLinkClass(isActive)} to={routes.winners}>
            WINNERS
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
