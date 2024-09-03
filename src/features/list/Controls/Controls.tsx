import type React from 'react';

import styles from './Controls.module.css';
import {addItem, removeItem} from '../listSlice';
import {useAppDispatch} from '../../../app/hooks';

export const Controls: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <button className={styles.control} onClick={() => dispatch(addItem())}>
        add item
      </button>
      <button className={styles.control} onClick={() => dispatch(removeItem())}>
        remove last item
      </button>
    </div>
  );
};
