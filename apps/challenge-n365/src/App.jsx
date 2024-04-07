import {  Route, Routes } from "react-router-dom"
import { LoginView } from "./pages/login"

import { HomeView } from "./pages/home"
import { RegisterView } from "./pages/register"
import { SessionProvider } from "./provider/SessionProvider"


export const App = () => {
    return (
        <SessionProvider>

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
                 
            </Routes>
        </SessionProvider>
    )
}


