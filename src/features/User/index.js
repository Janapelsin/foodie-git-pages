import { useState } from 'react'
import IconButton from '../_shared/FormElements/IconButton'
import IconLabel from '../_shared/FormElements/IconLabel'
import { FaUser, FaCheck, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import TextField from '../_shared/FormElements/TextField';
import { useSelector, useDispatch } from 'react-redux';
import styles from './style.module.css';

export default function Login() {
    const dispatch = useDispatch();

    const [userName, setUserName] = useState("");

    const onChange = (newValue) => {
        newValue = newValue.length === 1 ? newValue.toUpperCase() : newValue;
        setUserName(newValue);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: "SET_CURRENT_USER_ID", payload: "8DpXB5zetdSrngBnTQIr" })
    }

    return (
        <div className={styles.login}>
            <div className={styles.header}>
                Välkommen till Foodie
            </div>

            <form className={styles.form} onSubmit={onSubmit}>
                <h3 className={styles.label}>
                    Fyll i ditt användarnamn
                </h3>
                <div className={styles.formRow}>
                    <IconLabel icon={FaUser} isActive={userName} />
                    <TextField
                        placeholder="Användarnamn.."
                        value={userName}
                        onChange={onChange}
                    />
                    <IconButton icon={FaCheck} />
                </div>
            </form>

            <br />

            <h3 className={styles.label}>
                Eller...
                </h3>
            <div className={styles.formRow}>
                <button className={styles.anonButton} onClick={onSubmit}>
                    Fortsätt utan att logga in
                </button>
            </div>

            <div className={styles.footer}>
                <div className={styles.row}>
                    Get in touch @ Kontakta mig
                </div>

                <br />

                <div className={styles.row}>
                    <FaLinkedinIn size="30" className={styles.linkedInIcon} />
                    &nbsp; LinkedIn

                    &nbsp;

                    <FaGithub size="30" />
                    &nbsp; Github
                </div>
            </div>
        </div>
    )
}
