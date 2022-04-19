import { formAction } from "../types/FormActionTypes";
import { apiFormFields, apiFormWithFields, optionTypes } from "../types/FormTypes";
import { API } from "../utils/api";

export const reducer = (state : apiFormWithFields, action : formAction) => {
    switch(action.type){
        case "update_title" : {
            return {
                ...state,
                title : action.title
            }
        }
        case "add_field" : {
            if(optionTypes.includes(action.field.type)){
                action.setUpOptions();
            }

            action.callback?.();
            return {
                ...state,
                formFields : [
                    ...state.formFields,
                    action.field
                ]
            };
        }
        case "remove_field" : {
            return {
                ...state,
                formFields : state.formFields.filter((field : apiFormFields) => field.id !== action.field.id)
            };
        }
        case "update_field" : {
            const thisValue = action.element.target.value;
            return {
                ...state,
                formFields: state.formFields.map((field : apiFormFields) => {
                    if(field.id === action.field.id){
                        return {...field, label:thisValue };
                    }
                    return field;
                }),
            };
        }
        case "empty_fields" : {
            const conf = window.confirm('All fields will be deleted, form will be reset. Are you sure you would like to continue?');
            if(conf){
                const hehe = async ()=>{
                    const savedFields = await state.formFields.map(async (field : apiFormFields)=>{
                        return await API.form.deleteField(state.id ? state.id : 0 , field);
                    })
                    return savedFields;
                }
                hehe();
                return {
                    ...state,
                    formFields: []
                }
            }else{
                console.log('Form reset cancelled');
            }
            return state;
        }
        case "add_option" : {
            const optionValue = action.optionState.filter(f=>f.id === action.field.id).map(fe=>fe.value)[0];
            console.log(action);
            action.callback?.();
            //return state;
            return {
                ...state,
                formFields : state.formFields.map((f : apiFormFields)=>{
                    if(f.id === action.field.id){
                        switch (f.kind) {
                            case "DROPDOWN":
                            case "RADIO" :
                                return {
                                    ...f,
                                    options : f.options ? [
                                        ...f.options,
                                        optionValue
                                    ] : []
                                }
                            default :
                                return f;
                        }
                    }
                    return f;
                })
            };
        }
        case "update_option" : {
            const optionValue = action.element.target.value;
            return {
                ...state,
                formFields: state.formFields.map((field : apiFormFields)=>{
                    if(field.id === action.field.id){
                        switch (field.kind) {
                            case "DROPDOWN":
                            case "RADIO" :{
                                return {
                                    ...field,
                                    options : field.options ? field.options.map((op : string, i : number)=>{
                                        if(i === action.option){
                                            return optionValue;
                                        }
                                        return op;
                                    }) : []
                                };
                            }
                            default :{
                                return field;
                            }
                        }
                    }else{
                        return field;
                    }
                })
            }
        }
        case "delete_option":{
            return {
                ...state,
                formFields: state.formFields.map((field : apiFormFields)=>{
                    if(field.id === action.field.id){
                        switch (field.kind) {
                            case "DROPDOWN":
                            case "RADIO" :{
                                return {
                                    ...field,
                                    options : field.options ? field.options.filter((op : string, i : number)=>i !== action.optionNumber) : []
                                };
                            }
                            default :{
                                return field;
                            }
                        }
                    }else{
                        return field;
                    }
                })
            }
        }
        case "set_form" : {
            return {
                ...action.form,
                formFields : []
            }
        }
        case "set_form_fields" : {
            const sortedFields = action.formFields.sort((a, b) => {
                return a.id && b.id ? 
                a.id - b.id : 
                0
            });
            const optionedFields = sortedFields.map(field=>{
                let options = field.options;
                if(field.kind !== "TEXT" && options === null){
                    options = [];
                }
                return {
                    ...field,
                    options
                }
            });
            return {
                ...state,
                formFields : optionedFields
            }
        }
        default : {
            return state;
        }
    }
}

