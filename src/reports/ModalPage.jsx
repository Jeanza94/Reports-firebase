import { useSelector, useDispatch } from 'react-redux'
import { desActiveModal } from '../store/reportSlice';
import { useForm } from '../hooks'
import './ModalPage.css';
import { startAddReportFirestore } from './thunks';
import { format } from 'date-fns';


export const ModalPage = () => {

    const { onInputChange, formState } = useForm();

    const { isModalActive } = useSelector(state => state.report)
    const { uid } = useSelector(state => state.auth)

    const dispatch = useDispatch();

    const onSaveReport = async (event) => {

        event.preventDefault();

        dispatch(desActiveModal());
        console.log("hola");

        const { title, description } = formState;
        const path = `/users/${uid}/reports`;
        const date = format(new Date(), 'Pp');

        dispatch(startAddReportFirestore(path, title, description, date));

    }

    const onClick = () => {
        dispatch(desActiveModal());

    }

    if (isModalActive === false) {
        return
    }

    return (

        <div className={"modal-page modal-page animate__animated animate__fadeIn"} >
            <button onClick={onClick} id='exit-modal'>x</button>
            <form onSubmit={onSaveReport} className='modal-page-form'>
                <label htmlFor="title">
                    <span>Title</span>
                    <input onChange={onInputChange} type="text" name='title' id='title' />
                </label>

                <label htmlFor="description">
                    <span>Description</span>
                    <textarea onChange={onInputChange} name="description" id="description" cols="30" rows="10" aria-multiline></textarea>
                </label>

                <button className='save-button' type="submit"><img src="https://cdn-icons-png.flaticon.com/128/3917/3917394.png" alt="save report" /></button>

            </form>

        </div>

    )
}
