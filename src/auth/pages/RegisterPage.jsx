
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from '../../hooks'
import { startCreatingUserWithEmailPassword } from "../thunks";

import './LoginPage.css';

export const RegisterPage = () => {

    const { onInputChange, formState, validation } = useForm();
    const dispatch = useDispatch();

    const onSubmit = (event) => {

        event.preventDefault();
        console.log(formState);

        const { name, email, password } = formState;

        const errors = validation(formState);

        if (errors.length > 0 || name === "" || email === "" || password === "") {

            return
        }

        dispatch(startCreatingUserWithEmailPassword(name, email, password));
    }

    return (

        <main className="auth-page">
            <div className="principal-login">
                <form onSubmit={onSubmit} className="animate__animated animate__fadeIn">

                    <label htmlFor="name">
                        <span>Name</span>
                        <input onChange={onInputChange} type="text" id="name" name="name" placeholder="example" title="the name needs at least 4 letters" />
                    </label>

                    <label htmlFor="email">
                        <span>Email</span>
                        <input onChange={onInputChange} type="email" id="email" name="email" placeholder="example@gmail.com" title="Email has to be like this: asda@asd.asd" />
                    </label>

                    <label htmlFor="password">
                        <span>Password</span>
                        <input onChange={onInputChange} type="password" id="password" name="password" placeholder="******" title="the password must contain between 6 and 14 characters" />
                    </label>

                    <div className="button-link">
                        <button className="register">Register</button>
                        <Link className="a-register" to="/auth/login">I have an account</Link>
                    </div>

                </form>
            </div>

        </main>




    )
}
