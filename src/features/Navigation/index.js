import { Fragment } from 'react';
import { pageEnum } from './contants';
import styles from './style.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { FaSearch, FaPlusCircle, FaSignOutAlt } from 'react-icons/fa';
import * as navActions from './store/actions';
import { resetUser } from '../User/store/actions';

export default function Navigation() {
    const { menuActive, formActive, searchActive, currentPage } = useSelector(s => s.navigation);
    const dispatch = useDispatch();

    const setCurrentPage = (page) => {
        dispatch(navActions.setCurrentPage(page));
        setTimeout(() => menuActive && dispatch(navActions.toggleMenu()), 300);
    }

    const logout = () => {
        dispatch(resetUser()) && dispatch(navActions.resetNavigation())
    }

    return (
        <Fragment>
            <div className={styles.topnav}>
                <div
                    className={menuActive ? styles.menuToggle_active : styles.menuToggle}
                    onClick={() => dispatch(navActions.toggleMenu())}
                >
                    <div className={styles.hamburger}>|||</div>
                    <div className={styles.currentPage}>{pageEnum[currentPage]}</div>
                </div>

                <div className={menuActive ? styles.actions_hidden : styles.actions}>
                    <FaSearch
                        className={searchActive ? styles.actionIcon_active : styles.actionIcon}
                        onClick={() => dispatch(navActions.toggleSearch())}
                    />
                    <FaPlusCircle
                        className={formActive ? styles.actionIcon_active : styles.actionIcon}
                        onClick={() => dispatch(navActions.toggleForm())}
                    />
                </div>
            </div>

            <div className={menuActive ? styles.menu_active : styles.menu}>
                {Object.keys(pageEnum).map(page => {
                    return (
                        <div
                            className={currentPage === page ? styles.menuItem_active : styles.menuItem}
                            onClick={() => setCurrentPage(page)}
                            key={page}
                        >
                            {pageEnum[page]}
                        </div>
                    )
                })}

                <div
                    className={styles.logout}
                    onClick={logout}
                >
                    Logga ut &nbsp;
                    <FaSignOutAlt />
                </div>
            </div>
        </Fragment>
    )
}