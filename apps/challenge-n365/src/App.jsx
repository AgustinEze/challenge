import { Navigate, Route, BrowserRouter, Routes } from "react-router-dom"
import { LoginView } from "./pages/login"

import { HomeView } from "./pages/home"
import { RegisterView } from "./pages/register"

export const App = () => {
    return (
        
        <BrowserRouter>

            <Routes>
                <Route
                    path={`/login`}
                    element={<LoginView />}
                />
                <Route
                    path={`/home`}
                    element={<HomeView />}
                />
                <Route
                    path={`/register`}
                    element={<RegisterView />}
                />
                <Route path="/" element={<Navigate to={'/login'} />} />
            </Routes>
        </BrowserRouter>
    )
}


