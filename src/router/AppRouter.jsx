import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { ReportPage } from "../reports"
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react"
import { login } from "../store"


export const AppRouter = () => {

    const { authentication } = useSelector(state => state.auth)

    const dispatch = useDispatch();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user !== null) {
            dispatch(login(user));
        }

    }, [authentication])


    if (authentication === "authenticated") {
        return (
            <Routes>
                <Route path="/reportApp" element={<ReportPage />} />
                <Route path="/*" element={<Navigate to="/reportApp" />} />
            </Routes>
        )
    }

    return (
        <Routes>


            <Route path="/auth/*" element={<AuthRoutes />} />

            <Route path="/*" element={<Navigate to="/auth/login" />} />

        </Routes>
    )
}
