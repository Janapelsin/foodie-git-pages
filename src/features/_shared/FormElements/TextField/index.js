import React from 'react';
import styles from './style.module.css';

export default function TextField({ value, placeholder, onChange, list }) {
    return (
        <input
            className={styles.textField}
            list={list}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    )
}
