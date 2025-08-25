import React from 'react';
import styles from './WinnersPage.module.scss';
import { Header } from '@/widgets/Header';
import { WinnersTable } from '@/widgets/WinnersTable';
import { WinnersBottomControls } from '@/widgets/WinnersBottomControls';
import { ErrorBoundary } from '@/widgets/ErrorBoundary';
import { Fallback } from '@/shared/ui/Fallback/Fallback';

export default function WinnersPage(): React.ReactNode {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.main__header}>WINNERS</h1>
        <ErrorBoundary fallback={(error) => <Fallback text={error?.message || 'Undefined error'}/>}>
          <WinnersTable />
        </ErrorBoundary>
        <WinnersBottomControls />
      </main>
    </>
  );
}
