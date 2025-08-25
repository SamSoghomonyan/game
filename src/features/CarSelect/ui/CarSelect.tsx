import { useDispatch } from '@/app/redux/hooks';
import { CarID, carActions } from '@/etities/Car';
import { Button, ButtonKits } from '@/shared/ui/Button/Button';

type Props = {
  carID: CarID;
  isSelected: boolean;
  className?: string;
};

export function CarSelect({ carID, isSelected, className }: Props) {
  const dispatch = useDispatch();

  function handleSelectCar() {
    dispatch(carActions.selectCar(carID));
  }

  // render select button
  return (
    <Button
      kit={ButtonKits.PRYMARY_S_BLUE} // use small blue button kit
      onClick={handleSelectCar}       // click handler
      disabled={isSelected}           // disable if already selected
      className={className}           // additional styling
    >
      SELECT
    </Button>
  );
}
