import React from 'react';
import styles from './style.module.css';

export default function ColorPicker({ colors = [], selectedId, onClick }) {

    if (!colors.length) {
        return (
            <div className={styles.colorPicker} style={{ color: "var(--secondary-text)" }}>
                Inga tillgängliga färger..
            </div>
        )
    }

    return (
        <div className={styles.colorPicker}>
            {colors.map(color => {
                return (
                    <div
                        className={color.id === selectedId ? styles.colorItem_active : styles.colorItem}
                        style={{ backgroundColor: color.hex }}
                        onClick={() => onClick(color.id)}
                        key={color.id}
                    />
                )
            })}
        </div>
    )
}
