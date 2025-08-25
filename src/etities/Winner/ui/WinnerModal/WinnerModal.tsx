import styles from './WinnerModal.module.scss';

import { useSelector } from '@/app/redux/hooks';
import { selectWinner } from '../..';
import { Modal } from '@/shared/ui/Modal/Modal';
import { useEffect, useState } from 'react';
import { selectCar } from '@/etities/Car';
import { usePostPutWinner } from '../../hooks/usePostPutWinner';

type Props = {};

export function WinnerModal({}: Props) {
  // 0. Init
  const winner = useSelector(selectWinner.currentWinner);
  const isWinnerPosted = useSelector(selectWinner.isCurrentWinnerPosted);
  const car = useSelector(selectCar.car(winner?.id));
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (winner && !isWinnerPosted) setOpen(true);
    if (!winner && isWinnerPosted) setOpen(false);
  }, [winner]);

  // 1. Post/Put winner

  const { isLoading } = usePostPutWinner();

  // 1. Render

  if (!winner || !car) return null;

  return (
    <Modal isOpen={isOpen} onOpenChange={setOpen}>
      <article className={styles.winner}>
        <h2>THE WINNER IS:</h2>
        <p>{car?.name?.toUpperCase()}</p>
        <p>{`TIME: ${winner?.time} S`}</p>

        {isLoading && <p>Saving...</p>}
      </article>
    </Modal>
  );
}
