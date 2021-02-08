import { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CategoryForm from '../Categories/CategoryForm';
import SuggestionField from '../_shared/FormElements/SuggestionField';
import useTextField from '../_shared/FormElements/TextField/useTextField';
import { FaTag, FaShoppingBag, FaPlus } from 'react-icons/fa';
import IconLabel from '../_shared/FormElements/IconLabel';
import TextField from '../_shared/FormElements/TextField';
import IconButton from '../_shared/FormElements/IconButton';
import FormHeader from '../_shared/FormElements/FormHeader';
import { addProductAsync } from './store/actions';
import { ADD_FAILED, ADD_SUCCESS } from '../../store/statusTypes';

const STEP = {
    PRODUCT: "PRODUCT",
    CATEGORY: "CATEGORY",
}

export default function ProductForm({ updateHeight, callback, initialProductName }) {
    const { products, productStatus } = useSelector(s => s.products);
    const { categories } = useSelector(s => s.categories);
    const { currentUserId } = useSelector(s => s.user);
    const dispatch = useDispatch();

    const [formStep, setFormStep] = useState(STEP.PRODUCT);

    const productName = useTextField(1, 30, initialProductName);
    const categoryName = useTextField(1, 30);

    useEffect(() => {
        if (productStatus === ADD_SUCCESS) {
            if (callback) {
                callback(productName.value);
                return;
            }

            productName.reset();
            categoryName.reset();
        }
        else if (productStatus === ADD_FAILED) {
            // notify user
            console.log("Det gick inte att lägga till produkten");
        }
    }, [productStatus])

    useEffect(() => {
        if (formStep === STEP.PRODUCT) {
            updateHeight(200);
        }
        else if (formStep === STEP.CATEGORY) {
            updateHeight(300);
        }
    }, [formStep])

    const onSubmit = (e) => {
        e.preventDefault();

        const productError = productName.onChange(productName.value);
        const categoryError = categoryName.onChange(categoryName.value);

        if (productError || categoryError) {
            return;
        }

        const categoryFound = categories.find(c => c.name.toUpperCase() === categoryName.value.toUpperCase());
        const productExists = products.find(p => p.name.toUpperCase() === productName.value.toUpperCase());

        if (!categoryFound) {
            setFormStep(STEP.CATEGORY);
            return;
        }
        else if (productExists) {
            // notify user
            console.log("Produkten finns redan");
            return;
        }

        const addProduct = {
            name: productName.value,
            category: {
                id: categoryFound.id,
                name: categoryFound.name,
                color: {
                    id: categoryFound.colorId,
                    hex: categoryFound.colorHex
                }
            }
        }

        dispatch(addProductAsync(addProduct, currentUserId));
    }

    const onAddCategory = (name) => {
        categoryName.onChange(name);
        setFormStep(STEP.PRODUCT);
    }

    return (
        <Fragment>
            {formStep === STEP.PRODUCT &&
                <form className="form" onSubmit={onSubmit}>
                    <div className="form-row">
                        <IconLabel icon={FaShoppingBag} hasErrors={productName.error} />
                        <TextField
                            {...productName}
                            placeholder="Vad heter produkten?"
                        />
                        <IconButton icon={FaPlus} />
                    </div>
                    <div className="form-row">
                        <IconLabel icon={FaTag} hasErrors={categoryName.error} />
                        <SuggestionField
                            placeholder="Välj kategori.."
                            options={categories}
                            {...categoryName}
                        />
                    </div>
                </form>
            }
            {formStep === STEP.CATEGORY &&
                <Fragment>
                    <FormHeader onNavBack={() => setFormStep(STEP.PRODUCT)}>
                        Kategorin hittades inte.. <br />
                        Lägg till den nedan
                    </FormHeader>
                    <CategoryForm
                        callback={onAddCategory}
                        initialCategoryName={categoryName.value}
                    />
                </Fragment>
            }
        </Fragment>
    )
}
