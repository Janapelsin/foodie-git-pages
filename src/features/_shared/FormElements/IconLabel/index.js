import { createElement, Fragment } from 'react';
import styles from './style.module.css';

export default function IconLabel({ icon, hasErrors, isActive }) {
    const getLabelClass = () => {
        if (hasErrors) {
            return styles.labelIcon_error;
        }
        else if (isActive) {
            return styles.labelIcon_active;
        }

        return styles.labelIcon;
    }

    return (
        <Fragment>
            {createElement(icon, { className: getLabelClass() })}
        </Fragment>
    )
}
