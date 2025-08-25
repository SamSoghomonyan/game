import { carAPI } from '@/etities/Car';
import { CarID } from '@/etities/Car/types/types';
import { winnerAPI } from '@/etities/Winner';
import { Button, ButtonKits } from '@/shared/ui/Button/Button';

type Props = {
  carID: CarID;
  className?: string;
};

export function CarDelete({ carID, className }: Props) {
  const [deleteCar] = carAPI.useDeleteCarMutation();

  const [deleteWinner] = winnerAPI.useDeleteWinnerMutation();

  function handleDeleteCar() {
    deleteCar({ id: carID })
      .unwrap()
      .then(() => {
        deleteWinner({ id: carID })
          .unwrap()
          .catch((err) => {
            console.error('Error deleting winner', err);
          });
      })
      .catch((err) => {
        console.error('Error deleting car', err);
      });
  }

  return (
    <Button
      kit={ButtonKits.PRYMARY_S_PURPLE}
      onClick={handleDeleteCar}
      className={className}
    >
      REMOVE
    </Button>
  );
}
