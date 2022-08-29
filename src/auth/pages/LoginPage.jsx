import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { useForm } from "../../hooks";
import { startLoginWithFacebook, startLoginWithGoogle, startSignInWithEmailPassword } from "../thunks";
import './LoginPage.css';
import Swal from "sweetalert2";


export const LoginPage = () => {

    const { onInputChange, formState } = useForm();
    const dispatch = useDispatch();


    const onSubmit = (event) => {
        event.preventDefault();
        const { email, password } = formState;

        if (email === "" || password === "") {
            Swal.fire({
                icon: 'error',
                title: 'all the fields have to be filled',
            })
            return;
        }
        dispatch(startSignInWithEmailPassword(email, password));
    }

    const signInWithGoogle = () => {
        dispatch(startLoginWithGoogle());
    }

    const signInWithFacebook = () => {
        dispatch(startLoginWithFacebook());
    }

    return (
        <main className="auth-page">
            <div className="principal-login">
                <form onSubmit={onSubmit} className="animate__animated animate__fadeIn">
                    <label htmlFor="email">
                        <span>Email</span>
                        <input onChange={onInputChange} type="email" id="email" name="email" placeholder="example@gmail.com" />
                    </label>

                    <label htmlFor="password">
                        <span>Password</span>
                        <input onChange={onInputChange} type="password" id="password" name="password" placeholder="********" />
                    </label>

                    <div className="button-link">
                        <button type="submit">Login</button>
                        <Link to="/auth/register">Don't you have an account?</Link>
                    </div>
                </form>

                <button className="button-provider google" onClick={signInWithGoogle}><img src="https://cdn-icons-png.flaticon.com/128/6424/6424087.png" alt="login google" /></button>
                <button className="button-provider facebook" onClick={signInWithFacebook}><img src="https://cdn-icons-png.flaticon.com/128/6422/6422199.png" alt="login facebook" /></button>

            </div>

        </main>
    )
}
