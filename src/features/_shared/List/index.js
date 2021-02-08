import React from 'react'
import ListItem from './ListItem';
import styles from './style.module.css';
import useList from './useList';

export default function List(props) {
    let { items, height, onDelete, onConfirm, placeholder = "Inga resultat..", status } = props;
    const { handleRemove, removeId, listItems } = useList(items, status);

    if (!listItems.length) {
        return <div className={styles.placeholder}>{placeholder}</div>
    }

    return (
        <div className={styles.list} style={{ height: height }}>
            {listItems.map(item =>
                <ListItem
                    item={item}
                    key={item.id}
                    remove={removeId === item.id}
                    onDelete={onDelete ? () => handleRemove(item, onDelete) : null}
                    onConfirm={onConfirm ? () => handleRemove(item, onConfirm) : null}
                />
            )}
        </div>
    )
}