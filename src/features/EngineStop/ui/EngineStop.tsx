import { useSelector } from '@/app/redux/hooks';
import { CarID, selectCar } from '@/etities/Car';
import { Button, ButtonKits } from '@/shared/ui/Button/Button';
import ResetIcon from '@/shared/assets/icons/reset.svg?react';
import { useStopEngine } from '../hooks/useStopEngine';

type Props = {
  carID: CarID;
  className?: string;
};

export function EngineStop({ carID, className }: Props) {
  // 0. Get the car data from Redux
  const car = useSelector(selectCar.car(carID));

  // 1. Get the hook to stop the engine
  const { stopEngine, isLoading } = useStopEngine({ carID });

  // 2. Handle button click
  function handleClick() {
    stopEngine();
  }

  // 3. Render stop button
  return (
    <Button
      kit={ButtonKits.PRYMARY_S_GREEN}      // small green button
      onClick={handleClick}                  // stop engine on click
      disabled={!car?.drive || isLoading}    // disable if car is not driving or loading
      className={className}                  // optional styling
    >
      <ResetIcon />
    </Button>
  );
}
