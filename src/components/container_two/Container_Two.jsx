import React from "react";
import styles from "./Container_Two.module.scss";

export default function Container({ children }) {
  return <div className={styles.container_two}>{children}</div>;
}
