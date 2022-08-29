
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { onActiveModal, onActiveReport } from '../store/reportSlice';
import './ReportList.css'
import { startGettingReports } from './thunks';


export const ReportList = () => {


    const dispatch = useDispatch(state => state.report);
    const { reports } = useSelector(state => state.report)



    const onNewReport = () => {
        dispatch(onActiveModal());
    }

    useEffect(() => {
        dispatch(startGettingReports());
    }, [])

    const onUpdateReport = ({ id, title, description, date }) => {
        dispatch(onActiveReport({ id, title, description, date }));
    }



    return (
        <div className='reportlist-page animate__animated animate__fadeIn'>
            <article>

                {
                    reports?.map(report => {
                        const { id, data } = report

                        return (
                            <button onClick={() => onUpdateReport({ id, title: data.title, description: data.description, date: data.date })} className='report-button' key={report.id} title="touch me to modify">
                                <span>{data.title}</span>
                                <span>{data.description}</span>
                                <span>{data.date}</span>
                            </button>
                        )
                    })
                }


            </article>

            <button onClick={onNewReport} className='add-button'>
                <img src="https://cdn-icons-png.flaticon.com/128/3917/3917757.png" alt="add report" title='add report' />
            </button>
        </div>

    )
}
