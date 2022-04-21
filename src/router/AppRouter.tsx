import React from "react"
import { useRoutes } from "raviger";
import AppContainer from "../AppContainer";
import Login from "../components/Login";
import { User } from "../types/UserTypes";

const Home = React.lazy(()=>import("../components/Home"));
const Form = React.lazy(()=>import("../components/Form"));
const About = React.lazy(()=>import("../components/About"));
const Preview = React.lazy(()=>import("../components/Preview"));
const Submissions = React.lazy(()=>import("../components/Submissions"));


const fallback = <div>Loading...</div>
export default function AppRouter(props : {currentUser : User}) {
    const isSignedIn = props.currentUser.username !== "";
    const routes = {
        '/' : () => isSignedIn ? <React.Suspense fallback={fallback}><Home /></React.Suspense> : <Login/>,
        '/home' : () => isSignedIn ? <React.Suspense fallback={fallback}><Home /></React.Suspense> : <Login/>,
        '/about' : () => <React.Suspense fallback={fallback}><About /></React.Suspense>,
    
        '/login' : () => <React.Suspense fallback={fallback}><Login /></React.Suspense>,
    
        "/form/:id" : ({id} : {id : string}) => isSignedIn ? <React.Suspense fallback={fallback}><Form formState={Number(id)} /></React.Suspense> : <Login/>,
        "/form/:id/preview" : ({id} : {id : string}) => isSignedIn ? <React.Suspense fallback={fallback}><Preview formID={Number(id)} /></React.Suspense> : <Login/>,
        "/form/:id/submissions" : ({id} : {id : string}) => isSignedIn ? <React.Suspense fallback={fallback}><Submissions formID={Number(id)}/></React.Suspense> : <Login/>
    }    
    const routeResult = useRoutes(routes);
    return <AppContainer currentUser = {props.currentUser}>{routeResult}</AppContainer>;
}