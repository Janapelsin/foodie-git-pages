import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import List from '../_shared/List';
import Search from '../_shared/Search';
import useSearch from '../_shared/Search/useSearch';
import useLayout from '../_shared/useLayout'
import CategoryForm from './CategoryForm';
import { deleteCategoryAsync } from './store/categories/actions';

export default function Categories() {
    const { categories, categoryStatus } = useSelector(s => s.categories);

    const layout = useLayout(120, 200);
    const search = useSearch(categories);

    return (
        <div className="page">
            <div className="page-actions" style={{ height: layout.actionsHeight }}>
                {layout.searchActive && <Search {...search.input} placeholder="Sök bland kategorier.." />}
                {layout.formActive && <CategoryForm />}
            </div>

            <List
                items={search.results}
                status={categoryStatus}
                height={layout.listHeight}
                onDelete={deleteCategoryAsync}
            />
        </div>
    )
}
