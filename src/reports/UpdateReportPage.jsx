import { useDispatch, useSelector } from 'react-redux'
import { desActiveReport, onActiveReport } from '../store/reportSlice';


import './UpdateReportPage.css'
import { useEffect, useState } from 'react';
import { startDeletingReport, startUpdatingReport } from './thunks';
import { format } from 'date-fns/esm';


export const UpdateReportPage = () => {

    const { activeReport, reports } = useSelector(state => state.report);
    const { uid } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        setInputValue(activeReport);

    }, [activeReport])


    const [inputValue, setInputValue] = useState({
        title: "",
        description: ""
    })

    const onClick = () => {
        dispatch(desActiveReport());

    }

    const onChange = ({ target }) => {
        const { name, value } = target;
        setInputValue({
            ...inputValue,
            [name]: value
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const { title, description, id } = inputValue;
        const path = `/users/${uid}/reports/${id}`
        const newDate = format(new Date(), 'Pp');

        dispatch(startUpdatingReport(title, description, newDate, path));

        dispatch(desActiveReport());
    }


    const onDelete = () => {
        dispatch(startDeletingReport());
        dispatch(desActiveReport());
    }

    const nextReport = () => {
        reports.map((report, i, arr) => {
            if (activeReport.id === report.id && arr[i + 1] !== undefined) {
                dispatch(onActiveReport({
                    id: arr[i + 1].id,
                    title: arr[i + 1].data.title,
                    description: arr[i + 1].data.description,
                    date: arr[i + 1].data.date
                }));
            }
            else if (activeReport.id === report.id && arr[i + 1] === undefined) {
                dispatch(onActiveReport({
                    id: arr[0].id,
                    title: arr[0].data.title,
                    description: arr[0].data.description,
                    date: arr[0].data.date
                }));
            }
        })
    }

    const previousReport = () => {
        reports.map((report, i, arr) => {
            if (activeReport.id === report.id && arr[i - 1] !== undefined) {
                dispatch(onActiveReport({
                    id: arr[i - 1].id,
                    title: arr[i - 1].data.title,
                    description: arr[i - 1].data.description,
                    date: arr[i - 1].data.date
                }));
            }
            else if (activeReport.id === report.id && arr[i - 1] === undefined) {
                dispatch(onActiveReport({
                    id: arr[arr.length - 1].id,
                    title: arr[arr.length - 1].data.title,
                    description: arr[arr.length - 1].data.description,
                    date: arr[arr.length - 1].data.date
                }));
            }
        })
    }

    if (activeReport === null) {
        return;
    }



    return (

        <div className="modal-page animate__animated animate__fadeIn" >

            <button onClick={onClick} id='exit-modal'>x</button>
            <form onSubmit={onSubmit} className='modal-page-form'>

                <label htmlFor="title">
                    <span>Title</span>
                    <input value={inputValue?.title} onChange={onChange} type="text" name='title' id='title' />
                </label>

                <label htmlFor="description">
                    <span>Description</span>
                    <textarea value={inputValue?.description} onChange={onChange} name="description" id="description" cols="30" rows="10" aria-multiline></textarea>
                </label>

                <button className='update-button' type="submit" title='update report'><img src="https://cdn-icons-png.flaticon.com/128/3917/3917423.png" alt="icon disk to save" /></button>

            </form>
            <button className='delete-button' onClick={onDelete} type="submit" title="delete"><img src="https://cdn-icons-png.flaticon.com/128/3917/3917411.png" alt="trash icon" /></button>
            <button onClick={previousReport} className='arrow-buttons before'><img src="https://cdn-icons-png.flaticon.com/128/7434/7434599.png" alt="previous report" /></button>
            <button onClick={nextReport} className='arrow-buttons next'><img src="https://cdn-icons-png.flaticon.com/128/7434/7434610.png" alt="next report" /></button>

        </div>

    )
}

