import { Link, navigate } from "raviger";
import React, {useState, useEffect, useRef} from "react";

export interface formData {
    id : number,
    title : string,
    formFields : formField[];
}

export interface formField{
    id : number,
    label:  string,
    type : string,
}

const formFields : formField[] = [
    /*{id : 0, label : "First Name", type : "text"},
    {id : 1, label : "Last Name", type : "text", value : ""},
    {id : 2, label : "Email", type : "email", value : ""},
    {id : 3, label : "Phone Number", type : "number", value : ""},
    {id : 4, label : "Date of Birth", type : "date", value : ""}*/
]

export const getLocalForms: () => formData[] = () => {
    const savedFormsJSON = localStorage.getItem("savedForms");
    return savedFormsJSON 
        ? JSON.parse(savedFormsJSON) 
        : [];
}

const initialState: (formID : number) => formData = (formID : number) => {
    const localForms = getLocalForms();

    //find form if exists
    const checkForm = localForms.find((form)=>form.id === formID);
    if(checkForm && formID !== 0){
        return checkForm;
    }
    
    /*         No Forms?
    ⠀⣞⢽⢪⢣⢣⢣⢫⡺⡵⣝⡮⣗⢷⢽⢽⢽⣮⡷⡽⣜⣜⢮⢺⣜⢷⢽⢝⡽⣝
    ⠸⡸⠜⠕⠕⠁⢁⢇⢏⢽⢺⣪⡳⡝⣎⣏⢯⢞⡿⣟⣷⣳⢯⡷⣽⢽⢯⣳⣫⠇
    ⠀⠀⢀⢀⢄⢬⢪⡪⡎⣆⡈⠚⠜⠕⠇⠗⠝⢕⢯⢫⣞⣯⣿⣻⡽⣏⢗⣗⠏⠀
    ⠀⠪⡪⡪⣪⢪⢺⢸⢢⢓⢆⢤⢀⠀⠀⠀⠀⠈⢊⢞⡾⣿⡯⣏⢮⠷⠁⠀⠀
    ⠀⠀⠀⠈⠊⠆⡃⠕⢕⢇⢇⢇⢇⢇⢏⢎⢎⢆⢄⠀⢑⣽⣿⢝⠲⠉⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⡿⠂⠠⠀⡇⢇⠕⢈⣀⠀⠁⠡⠣⡣⡫⣂⣿⠯⢪⠰⠂⠀⠀⠀⠀
    ⠀⠀⠀⠀⡦⡙⡂⢀⢤⢣⠣⡈⣾⡃⠠⠄⠀⡄⢱⣌⣶⢏⢊⠂⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⢝⡲⣜⡮⡏⢎⢌⢂⠙⠢⠐⢀⢘⢵⣽⣿⡿⠁⠁⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠨⣺⡺⡕⡕⡱⡑⡆⡕⡅⡕⡜⡼⢽⡻⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⣼⣳⣫⣾⣵⣗⡵⡱⡡⢣⢑⢕⢜⢕⡝⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⣴⣿⣾⣿⣿⣿⡿⡽⡑⢌⠪⡢⡣⣣⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⡟⡾⣿⢿⢿⢵⣽⣾⣼⣘⢸⢸⣞⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠁⠇⠡⠩⡫⢿⣝⡻⡮⣒⢽⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    */

    const newForm = {
        id : Number(new Date()),
        title : "Untitled Form",
        formFields : formFields
    }
    
    
    const updatedToSave = [...localForms, newForm];
    saveLocalForms(updatedToSave);
    
    return newForm;
    
}

export const saveLocalForms = (localForms: formData[]) => {
    localStorage.setItem("savedForms", JSON.stringify(localForms));
}

const saveFormData = (currentState: formData) => {
    const localForms = getLocalForms();
    
    const updatedLocalForms = localForms.map((form) => 
        form.id === currentState.id ? currentState : form
    );
    saveLocalForms(updatedLocalForms);
}

export const input_style = 'border-2 bg-gray-800 border-gray-800 rounded-lg p-2 mt-0 w-full block';

export function Form( props: {formState : number}){

    const [state, setState] = useState(() => initialState(props.formState));
    const [newField, setNewField] = useState("");
    const titleRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        state.id !== props.formState && navigate(`/form/${state.id}`);
    }, [state.id, props.formState]);

    useEffect( () => {
        console.log("%cComponent Mounted", "color:grey;");
        document.title = "Form Editor";
        titleRef.current?.focus();
        return () => {
            document.title = "Formify";
        }
    }, []);

    useEffect(() => {
        let timeout = setTimeout(() => {
            console.log('%cForm Saved', "color:grey;");
            document.title = "Form Editor : " + state.title;
            saveFormData(state);
        }, 500);
        return () => {
            clearTimeout(timeout);
        }
    }, [state]);

    const addField = () => {

        if(newField && newField !== '' && newField !== '{}'){
            setState({
                ...state,
                formFields : [
                    ...state.formFields,
                    {   
                        id : state.formFields.length,
                        label : newField,
                        type: "text"
                    }
                ]
            });
            setNewField("");
        }
    }

    const removeField = (id:string) => {
        return setState({
            ...state,
            formFields : state.formFields.filter(field => field.label !== id),
        });
    }

    const updateField = (e:any, id:number) => {
        const thisValue = e.target.value;
        setState({
            ...state,
            formFields: state.formFields.map((field) => {
                if(field.id === id){
                    return {...field, label:thisValue };
                }
                return field;
            }),
        });
    }

    const emptyFields = () => {
        window.confirm('All fields will be deleted, form will be reset. Are you sure you would like to continue?')?
        setState({
            ...state,
            formFields: []
        }) :
        console.log('Form reset cancelled')
    }

    const toolbar_button = "inline-flex w-[40px] bg-gray-800/70 rounded-xl h-[40px] justify-center items-center transition hover:bg-gray-800/40";
    const toolbar_button_extendable = "inline-flex bg-gray-800/70 rounded-xl h-[40px] justify-center items-center transition hover:bg-gray-800/40 px-4";
    
    return (
        <div className="mt-4">
            <div className="flex justify-between items-center">
                <input 
                    type="text"
                    className="text-3xl font-bold w-[300px] bg-transparent outline-0 border-b-[5px] border-b-gray-700 mb-10 py-3 transition focus:border-b-gray-200"
                    value={state.title}
                    onChange={e=>{
                        setState({...state, title: e.target.value});
                    }}
                    placeholder="Form Title"
                    ref={titleRef}
                />
                <div className="flex gap-3">
                    <Link href={`/preview/${state.id}`} className={toolbar_button_extendable} title="Preview">
                        <i className="far fa-eye"></i> &nbsp; Preview
                    </Link>
                    <button className={toolbar_button} onClick={emptyFields} title="Remove all fields">
                        <i className="far fa-empty-set"></i>
                    </button>
                    <Link className={toolbar_button} href="/home" title="Close Form">
                        <i className="far fa-times"></i>
                    </Link>
                </div>
            </div>
            
            {state.formFields.map((field,i) => (
                <div key = {i} className="flex items-center justify-center gap-1">
                    <div className="w-full flex items-center justify-center pl-1">
                        <input 
                            type={field.type} 
                            name={field.label} 
                            id={"input_"+field.label} 
                            className={input_style} 
                            placeholder="Field Name"
                            value={field.label}
                            onChange={e=>{
                                updateField(e, i);
                                //state.formFields[i].value = e.target.value;
                            }}
                        />
                    </div>
                    <div>
                        <button className="cursor-pointer p-2 m-2 bg-blue-700 hover:bg-blue-800 transition text-white rounded-lg w-[40px]" onClick={_=>removeField(field.label)}>
                            <i className="far fa-times" />
                        </button>
                    </div>
                    
                </div>
            ))}
            
            <div className="w-full flex items-center justify-center mt-4 pt-4 border-dashed border-t-2 pl-1 border-t-gray-500">
                <input 
                    type="text"
                    className={input_style}
                    value={newField}
                    onChange={e=>{
                        setNewField(e.target.value);
                    }}
                    placeholder="Add Field"
                />
                <div>
                    <button className="cursor-pointer p-2 m-2 bg-blue-700 hover:bg-blue-800 transition text-white rounded-lg w-[150px]" onClick={addField}>
                        Add Field&nbsp;<i className="far fa-plus" />
                    </button>
                </div>
            </div>
            <div className="pt-4 text-center">
                
            </div>
        </div>
    )
}