import { CarRequest, carAPI } from '@/etities/Car';
import { Button, ButtonKits } from '@/shared/ui/Button/Button';
import { faker } from '@faker-js/faker';

type Props = {
  className?: string;
};

export function CarsGenerate({ className }: Props) {
  // number of cars to generate
  const NUMBER_OF_CARS = 100;

  // mutation hook for creating a car
  const [postCar] = carAPI.usePostCarMutation();

  // function that generates random cars
  function handleGenerateCars() {
    for (let i = 0; i < NUMBER_OF_CARS; i++) {
      // create a random car object
      const newCar: CarRequest = {
        name: faker.vehicle.manufacturer() + ' ' + faker.vehicle.model(),
        color: faker.internet.color(),
      };

      // send request to backend
      postCar(newCar)
        .unwrap()
        .then(() => {
          console.log('Car created:', newCar.name);
        })
        .catch((err) => {
          console.error('Error creating car:', err);
        });
    }
  }

  // render the generate button
  return (
    <Button
      kit={ButtonKits.PRYMARY_M_GREEN}
      onClick={handleGenerateCars}
      className={className}
    >
      <span>GENERATE CARS</span>
    </Button>
  );
}
