import styles from './CarUpdate.module.scss';
import clsx from 'clsx';
import { Input, InputKits, InputTypes } from '@/shared/ui/Input/Input';
import { Button, ButtonKits } from '@/shared/ui/Button/Button';
import { useForm } from 'react-hook-form';
import { InputNames } from '../types/types';
import { validationOptions } from '@/shared/utils/validationForm';
import { CarRequest, carAPI, carActions, selectCar } from '@/etities/Car';
import { useDispatch, useSelector } from '@/app/redux/hooks';
import { useEffect } from 'react';

type Props = {
  className?: string;
};

export function CarUpdate({ className }: Props) {
  // 0. Redux
  const dispatch = useDispatch();
  const car = useSelector(selectCar.selected);

  // 1. Mutation hook for updating a car
  const [putCar, { data, isSuccess }] = carAPI.useUpdateCarMutation();

  // 2. Default form values based on selected car
  const defaultFormValues = {
    [InputNames.NAME]: car?.name || '',
    [InputNames.COLOR]: car?.color || '#ffffff',
  };

  // 3. React Hook Form setup
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<CarRequest>({
    mode: 'onChange',
    criteriaMode: 'all',
    defaultValues: defaultFormValues,
  });

  // 4. Watch form changes to detect if values are changed
  const nameChanged = watch(InputNames.NAME) !== car?.name;
  const colorChanged = watch(InputNames.COLOR) !== car?.color;
  const isChanged = nameChanged || colorChanged;

  // 5. Reset form when selected car changes
  useEffect(() => {
    reset(defaultFormValues);
  }, [car, reset]);

  // 6. Function to update car
  function handleUpdateCar(formData: CarRequest) {
    if (!car) return;

    // send update request to backend
    putCar({ id: car.id, data: formData });

    // deselect the car after update
    dispatch(carActions.selectCar(null));
  }

  // 7. Apply updated car data to Redux after success
  useEffect(() => {
    if (isSuccess && data) {
      dispatch(carActions.mutateCar(data));
    }
  }, [data, isSuccess, dispatch]);

  // 8. Render form
  return (
    <form className={clsx(styles.form, className)} onSubmit={handleSubmit(handleUpdateCar)}>
      <Input
        kit={InputKits.PRIMARY_M}
        placeholder="SELECT CAR"
        type={InputTypes.TEXT}
        register={register}
        options={validationOptions.TEXT_REQUIRED}
        name={InputNames.NAME}
        validationError={errors[InputNames.NAME]?.message}
      />

      <Input
        kit={InputKits.COLOR_M}
        type={InputTypes.COLOR}
        register={register}
        options={validationOptions.COLOR_REQUIRED}
        name={InputNames.COLOR}
      />

      <Button
        kit={ButtonKits.PRYMARY_M_PURPLE}
        type="submit"
        disabled={!isChanged || !isValid} // only enable if something changed and form is valid
      >
        UPDATE
      </Button>
    </form>
  );
}
