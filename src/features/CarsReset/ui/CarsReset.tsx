import { Button, ButtonKits } from '@/shared/ui/Button/Button';
import ResetIcon from '@/shared/assets/icons/reset.svg?react';
import { useSelector } from '@/app/redux/hooks';
import { selectCar } from '@/etities/Car';
import { useStopEngineList } from '../hooks/useStopEngineList';

type Props = {
  className?: string;
};

export function CarsReset({ className }: Props) {
  // 0. Get car IDs and drive state from Redux
  const carIDs = useSelector(selectCar.carIDs) || [];
  const isAnyInDrive = useSelector(selectCar.isAnyInDrive);

  // 1. Get the hook for stopping engines
  const { stopEngineList, isLoading } = useStopEngineList({ carIDs });

  // 2. Handle button click
  function handleResetClick() {
    stopEngineList();
  }

  // 3. Render reset button
  return (
    <Button
      kit={ButtonKits.PRYMARY_M_PURPLE}     // medium purple button
      onClick={handleResetClick}            // click handler
      className={className}                 // optional styling
      disabled={isLoading || !isAnyInDrive} // disable if not driving or loading
    >
      <span>RESET</span>
      <ResetIcon />
    </Button>
  );
}
