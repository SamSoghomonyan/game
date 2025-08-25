import { Signborder } from '@/shared/ui/Signborder/Signborder';
import styles from './Header.module.scss';
import { PageNavigation } from '@/features/PageNavigation';
import clsx from 'clsx';

type Props = {};

export function Header({}: Props) {
  return (
    <header className={styles.header}>
      <PageNavigation />
      <div className={clsx(styles.header__shevrons, styles.header__shevrons_bottom)}></div>
      <Signborder text="Async Race" style={{ margin: '0 auto' }} />
      <div className={clsx(styles.header__shevrons, styles.header__shevrons_top)}></div>
    </header>
  );
}
