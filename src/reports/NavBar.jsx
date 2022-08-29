import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { cleanReports } from '../store/reportSlice';
import './NavBar.css';


export const NavBar = () => {

    const dispatch = useDispatch(state => state.auth)
    const { name, photoURL } = useSelector(state => state.auth)

    const onCleanStates = () => {
        dispatch(logout());
        dispatch(cleanReports());
    }

    return (
        <header>
            <figure>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoxH2Z4Y8Lw50DZuaDdqYjCARszOzqmVYagg&usqp=CAU" alt="logo" />
                <figcaption>Report App</figcaption>
            </figure>

            <div className='header-rightside'>
                <img src={photoURL} alt="photo user" />
                <span>{name}</span>
                <button onClick={onCleanStates}>Logout</button>
            </div>
        </header>
    )
}
