import { useRoutes } from "raviger";
import About from "../components/About";
import AppContainer from "../AppContainer";
import { Form } from "../components/Form";
import { Home } from "../components/Home";
import Preview from "../components/Preview";
import Login from "../components/Login";
import { User } from "../types/UserTypes";
import Submissions from "../components/Submissions";

export default function AppRouter(props : {currentUser : User}) {
    const isSignedIn = props.currentUser.username !== "";
    const routes = {
        '/' : () => isSignedIn ? <Home /> : <Login/>,
        '/home' : () => isSignedIn ? <Home /> : <Login/>,
        '/about' : () => <About />,
    
        '/login' : () => <Login />,
    
        "/form/:id" : ({id} : {id : string}) => isSignedIn ? <Form formState={Number(id)} /> : <Login/>,
        "/form/:id/preview" : ({id} : {id : string}) => isSignedIn ? <Preview formID={Number(id)} /> : <Login/>,
        "/form/:id/submissions" : ({id} : {id : string}) => isSignedIn ? <Submissions formID={Number(id)}/> : <Login/>
    }    
    const routeResult = useRoutes(routes);
    return <AppContainer currentUser = {props.currentUser}>{routeResult}</AppContainer>;
}