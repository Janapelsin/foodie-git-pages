import { Fragment, useEffect, useState } from 'react'
import IconButton from '../_shared/FormElements/IconButton';
import IconLabel from '../_shared/FormElements/IconLabel';
import SuggestionField from '../_shared/FormElements/SuggestionField';
import TextField from '../_shared/FormElements/TextField';
import useTextField from '../_shared/FormElements/TextField/useTextField';
import { FaShoppingBag, FaComment, FaPlus } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_SUCCESS, ADD_FAILED } from '../../store/statusTypes';
import ProductForm from '../Products/ProductForm';
import { addGroceryAsync } from './store/actions';
import FormHeader from '../_shared/FormElements/FormHeader';

const STEP = {
    GROCERY: "GROCERY",
    PRODUCT: "PRODUCT"
}

export default function GroceryForm({ updateHeight }) {
    const { groceries, groceryStatus } = useSelector(s => s.groceries);
    const { currentUserId } = useSelector(s => s.user);
    const { products } = useSelector(s => s.products);
    const dispatch = useDispatch();

    const [formStep, setFormStep] = useState(STEP.GROCERY)

    const productName = useTextField(1, 30);
    const description = useTextField();

    useEffect(() => {
        if (formStep === STEP.GROCERY) {
            updateHeight(200);
        }
        else if (formStep === STEP.PRODUCT) {
            updateHeight(300);
        }
    }, [formStep])

    useEffect(() => {
        if (groceryStatus === ADD_SUCCESS) {
            productName.reset();
            description.reset();
        }
        else if (groceryStatus === ADD_FAILED) {
            // notify user
            console.log("Det gick inte att lägga till varan");
        }
    }, [groceryStatus])

    const onSubmit = (e) => {
        e.preventDefault();

        const productError = productName.onChange(productName.value);

        if (productError) {
            return;
        }

        const productFound = products.find(p => p.name.toUpperCase() === productName.value.toUpperCase());
        const groceryExists = groceries.find(g => g.name.toUpperCase() === productName.value.toUpperCase());

        if (!productFound) {
            setFormStep(STEP.PRODUCT);
            return;
        }
        else if (groceryExists) {
            // notify user;
            console.log("Varan finns redan i inköpslistan");
            return;
        }

        console.log(productFound);

        const addGrocery = {
            description: description.value,
            product: {
                id: productFound.id,
                name: productFound.name,
                category: {
                    id: productFound.categoryId,
                    color: {
                        id: productFound.colorId,
                        hex: productFound.colorHex
                    }
                }
            }
        }

        dispatch(addGroceryAsync(addGrocery, currentUserId));
    }

    const onAddProduct = (name) => {
        productName.onChange(name);
        setFormStep(STEP.GROCERY);
    }

    return (
        <Fragment>
            {formStep === STEP.GROCERY &&
                <form className="form" onSubmit={onSubmit}>
                    <div className="form-row">
                        <IconLabel icon={FaShoppingBag} hasErrors={productName.error} />
                        <SuggestionField
                            {...productName}
                            options={products}
                            placeholder="Välj produkt.."
                        />
                        <IconButton icon={FaPlus} />
                    </div>
                    <div className="form-row">
                        <IconLabel icon={FaComment} />
                        <TextField {...description} placeholder="Kommentar.." />
                    </div>
                </form>
            }

            {formStep === STEP.PRODUCT &&
                <Fragment>
                    <FormHeader onNavBack={() => setFormStep(STEP.GROCERY)}>
                        Produkten hittades inte.. <br />
                        Lägg till den nedan
                    </FormHeader>
                    <ProductForm
                        updateHeight={updateHeight}
                        initialProductName={productName.value}
                        callback={onAddProduct}
                    />
                </Fragment>
            }
        </Fragment>
    )
}
