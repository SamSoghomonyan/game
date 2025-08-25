import { useDispatch } from '@/app/redux/hooks';
import { CarID, carActions } from '@/etities/Car';
import { EngineDriveMode, engineAPI } from '@/etities/Engine';
import { winnerActions } from '@/etities/Winner';
import { useCallback, useState } from 'react';

type Props = {
  carIDs: CarID[];
};

export function useStartDriveEngineList({ carIDs }: Props) {
  // 0. Redux and state
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // engine API mutations
  const [startEngine] = engineAPI.useStartEngineMutation();
  const [driveEngine] = engineAPI.useDriveEngineMutation();

  // 1. Function to start and drive engines
  const startDriveEngineList = useCallback(async () => {
    setIsLoading(true); // show loader

    try {
      // 1a. Start all engines and update car data
      for (let i = 0; i < carIDs.length; i++) {
        const id = carIDs[i];
        try {
          const spec = await startEngine({ id }).unwrap();
          // update car with engine spec
          dispatch(carActions.mutateCar({ id, ...spec }));
        } catch (err) {
          // if start engine fails, set car to BROKEN
          dispatch(carActions.mutateCar({ id, drive: EngineDriveMode.BROKEN }));
        }
      }

      // 1b. Memorize race start time
      dispatch(winnerActions.setCurrentRaceStartTime(Date.now()));

      // 1c. Start animation for all cars
      for (let i = 0; i < carIDs.length; i++) {
        const id = carIDs[i];
        dispatch(carActions.mutateCar({ id, drive: EngineDriveMode.DRIVE }));
      }

      // 1d. Send drive requests to server
      for (let i = 0; i < carIDs.length; i++) {
        const id = carIDs[i];
        try {
          await driveEngine({ id }).unwrap();
        } catch (err) {
          // if drive fails, mark car as BROKEN
          dispatch(carActions.mutateCar({ id, drive: EngineDriveMode.BROKEN }));
        }
      }
    } catch (error) {
      console.error('Error in startDriveEngineList:', error);
    } finally {
      setIsLoading(false); // hide loader
    }
  }, [carIDs, startEngine, driveEngine, dispatch]);

  // 2. Return values from hook
  return {
    startDriveEngineList,
    isLoading,
  };
}
