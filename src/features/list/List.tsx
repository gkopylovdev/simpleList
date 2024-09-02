import type React from "react"
import styles from "./List.module.css"

import { Controls } from "./Controls"
import { ItemsList } from "./ItemsList"

export const List: React.FC = () => (
  <div className={styles.listFeature}>
    <Controls />

    <ItemsList />
  </div>
);
