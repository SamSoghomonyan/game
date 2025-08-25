import { Button, ButtonKits } from '@/shared/ui/Button/Button';
import PlayIcon from '@/shared/assets/icons/play.svg?react';
import styles from './Pagination.module.scss';

type Props = {
  currentPage: number;
  limit: number;
  totalCount: number;
  scrollPage: (page: number) => void;
};

export function Pagination({ currentPage, limit, totalCount, scrollPage }: Props) {
  // 0. Helpers to check if there are previous/next pages
  function hasNextPage() {
    if (!totalCount || !limit || !currentPage) return false;
    return currentPage * limit < totalCount;
  }

  function hasPrevPage() {
    if (!totalCount || !limit || !currentPage) return false;
    return currentPage > 1;
  }

  // 1. Actions for buttons
  function handleNext() {
    if (hasNextPage()) {
      scrollPage(currentPage + 1);
    }
  }

  function handlePrev() {
    if (hasPrevPage()) {
      scrollPage(currentPage - 1);
    }
  }

  // 2. Render
  return (
    <article className={styles.pagination}>
      {/* Previous Page Button */}
      <Button
        kit={ButtonKits.CLEAR}
        className={styles.pagination__prev}
        onClick={handlePrev}
        disabled={!hasPrevPage()}
      >
        <PlayIcon />
      </Button>

      {/* Current Page Indicator */}
      <p className={styles.pagination__page}>PAGE #{currentPage}</p>

      {/* Next Page Button */}
      <Button
        kit={ButtonKits.CLEAR}
        className={styles.pagination__next}
        onClick={handleNext}
        disabled={!hasNextPage()}
      >
        <PlayIcon />
      </Button>
    </article>
  );
}
