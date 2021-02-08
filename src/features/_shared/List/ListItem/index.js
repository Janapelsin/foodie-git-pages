import { useRef } from 'react';
import styles from './style.module.css';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';
import useSwipe, { DIRECTION } from './useSwipe';

export default function ListItem({ item, onDelete, onConfirm, remove }) {
    const itemRef = useRef(null);
    const bgRef = useRef(null);

    const { onTouch, trigger, direction } = useSwipe(
        itemRef.current, bgRef.current, onDelete, onConfirm
    );

    const renderBackgroundContent = () => {
        if (onDelete && direction === DIRECTION.LEFT) {
            return (
                <div className={styles.backgroundContent_left}>
                    <p>Ta bort "{item.name}"?</p>
                    <FaTrash size="26" className={trigger ? styles.wobble : ""} />
                </div>
            )
        }
        else if (onConfirm && direction === DIRECTION.RIGHT) {
            return (
                <div className={styles.backgroundContent_right}>
                    <FaCheckCircle size="26" />
                    <p>Bekräfta "{item.name}"?</p>
                </div>
            )
        }
    }

    const listItemClass = () => {
        if (remove) {
            return styles.listItem_removed;
        }
        return styles.listItem;
    }

    return (
        <div
            className={remove ? styles.container_remove : styles.container}
            {...onTouch}
        >
            <div className={styles.background} ref={bgRef}>
                {renderBackgroundContent()}
            </div>

            <div className={styles.listItem} ref={itemRef}>
                <div>
                    <div className={styles.name}>
                        {item.name}
                    </div>
                    <div className={styles.description}>
                        {item.description ? item.description : ""}
                    </div>
                </div>

                <div className={styles.color} style={{ backgroundColor: item.colorHex }} />
            </div>
        </div>
    )
}
