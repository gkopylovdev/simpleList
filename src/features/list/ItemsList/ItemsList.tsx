import type React from "React"
import { useEffect } from "React"

import styles from './ItemsList.module.css'
import { useAppSelector } from "../../../app/hooks"
import { selectItems } from "../listSlice"
import { useState } from "react"
import { debounce } from "../../../utils"

export const ItemsList: React.FC = () => {
  const items = useAppSelector(selectItems);

  const [itemWidth, setItemWidth] = useState(window.innerWidth / 4);

  useEffect(() => {
    const onResizeEvent = (event: Event) => {
      const target = event.target as Window;
      console.log('perform', target.innerWidth)

      setItemWidth(target.innerWidth / 4);
    };

    const debouncedResizeEvent = debounce(onResizeEvent)

    window.addEventListener('resize', debouncedResizeEvent);

    return () => {
      window.removeEventListener('resize', debouncedResizeEvent);
    }
  }, [])

  return <div className={styles.container}>
    {items.map((item, idx) => {
      console.log(itemWidth, idx, itemWidth * idx)
        return <div
          key={item.id}
          className={styles.item}
          style={{
            backgroundColor: item.color,
            width: itemWidth,
            minWidth: itemWidth,
          }}
        >
          {item.color} - {idx}
        </div>
      }
    )}
  </div>;
}