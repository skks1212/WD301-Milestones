import { User } from "../types/UserTypes";
import { API } from "./api";

export const checkUser = async (setState : (userData : User)=> void) => {
    //Check for saved token
    const token = localStorage.getItem('auth-token');

    //token exists
    if(token !== null){
        //check for userdata
        const userDataJSON = localStorage.getItem('user-data');
        const userData = userDataJSON ? JSON.parse(userDataJSON) : "";

        //user data is not present
        if(userData === ""){
            //get user data
            const fetchMe = await API.user.me();
            localStorage.setItem("user-data" , JSON.stringify(fetchMe));
            setState(fetchMe);
        }else{
            setState(userData);
        }
    }else{
        console.log('User not logged in');
        localStorage.removeItem('user-data');
    }
}

export const logoutUser = () => {
    const conf = window.confirm('Are you sure you would like to logout?');
    if(conf) {
        localStorage.removeItem('user-data');
        localStorage.removeItem('auth-token');
        window.location.href = '/login';
    }
}