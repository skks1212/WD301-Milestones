import { Link, navigate } from "raviger";
import React, {useState, useEffect, useRef} from "react";

interface formData {
    id : number,
    title : string,
    formFields : formField[];
}

interface formField{
    id : number,
    label:  string,
    type : string,
    value : string
}

const formFields : formField[] = [
    {id : 0, label : "First Name", type : "text", value : ""},
    {id : 1, label : "Last Name", type : "text", value : ""},
    {id : 2, label : "Email", type : "email", value : ""},
    {id : 3, label : "Phone Number", type : "number", value : ""},
    {id : 4, label : "Date of Birth", type : "date", value : ""}
]

export const getLocalForms: () => formData[] = () => {
    const savedFormsJSON = localStorage.getItem("savedForms");
    return savedFormsJSON 
        ? JSON.parse(savedFormsJSON) 
        : [];
}

const initialState: (formID : number) => formData = (formID : number) => {
    const localForms = getLocalForms();
    console.log(localForms);
    if (localForms.length > 0 && formID !== 0) {
        return localForms.filter(form => form.id === formID)[0];
    }else{
        const idTime = Number(new Date());
        //console.log(idTime);
        const newForm = {
            id : idTime,
            title : "Untitled Form",
            formFields : formFields
        }
        const updatedToSave = [...localForms, newForm];
        console.log(updatedToSave);
        saveLocalForms(updatedToSave);
        return newForm;
    }
    
}

export const saveLocalForms = (localForms: formData[]) => {
    //console.log(JSON.stringify(localForms));
    localStorage.setItem("savedForms", JSON.stringify(localForms));
    //console.log(localStorage['savedForms']);
}

const saveFormData = (currentState: formData) => {
    //console.log(JSON.stringify(currentState));
    const localForms = getLocalForms();
    
    const updatedLocalForms = localForms.map((form) => 
        form.id === currentState.id ? currentState : form
    );
    //console.log(updatedLocalForms);

    saveLocalForms(updatedLocalForms);
}

export const input_style = 'border-2 bg-gray-800 border-gray-800 rounded-lg p-2 mt-0 w-full block';

export function Form( props: {formState : number}){

    const [state, setState] = useState(() => initialState(props.formState));
    console.log(state);
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
            document.title = "React Abomination";
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
                        id : state.formFields.length + 2,
                        label : newField,
                        type: "text",
                        value : ""
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
        let value = e.target.value;
        setState({
            ...state,
            formFields: state.formFields.map((field) => {
                if(field.id === id){
                    return {...field, value };
                }
                return field;
            }),
        });
    }

    const emptyFields = () => {
        setState({
            ...state,
            formFields: state.formFields.map((field) => {
                return {...field, value : ""};
            }),
        });
    }

    
    return (
        <div className="mt-4">
            <input 
                type="text"
                className={input_style}
                value={state.title}
                onChange={e=>{
                    setState({...state, title: e.target.value});
                }}
                placeholder="Create Input"
                ref={titleRef}
            />
            {state.formFields.map((field,i) => (
                <div key = {i} className="flex items-center justify-center gap-1">
                    <div className="w-full flex items-center justify-center pl-1">
                        <input 
                            type={field.type} 
                            name={field.label} 
                            id={"input_"+field.label} 
                            className={input_style} 
                            placeholder={field.label}
                            value={field.value}
                            onChange={e=>{
                                updateField(e, i);
                                //state.formFields[i].value = e.target.value;
                            }}
                        />
                    </div>
                    <div>
                        <button className="cursor-pointer p-2 m-2 bg-blue-500 hover:bg-blue-600 transition text-white rounded-lg w-[40px]" onClick={_=>removeField(field.label)}>
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
                    placeholder="Create Input"
                />
                <div>
                    <button className="cursor-pointer p-2 m-2 bg-blue-500 hover:bg-blue-600 transition text-white rounded-lg w-[150px]" onClick={addField}>
                        Add Field&nbsp;<i className="far fa-plus" />
                    </button>
                </div>
            </div>
            <div className="pt-4 text-center">
                <input type="submit" className='cursor-pointer p-2 m-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'/>
                <button className="cursor-pointer p-2 m-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition" onClick={emptyFields}>
                    Clear Form
                </button>
                
                <Link className="cursor-pointer p-2 m-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition" href="/home">
                    Close Form
                </Link>
            </div>
        </div>
    )
}