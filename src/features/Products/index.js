import React from 'react';
import List from '../_shared/List';
import { useSelector, useDispatch } from 'react-redux';
import useLayout from '../_shared/useLayout';
import useSearch from '../_shared/Search/useSearch';
import Search from '../_shared/Search';
import ProductForm from './ProductForm';
import { deleteProductAsync } from './store/actions';

export default function Products() {
    const { products, productStatus } = useSelector(s => s.products);

    const layout = useLayout(120, 200);
    const search = useSearch(products);

    return (
        <div className="page">
            <div className="page-actions" style={{ height: layout.actionsHeight }}>
                {layout.searchActive && <Search {...search.input} placeholder="Sök bland produkter.." />}
                {layout.formActive && <ProductForm updateHeight={layout.updateActionsHeight} />}
            </div>

            <List
                items={search.results}
                height={layout.listHeight}
                status={productStatus}
                onDelete={deleteProductAsync}
            />
        </div>
    )
}
