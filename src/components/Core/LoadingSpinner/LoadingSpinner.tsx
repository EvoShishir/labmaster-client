import React from "react";
import styles from "../../../styles/spinner.module.css";

type Props = {};

const LoadingSpinner = (props: Props) => {
  return (
    <div className={styles.dotSpinner}>
      <div className={styles.dotSpinner__dot}></div>
      <div className={styles.dotSpinner__dot}></div>
      <div className={styles.dotSpinner__dot}></div>
      <div className={styles.dotSpinner__dot}></div>
      <div className={styles.dotSpinner__dot}></div>
      <div className={styles.dotSpinner__dot}></div>
      <div className={styles.dotSpinner__dot}></div>
      <div className={styles.dotSpinner__dot}></div>
    </div>
  );
};

export default LoadingSpinner;
