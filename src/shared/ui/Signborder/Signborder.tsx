import styles from './Signborder.module.scss';
import React from 'react';

type Props = {
  text: string;
  style?: React.CSSProperties;
};

export function Signborder({ text, style }: Props) {
  return (
    <div className={styles.signborder} style={style}>
      <p className={styles.signborder__text}>
        {text}
      </p>
    </div>
  );
}
