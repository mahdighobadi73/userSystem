import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage"
import './App.css';



function App () {
    return (
        <BrowserRouter>
            <main className="app-shell">
                <Routes>
                    <Route path="/" element={ <RegisterPage /> } />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
