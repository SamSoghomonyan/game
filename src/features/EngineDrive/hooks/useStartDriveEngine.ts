import { useDispatch } from '@/app/redux/hooks';
import { CarID, carActions } from '@/etities/Car';
import { EngineDriveMode, engineAPI } from '@/etities/Engine';
import { useCallback, useState } from 'react';

type Props = {
  carID: CarID;
};

export function useStartDriveEngine({ carID }: Props) {
  // 0. Redux dispatch and loading state
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // mutation hooks for starting and driving engine
  const [startEngine] = engineAPI.useStartEngineMutation();
  const [driveEngine] = engineAPI.useDriveEngineMutation();

  // 1. Function to start and drive engine
  const startDriveEngine = useCallback(async () => {
    setIsLoading(true); // show loader

    try {
      // 1a. Start engine and update car specs
      try {
        const spec = await startEngine({ id: carID }).unwrap();
        dispatch(carActions.mutateCar({ id: carID, ...spec }));
      } catch (err) {
        // if start fails, mark as broken
        dispatch(carActions.mutateCar({ id: carID, drive: EngineDriveMode.BROKEN }));
        console.error('Engine start failed for car', carID, err);
      }

      // 1b. Start animation immediately
      dispatch(carActions.mutateCar({ id: carID, drive: EngineDriveMode.DRIVE }));

      // 1c. Drive engine request
      try {
        await driveEngine({ id: carID }).unwrap();
      } catch (err) {
        dispatch(carActions.mutateCar({ id: carID, drive: EngineDriveMode.BROKEN }));
        console.error('Drive engine failed for car', carID, err);
      }
    } catch (error) {
      console.error('useStartDriveEngine error:', error);
    } finally {
      setIsLoading(false); // hide loader
    }
  }, [startEngine, driveEngine, carID, dispatch]);

  // 2. Return hook values
  return {
    startDriveEngine,
    isLoading,
  };
}
