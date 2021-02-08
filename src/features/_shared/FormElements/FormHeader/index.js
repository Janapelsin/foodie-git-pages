import React from 'react';
import styles from './style.module.css';
import { FaChevronCircleLeft } from 'react-icons/fa';
import IconButton from '../IconButton';

export default function FormHeader({ children, onNavBack }) {
    return (
        <div className={styles.formHeader}>
            <IconButton icon={FaChevronCircleLeft} onClick={onNavBack} />
            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}
