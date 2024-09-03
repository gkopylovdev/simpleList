import type React from 'react';
import {useEffect, useState} from 'react';

import styles from './ItemsList.module.css';
import {useAppSelector} from '../../../app/hooks';
import {selectItems} from '../listSlice';
import {debounce} from '../../../utils';
import {AnimatePresence, motion} from 'framer-motion';

const BORDER_RADIUS = 16;

export const ItemsList: React.FC = () => {
  const items = useAppSelector(selectItems);

  const [itemWidth, setItemWidth] = useState(window.innerWidth / 4);
  const [animationPerforming, setAnimationPerforming] = useState(false);

  useEffect(() => {
    const onResizeEvent = (event: Event) => {
      const target = event.target as Window;

      setItemWidth(target.innerWidth / 4);
    };

    //Дебаунс ради оптимизации
    const debouncedResizeEvent = debounce(onResizeEvent);

    window.addEventListener('resize', debouncedResizeEvent);

    return () => {
      window.removeEventListener('resize', debouncedResizeEvent);
    };
  }, []);

  return (
    <div
      className={styles.container}
      // Нужно выключать скроллбар во время анимации, потому что во время вылета айтема за экран лагает скроллбар
      style={{overflowX: animationPerforming ? 'hidden' : 'auto'}}
    >
      <AnimatePresence initial={false}>
        {items.map((item, idx) => (
            <motion.div
              key={item.id}
              className={styles.item}
              layout
              style={{
                backgroundColor: item.color,
                width: itemWidth,
                minWidth: itemWidth,
              }}
              onAnimationStart={() => setAnimationPerforming(true)}
              onAnimationComplete={() => setAnimationPerforming(false)}
              //Начинаем анимацию из-за экрана на ширину айтема
              initial={{x: -itemWidth}}
              //Анимируем до позиции 0 и анимируем радиусы у первого и последнего элементов
              animate={{
                x: 0,
                borderTopLeftRadius: idx === 0 ? BORDER_RADIUS : 0,
                borderBottomLeftRadius: idx === 0 ? BORDER_RADIUS : 0,
                borderTopRightRadius: idx === items.length - 1 ? BORDER_RADIUS : 0,
                borderBottomRightRadius: idx === items.length - 1 ? BORDER_RADIUS : 0,
              }}
              //При анмаунте проставляем позицию "ширина экрана + ширина айтема"
              exit={{x: window.innerWidth + itemWidth}}
              transition={{ease: 'easeIn', duration: 0.3}}
            ></motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
};
