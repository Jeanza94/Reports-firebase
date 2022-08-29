
import { useState } from 'react';
import Swal from 'sweetalert2'

const initialForm = {
    name: "",
    email: "",
    password: ""
}

export const useForm = () => {

    const [formState, setFormState] = useState(initialForm);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    const validation = (user) => {


        const { name, email, password } = user;
        const errors = []

        if (name === "" || email === "" || password === "") {
            Swal.fire({
                icon: 'error',
                title: 'all the fields have to be filled',
            })
            return errors
        }

        else {
            if (name.length <= 3) {
                errors.push("the name needs at least four letters");
            }

            if (/[a-zA-Z0-9._-]{2,}@[\w]{2,}[.]\w{2,}/i.test(email) === false) {
                errors.push("the mail is not correct, the structure is asdad@adada.adada");
            }

            if (password.length < 6 || password.length > 14) {
                errors.push("the password must contain between 6 and 14 characters");
            }

            if (errors.length > 0) {
                errors.map(error => {
                    Swal.fire({
                        icon: 'error',
                        title: error,
                    })
                })
            }
            console.log({ name, email, errors });
            return errors
        }

    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        validation
    }
}

