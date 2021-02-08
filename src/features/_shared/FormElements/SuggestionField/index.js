import { Fragment } from 'react';
import TextField from '../TextField';
import styles from "./style.module.css";

export default function SuggestionField({ options = [], onChange, value, placeholder = "Välj.." }) {
    return (
        <Fragment>
            {/* <div style={{width: "100%", position:"relative"}}> */}
            <TextField
                value={value}
                list="suggestions"
                onChange={onChange}
                placeholder={placeholder}
            />
            <datalist id="suggestions">
                {options.map(opt => {
                    return (
                        <option key={opt.id} value={opt.name} />
                    )
                })}
            </datalist>
            {/* </div> */}
        </Fragment>
    )
}
