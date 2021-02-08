import React from 'react';
import List from '../_shared/List';
import { useSelector, useDispatch } from 'react-redux';
import useLayout from '../_shared/useLayout';
import useSearch from '../_shared/Search/useSearch';
import Search from '../_shared/Search';
import { deleteGroceryAsync } from './store/actions';
import GroceryForm from './GroceryForm';

export default function Groceries() {
    const { groceries, groceryStatus } = useSelector(s => s.groceries);

    const layout = useLayout(120, 200);
    const search = useSearch(groceries);

    return (
        <div className="page">
            <div className="page-actions" style={{ height: layout.actionsHeight }}>
                {layout.searchActive && <Search {...search.input} placeholder="Sök i inköpslistan.." />}
                {layout.formActive && <GroceryForm updateHeight={layout.updateActionsHeight} />}
            </div>

            <List
                items={search.results}
                height={layout.listHeight}
                status={groceryStatus}
                onDelete={deleteGroceryAsync}
            />
        </div>
    )
}