import React from 'react'
import TextField from '../FormElements/TextField';

import { FaSearch } from 'react-icons/fa';
import IconLabel from '../FormElements/IconLabel';

export default function Search(props) {
    return (
        <div className="form">
            <div className="form-row">
                <IconLabel icon={FaSearch} isActive={props.value} />
                <TextField {...props} />
            </div>
        </div>
    )
}
