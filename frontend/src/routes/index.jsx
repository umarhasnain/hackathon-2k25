import SignIn from "../layout/auth/SignIn";
import CreateNewEmploye from "../layout/auth/CreateNewEmploye";
import AppLayout from "../layout/pages/AppLayout";
import Dashboard from "../layout/auth/Dashboard";


const routes = [
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                path: '/auth/dashboard',
                element: <Dashboard />
            }
        ]
    },
    {
        path: '/auth/signin',
        element: <SignIn />
    },
    {
        path: '/auth/create-new-employe',
        element: <CreateNewEmploye />
    },
    {
        path: '*',
        element: <h1>Page Not Found</h1>
    }

]


export default routes;