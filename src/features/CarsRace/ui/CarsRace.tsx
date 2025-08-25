import { Button, ButtonKits } from '@/shared/ui/Button/Button';
import PlayIcon from '@/shared/assets/icons/play.svg?react';
import { useSelector } from 'react-redux';
import { selectCar } from '@/etities/Car';
import { useStartDriveEngineList } from '../hooks/useStartDriveEngineList';

type Props = {
  className?: string;
};

export function CarsRace({ className }: Props) {
  // 0. Get all car IDs from Redux store
  const carIDs = useSelector(selectCar.carIDs) || [];

  // 0a. Check if any car is currently driving
  const isAnyInDrive = useSelector(selectCar.isAnyInDrive);

  // 1. Get the custom hook to start engines and race
  const { startDriveEngineList, isLoading } = useStartDriveEngineList({ carIDs });

  // 2. Handle button click
  function handleStartRaceClick() {
    // start the race
    startDriveEngineList();
  }

  // 3. Render the race button
  return (
    <Button
      kit={ButtonKits.PRYMARY_M_GREEN} // medium green button style
      onClick={handleStartRaceClick}    // handle click
      className={className}             // optional className
      disabled={isLoading || isAnyInDrive} // disable if race already in progress
    >
      <span>RACE</span>
      <PlayIcon />
    </Button>
  );
}
