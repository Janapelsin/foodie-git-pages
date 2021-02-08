import { createElement, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTag, FaPalette, FaPlus } from 'react-icons/fa';

import IconButton from '../_shared/FormElements/IconButton';
import IconLabel from '../_shared/FormElements/IconLabel';
import ColorPicker from '../_shared/FormElements/ColorPicker';
import TextField from '../_shared/FormElements/TextField';
import useTextField from '../_shared/FormElements/TextField/useTextField';

import { addCategoryAsync } from './store/categories/actions';
import { ADD_START, ADD_FAILED, ADD_SUCCESS, DELETE_SUCCESS, FETCH_START } from '../../store/statusTypes';
import useColorPicker from '../_shared/FormElements/ColorPicker/useColorPicker';

export default function CategoryForm({ callback, initialCategoryName }) {
    const { categoryStatus, categories } = useSelector(s => s.categories);
    const { colors } = useSelector(s => s.colors);
    const { currentUserId } = useSelector(s => s.user);
    const dispatch = useDispatch();

    const [availableColors, setAvailableColors] = useState(colors);

    const categoryName = useTextField(1, 30, initialCategoryName);
    const categoryColor = useColorPicker();

    useEffect(() => {
        if (categoryStatus === ADD_SUCCESS) {
            if (callback) {
                callback(categoryName.value);
                return;
            }

            // To ensure both inputs update simultaneously
            // There's probably a better way to handle this
            setAvailableColors(colors);
            categoryName.reset();
            categoryColor.reset();

        }
        else if (categoryStatus === ADD_FAILED) {
            // notify user
            console.log("Det gick inte att lägga till " + categoryName.name)
        }
        else if (categoryStatus === DELETE_SUCCESS) {
            setAvailableColors(colors);
        }
    }, [categoryStatus, colors]);

    const onSubmit = (e) => {
        e.preventDefault();

        const nameError = categoryName.onChange(categoryName.value);
        const colorError = categoryColor.onChange(categoryColor.value);
        if (nameError || colorError) {
            return;
        }

        const availableColor = availableColors.find(c => c.id === categoryColor.value);
        const categoryNameExists = categories.find(c =>
            c.name.toUpperCase() === categoryName.value.toUpperCase()
        );

        if (!availableColor) {
            // notify user
            console.log("Färgen är inte tillgänglig");
            return;
        }
        else if (categoryNameExists) {
            // notify user
            console.log("Namnet används redan");
            return;
        }

        const addCategory = {
            name: categoryName.value,
            productCount: 0,
            color: {
                id: availableColor.id,
                hex: availableColor.hex
            }
        }

        dispatch(addCategoryAsync(addCategory, currentUserId));
    }

    const loading = categoryStatus === ADD_START || categoryStatus === FETCH_START;

    return (
        <form className={loading ? "form disabled" : "form"} onSubmit={onSubmit}>
            <div className="form-row">
                <IconLabel hasErrors={categoryName.error} icon={FaTag} />
                <TextField
                    {...categoryName}
                    placeholder="Vad heter kategorin?"
                />
                <IconButton icon={FaPlus} />
            </div>
            <div className="form-row">
                <IconLabel hasErrors={categoryColor.error || !availableColors.length} icon={FaPalette} />
                <ColorPicker
                    // shouldUpdate={categoryStatus === ADD_SUCCESS || categoryStatus === DELETE_SUCCESS}
                    onClick={(id) => categoryColor.onChange(id)}
                    selectedId={categoryColor.value}
                    colors={availableColors}
                />
            </div>
        </form>
    )
}
