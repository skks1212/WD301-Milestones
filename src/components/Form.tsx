import { Link, navigate } from "raviger";
import React, {useState, useEffect, useRef, useReducer} from "react";
import { reducer } from "../actions/FormActions";
import { fieldTypesDisplay, formField } from "../types/FormTypes";

export interface formData {
    id : number,
    title : string,
    formFields : formField[];
}

const formFields : formField[] = [];

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

export interface newField {
    value : string,
    type : string,
}

export interface optionsField {
    id : number,
    value : string
}

const defaultNewField : newField= {
    value : "",
    type : "text"
}

const defaultOptions : optionsField[] = [];

export const input_style = 'border-2 bg-gray-800/70 border-gray-800 rounded-xl py-2 px-3 mt-0 w-full block focus:bg-gray-800 outline-0 focus:border-blue-700 transition';

export function Form( props: {formState : number}){

    const [state, dispatch] = useReducer(reducer, null, () => initialState(props.formState));
    const [newField, setNewField] = useState(defaultNewField);
    const [newOption, setNewOption] = useState(defaultOptions);

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

    const resetOptionField = (field : formField) => {
        setNewOption([
            ...newOption.map(option=>{
                if(option.id === field.id){
                    return {
                        ...option,
                        value : ""
                    }
                }
                return option;
            })
        ]);
    }

    const setUpOptions = () => {
        setNewOption([
            ...newOption,
            {
                id : state.formFields.length,
                value : ""
            }
        ]);
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
                        dispatch({type:"update_title", title: e.target.value});
                    }}
                    placeholder="Form Title"
                    ref={titleRef}
                />
                <div className="flex gap-3">
                    <Link href={`/preview/${state.id}`} className={toolbar_button_extendable} title="Preview">
                        <i className="far fa-eye"></i> &nbsp; Preview
                    </Link>
                    <button className={toolbar_button} onClick={()=>dispatch({type:"empty_fields"})} title="Remove all fields">
                        <i className="far fa-empty-set"></i>
                    </button>
                    <Link className={toolbar_button} href="/home" title="Close Form">
                        <i className="far fa-times"></i>
                    </Link>
                </div>
            </div>
            
            {state.formFields.map((field,i) => (
                <div key = {i} className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-full pl-1">
                        <span className="text-gray-400">
                            {fieldTypesDisplay.filter(f=>f.type === field.type).map(fe=>fe.name)}
                        </span>
                        <br/>
                        <input 
                            type="text" 
                            name={field.label} 
                            id={"input_"+field.label} 
                            className={input_style+' mt-1'} 
                            placeholder="Field Name"
                            value={field.label}
                            onChange={e=>{
                                dispatch({type : "update_field", element: e, field : field});
                            }}
                        />
                        {
                            field.kind === 'options' ?
                            (
                                <div className="ml-4 border-l-2 border-gray-800 pl-4 mt-3">
                                    <small className="text-gray-400">
                                        Options
                                    </small>
                                    <br/>
                                    {
                                        field.options.map((option,x)=> (
                                            <div className="flex justify-between align-center gap-2" key={x}>
                                                <input
                                                    type="text"
                                                    placeholder="Option Name"
                                                    value={option}
                                                    className={input_style+' mb-2'}
                                                    onChange={e=>{
                                                        dispatch({type : "update_option", element: e, field: field, option: x})
                                                    }}
                                                />
                                                <button className={toolbar_button+` hover:bg-red-600`} onClick={_=>dispatch({type: "delete_option", field : field, optionNumber : x})}>
                                                    <i className="far fa-minus" />
                                                </button>
                                            </div>
                                            
                                        ))
                                    }
                                    <div className="flex align-center justify-center gap-2 mt-2">
                                        <input 
                                            type="text"
                                            placeholder="Add Option"
                                            className={input_style}
                                            value = {newOption.filter(f=>f.id === field.id).map(fe=>fe.value)}
                                            onChange={e=>{
                                                setNewOption([
                                                    ...newOption.filter(f=>f.id !== field.id),
                                                    {
                                                        id : i,
                                                        value : e.target.value
                                                    }
                                                ]);
                                            }}
                                        />
                                        <button className={toolbar_button} onClick={()=>dispatch({type : "add_option", field : field, optionState : newOption, callback : () => resetOptionField(field)})}>
                                            <i className="far fa-grid-2-plus" />
                                        </button>
                                    </div>
                                </div>
                            ) :
                            (
                                <>
                                </>
                            )
                        }
                    </div>
                    <div>
                        <button className={toolbar_button+` hover:bg-red-600`} onClick={_=>dispatch({type: "remove_field", field : field})}>
                            <i className="far fa-trash" />
                        </button>
                    </div>
                    
                </div>
            ))}
            
            <div className="w-full flex items-center justify-center mt-4 pt-4 border-dashed border-t-2 pl-1 border-t-gray-800 gap-2">
                <input 
                    type="text"
                    className={input_style}
                    value={newField.value}
                    onChange={e=>{
                        setNewField({...newField, value: e.target.value});
                    }}
                    placeholder="Add Field"
                />
                <div>
                    <select className="border-2 bg-gray-800 border-gray-800 rounded-lg p-2" value={newField.type} onChange={e=>setNewField({...newField, type: e.target.value})}>
                        {
                            fieldTypesDisplay.map((type, i) => (
                                <option value={type.type} key={i}>
                                    {type.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <button className="cursor-pointer p-2 ml-0 bg-blue-700 hover:bg-blue-800 transition text-white rounded-lg w-[150px]" onClick={()=>dispatch({type:"add_field", field: newField, callback :() => setNewField(defaultNewField), setUpOptions : setUpOptions})}>
                        <i className="far fa-plus" /> &nbsp; Add Field
                    </button>
                </div>
            </div>
            <div className="pt-4 text-center">
                
            </div>
        </div>
    )
}