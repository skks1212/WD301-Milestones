import { formData } from "../components/Form";
import { formAction } from "../types/FormActionTypes";
import { formField, optionTypes } from "../types/FormTypes";

export const reducer = (state : formData, action : formAction) => {
    switch(action.type){
        case "update_title" : {
            return {
                ...state,
                title : action.title
            }
        }
        case "add_field" : {
            let addObject : formField = {
                kind : "text",
                id : state.formFields.length,
                label : action.field.value,
                type: action.field.type
            };
    
            if(optionTypes.includes(action.field.type)){
                addObject = {...addObject, kind : 'options', options : []};
                action.setUpOptions();
            }
    
            if(action.field.value && action.field.value !== '' && action.field.value !== '{}'){
                action.callback?.();
                return {
                    ...state,
                    formFields : [
                        ...state.formFields,
                        addObject
                    ]
                };
                
            }
            return state;
        }
        case "remove_field" : {
            return {
                ...state,
                formFields : state.formFields.filter(field => field.id !== action.field.id)
            };
        }
        case "update_field" : {
            const thisValue = action.element.target.value;
            return {
                ...state,
                formFields: state.formFields.map((field) => {
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
                formFields : state.formFields.map(f=>{
                    if(f.id === action.field.id){
                        switch (f.kind) {
                            case "options":
                                return {
                                    ...f,
                                    options : [
                                        ...f.options,
                                        optionValue
                                    ]
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
                formFields: state.formFields.map((field)=>{
                    if(field.id === action.field.id){
                        switch (field.kind) {
                            case "options":{
                                return {
                                    ...field,
                                    options : field.options.map((op, i)=>{
                                        if(i === action.option){
                                            return optionValue;
                                        }
                                        return op;
                                    })
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
                formFields: state.formFields.map((field)=>{
                    if(field.id === action.field.id){
                        switch (field.kind) {
                            case "options":{
                                return {
                                    ...field,
                                    options : field.options.filter((op, i)=>i !== action.optionNumber)
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
        default : {
            return state;
        }
    }
}