import styles from './GarageControls.module.scss';
import { CarsRace } from '@/features/CarsRace';
import { CarsReset } from '@/features/CarsReset';
import { CarCreate } from '@/features/CarCreate';
import { CarUpdate } from '@/features/CarUpdate';
import { CarsGenerate } from '@/features/CarsGenerate';

type Props = {};

export function GarageControls({}: Props) {
  return (
    <section className={styles.controls}>
      <div className={styles.play}>
        <CarsRace />
        <CarsReset />
      </div>
      <div className={styles.mutate}>
        <CarCreate />
        <CarUpdate />
      </div>
      <CarsGenerate className={styles.generate} />
    </section>
  );
}
