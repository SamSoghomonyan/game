import { useDispatch } from '@/app/redux/hooks';
import { CarID, carActions } from '@/etities/Car';
import { EngineDriveMode, engineAPI } from '@/etities/Engine';
import { winnerActions } from '@/etities/Winner';
import { useCallback, useState } from 'react';

type Props = {
  carIDs: CarID[];
};

export function useStopEngineList({ carIDs }: Props) {
  // 0. Redux dispatch and loading state
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // mutation for stopping engine
  const [stopEngine] = engineAPI.useStopEngineMutation();

  // 1. Function to stop all engines
  const stopEngineList = useCallback(() => {
    setIsLoading(true); // show loader

    // use try/catch for safety
    try {
      // loop through each car and stop its engine
      carIDs.forEach(async (id) => {
        try {
          await stopEngine({ id }).unwrap();
        } catch (err) {
          console.error('Error stopping engine for car', id, err);
        } finally {
          // reset drive mode in store
          dispatch(
            carActions.mutateCar({
              id,
              drive: EngineDriveMode.RESET,
            })
          );
        }
      });

      // reset winner info and race start time
      dispatch(winnerActions.mutateCurrentWinner(null));
      dispatch(winnerActions.setCurrentRaceStartTime(null));
    } catch (error) {
      console.error('useStopEngineList error:', error);
    } finally {
      setIsLoading(false); // hide loader
    }
  }, [carIDs, stopEngine, dispatch]);

  // 2. Return hook values
  return {
    stopEngineList,
    isLoading,
  };
}
