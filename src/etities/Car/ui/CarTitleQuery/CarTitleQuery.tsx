import { CarID } from '../../types/types';
import { carAPI } from '../../api/backend';

type Props = {
  carID: CarID;
};

export function CarTitleQuery({ carID }: Props) {
  // 0. Init
  const { data: car } = carAPI.useGetCarQuery(carID);

  // Render
  if (!car) return null;
  return <p>{car?.name}</p>;
}
