import { useDispatch } from '@/app/redux/hooks';
import { CarID, carActions } from '@/etities/Car';
import { EngineDriveMode, engineAPI } from '@/etities/Engine';
import { winnerActions } from '@/etities/Winner';
import { useCallback, useState } from 'react';

type Props = {
  carID: CarID;
};

export function useStopEngine({ carID }: Props) {
  // 0. Redux dispatch and loading state
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // mutation hook for stopping the engine
  const [stop] = engineAPI.useStopEngineMutation();

  // 1. Function to stop the engine
  const stopEngine = useCallback(() => {
    setIsLoading(true); // show loader

    // stop the engine request
    stop({ id: carID })
      .unwrap()
      .catch((err) => {
        console.error('Stop engine failed for car', carID, err);
      })
      .finally(() => {
        // reset car drive state
        dispatch(
          carActions.mutateCar({
            id: carID,
            drive: EngineDriveMode.RESET,
          })
        );

        // clear winner and race start time
        dispatch(winnerActions.mutateCurrentWinner(null));
        dispatch(winnerActions.setCurrentRaceStartTime(null));

        setIsLoading(false); // hide loader
      });
  }, [stop, carID, dispatch]);

  // 2. Return hook values
  return {
    stopEngine,
    isLoading,
  };
}
