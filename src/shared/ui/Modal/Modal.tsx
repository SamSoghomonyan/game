import React from 'react';
import styles from './Modal.module.scss';
import { Modal as AriaModal, ModalOverlay } from 'react-aria-components';
import clsx from 'clsx';

export enum ModalKits {
  DEFAULT = 'default',
}

type Props = {
  isOpen: boolean;
  isDismissable?: boolean;
  kit?: ModalKits;
  onOpenChange: (isOpen: boolean) => void;
  children?: React.ReactNode;
};

export function Modal({
  isOpen,
  isDismissable = true,
  kit = ModalKits.DEFAULT,
  onOpenChange,
  children,
  ...props
}: Props) {
  return (
    <ModalOverlay
      isOpen={isOpen}
      isDismissable={isDismissable}
      className={clsx(styles.overlay, styles[`overlay_kit_${kit}`])}
      onOpenChange={onOpenChange}
    >
      <AriaModal className={clsx(styles.modal, styles[`modal_kit_${kit}`])} {...props}>
        {children}
      </AriaModal>
    </ModalOverlay>
  );
}
