import { useRoutes } from "raviger";
import About from "../components/About";
import App from "../App";
import AppContainer from "../AppContainer";
import { Form } from "../components/Form";
import { Home } from "../components/Home";

const routes = {
    '/' : () => <Home />,
    '/home' : () => <Home />,
    '/about' : () => <About />,

    "/form/:id" : ({id} : {id : string}) => <Form formState={Number(id)} />
}

export default function AppRouter() {
    const routeResult = useRoutes(routes);
    return <AppContainer>{routeResult}</AppContainer>;
}