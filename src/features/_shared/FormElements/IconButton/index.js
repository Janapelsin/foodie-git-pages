import { createElement } from 'react'
import styles from './style.module.css';

export default function IconButton({ icon, onClick = null }) {
    return (
        <button type="submit" className={styles.inlineButton} onClick={onClick}>
            {createElement(icon, { size: "20" })}
        </button>
    )
}
