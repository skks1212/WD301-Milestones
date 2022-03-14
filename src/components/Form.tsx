import React, {useState} from "react";

const formFields = [
    {
        id : 0,
        label : "First Name",
        type : "text",
        value : ""
    },
    {   
        id : 1,
        label : "Last Name",
        type : "text",
        value : ""
    },
    {
        id : 2,
        label : "Email",
        type : "email",
        value : ""
    },
    {
        id : 3,
        label : "Phone Number",
        type : "number",
        value : ""
    },
    {
        id : 4,
        label : "Date of Birth",
        type : "date",
        value : ""
    }
]


export function Form( props: {stateCB : () => void}){

    const [state, setState] = useState(formFields);
    const [newField, setNewField] = useState("")

    const addField = () => {

        if(newField && newField !== '' && newField !== '{}'){
            setState([
                ...state,
                {   
                    id : state.length + 2,
                    label : newField,
                    type: "text",
                    value : ""
                },
            ]);
            setNewField("");
        }
    }

    const removeField = (id:string) => {
        return setState(
            state.filter(field => field.label !== id)
        )
    }

    const updateField = (e:any, id:number) => {
        let getVals = state[id];
        let value = e.target.value;

        setState(oldState => {
            return [
                ...oldState.filter(field => field.id !== id),
                {
                    ...getVals,
                    value: value
                }
            ].sort((a, b) => a.id - b.id)
        });
    }

    const emptyFields = () => {
        setState(oldState => {
            return oldState.map(field => ({...field, value: ""}))
        })
    }

    const input_style = 'border-2 bg-gray-700 border-gray-800 rounded-lg p-2 mt-0 w-full block';
    return (
        <div className="mt-4">
            {state.map((field,i) => (
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
                                state[i].value = e.target.value;
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
                <button className="cursor-pointer p-2 m-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition" onClick={props.stateCB}>
                    Close Form
                </button>
            </div>
        </div>
    )
}