import App from "../App.jsx";
import Dashboard from "../pages/dashboard.jsx";
import Portfolio from "../pages/portfolio.jsx";
import StockManagement from "../pages/StockManagement.jsx";
import Login from "../pages/Login.jsx";
import Reports from "../pages/Reports.jsx";
import RegisterPage from "../components/login/register.jsx";

const routes = [
    {
        path: '/',
        element: <App />,
        errorElement: <div>404</div>,
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "/portfolio",
                element: <Portfolio />,
            },
            {
                path: "/stockManagement",
                element: <StockManagement />,
            },
            {
                path: "/reports",
                element: <Reports />,
            },
            {
                path: "/register",
                element: <RegisterPage />,
            },
            {
                path: "/login",
                element: <Login />,
            },
        ]
    }
]

export default routes