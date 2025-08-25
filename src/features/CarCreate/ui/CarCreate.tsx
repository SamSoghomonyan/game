import styles from './CarCreate.module.scss';
import clsx from 'clsx';
import { Input, InputKits, InputTypes } from '@/shared/ui/Input/Input';
import { Button, ButtonKits } from '@/shared/ui/Button/Button';
import { useForm } from 'react-hook-form';
import { InputNames } from '../types/types';
import { validationOptions } from '@/shared/utils/validationForm';
import { CarRequest, carAPI } from '@/etities/Car';
import { useState } from 'react';
import { Modal } from '@/shared/ui/Modal/Modal';

type Props = {
  className?: string;
};

export function CarCreate({ className }: Props) {
  // mutation hook for creating car
  const [postCar, { data: responseData }] = carAPI.usePostCarMutation();

  // modal state
  const [isOpen, setOpen] = useState(false);

  // default form values
  const defaultFormValues: CarRequest = {
    name: '',
    color: '#ffffff',
  };

  // form hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CarRequest>({
    mode: 'onChange',
    defaultValues: defaultFormValues,
  });

  // function for creating car
  const onSubmit = (formValues: CarRequest) => {
    postCar(formValues)
      .unwrap()
      .then(() => {
        setOpen(true);
      })
      .catch((err) => {
        console.error('Error creating car', err);
      })
      .finally(() => {
        reset(defaultFormValues);
      });
  };

  return (
    <>
      {/* form for creating car */}
      <form
        className={clsx(styles.form, className)}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* input for car name */}
        <Input
          kit={InputKits.PRIMARY_M}
          placeholder="TYPE CAR BRAND"
          type={InputTypes.TEXT}
          register={register}
          options={validationOptions.TEXT_REQUIRED}
          name={InputNames.NAME}
          validationError={errors[InputNames.NAME]?.message}
        />

        {/* input for car color */}
        <Input
          kit={InputKits.COLOR_M}
          type={InputTypes.COLOR}
          register={register}
          options={validationOptions.COLOR_REQUIRED}
          name={InputNames.COLOR}
        />

        {/* submit button */}
        <Button
          kit={ButtonKits.PRYMARY_M_PURPLE}
          type="submit"
          disabled={!isValid}
        >
          CREATE
        </Button>
      </form>

      {/* modal that shows after car created */}
      <Modal isOpen={isOpen} onOpenChange={setOpen}>
        <article className={styles.created}>
          <h2>NEW CAR CREATED:</h2>
          <p>{responseData?.name?.toUpperCase()}</p>
        </article>
      </Modal>
    </>
  );
}
