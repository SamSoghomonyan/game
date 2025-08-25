import { useSelector } from '@/app/redux/hooks';
import { CarID, selectCar } from '@/etities/Car';
import { Button, ButtonKits } from '@/shared/ui/Button/Button';
import { useStartDriveEngine } from '../hooks/useStartDriveEngine';
import PlayIcon from '@/shared/assets/icons/play.svg?react';

type Props = {
  carID: CarID;
  className?: string;
};

export function EngineDrive({ carID, className }: Props) {
  // 0. Get the car data from Redux
  const car = useSelector(selectCar.car(carID));

  // 1. Get the hook to start the engine
  const { startDriveEngine, isLoading } = useStartDriveEngine({ carID });

  // 2. Handle click event
  function handleClick() {
    startDriveEngine();
  }

  // 3. Render button
  return (
    <Button
      kit={ButtonKits.PRYMARY_S_YELLOW}      // small yellow button
      onClick={handleClick}                   // start engine on click
      disabled={!!car?.drive || isLoading}    // disable if car is already driving or loading
      className={className}                   // optional extra styling
    >
      <PlayIcon />
    </Button>
  );
}
