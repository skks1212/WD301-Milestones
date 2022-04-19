import { apiForm, apiFormFields, apiFormWithFields } from "../types/FormTypes";
import { ApiSubmissions } from "../types/PreviewTypes";

const API_BASE_URL = "https://tsapi.coronasafe.live/api/";

type endpoint = `${string}/`;

type methods = "POST" | "GET" | "PATCH" | "DELETE" | "PUT";

export const request = async (endpoint : endpoint, method : methods = "GET", data : any = {}) => {

    let url = API_BASE_URL + endpoint;
    let payload : null | string = JSON.stringify(data);

    if(method === "GET"){
        const requestParams = data ? `?${Object.keys(data).map(key=>`${key}=${data[key]}`).join('&')}` : "";
        url = API_BASE_URL + endpoint + requestParams;
        payload = null;
    }

    const localToken = localStorage.getItem('auth-token');
    

    //Basic Authentication
    //const auth = "Basic " + window.btoa("BlaXtar:4rget@Me");

    //Bearer Authentication
    const auth = localToken === null ? "" : "Token " + localToken;

    const response = await fetch(url, {
        method : method,
        headers : {
            "Content-Type" : "application/json",
            Authorization : auth
        },
        body : payload
    });

    if(response.ok){
        try {
            const json = await response.json();
            return json;
        }catch (error) {
            const json = {error};
            return json;
        }
    } else if (response.status === 401) {
        const errorJSON = await response.json();
        throw Error(errorJSON);
    }
    
}

export const API = {
    form : {
        create : (form : apiForm) => request('forms/', 'POST', form),
        fetchAllForms : () => request('forms/'),
        delete : (formID : number) => request(`forms/${formID}/`, 'DELETE'),
        get : (formID : number) => request(`forms/${formID}/`),
        saveForm : (form : apiFormWithFields) => request(`forms/${form.id ? form.id : ""}/`, 'PATCH', {title : form.title, description : form.description, is_public : form.is_public}),

        getFields : (formID : number) => request(`forms/${formID}/fields/`),
        addField : (formID : number, field : apiFormFields) => request(`forms/${formID}/fields/`,'POST', field),
        saveField : (formID : number, field : apiFormFields) =>  request(`forms/${formID}/fields/${field.id? field.id : 0}/`, 'PATCH', field),
        deleteField : (formID : number, field : apiFormFields) =>request(`forms/${formID}/fields/${field.id? field.id : 0}/`, 'DELETE'),
    },
    user : {
        login : (username : string, password : string) => request("auth-token/",'POST', {username, password}),
        me : () => request("users/me/")
    },
    submit : {
        get : (formID : number) => request(`forms/${formID}/submission/`),
        submit : (formID : number, submission : ApiSubmissions[]) => request(`forms/${formID}/submission/`, 'POST', {answers : submission})
    }
}