import { Button, ButtonKits } from '@/shared/ui/Button/Button';
import { WinnersOrder, WinnersParams, WinnersSort, winnerActions } from '@/etities/Winner';
import { useDispatch } from '@/app/redux/hooks';
import { useState } from 'react';

type Props = {
  btnText: string;      // Text displayed on the button
  sortBy: WinnersSort;  // The field to sort by
};

export function WinnersSorting({ btnText, sortBy }: Props) {
  // 0. Init
  const dispatch = useDispatch();
  const [order, setOrder] = useState<WinnersOrder>(WinnersOrder.ASC);

  // 1. Action to change sorting
  function handleSortClick() {
    // Update redux query parameters for winners
    dispatch(
      winnerActions.mutateWinnersQueryParams({
        [WinnersParams.SORT]: sortBy,
        [WinnersParams.ORDER]: order,
      })
    );

    // Toggle order for next click
    setOrder(order === WinnersOrder.ASC ? WinnersOrder.DESC : WinnersOrder.ASC);
  }

  // 2. Render
  return (
    <Button kit={ButtonKits.TABLE_M_YELLOW} onClick={handleSortClick}>
      {btnText} {order === WinnersOrder.ASC ? '↑' : '↓'} {/* optional visual cue */}
    </Button>
  );
}
