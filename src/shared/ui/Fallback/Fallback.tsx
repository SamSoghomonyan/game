import styles from './Fallback.module.scss';

type Props = {
  text: string;
};

export function Fallback({ text }: Props) {
  return (
    <section className={styles.fallback}>
      <p className={styles.fallback__msg}>
        {text}
      </p>
    </section>
  );
}
