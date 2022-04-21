import { DropResult } from "react-beautiful-dnd";
import { newField, optionsField } from "../components/Form";
import { apiFormFields, apiFormSingular, formField } from "./FormTypes";

type UpdateTitleAction = {
    type : "update_title",
    title : string
};

type AddFieldAction = {
    type : "add_field",
    field : apiFormFields,
    callback? : () => void,
    setUpOptions : () => void,
    setOrder : (ostate : number[]) => void,
    order : number[];
    
};

type RemoveFieldAction = {
    type : "remove_field",
    field : apiFormFields
    setOrder : (ostate : number[]) => void,
    order : number[];
};

type UpdateFieldAction = {
    type : "update_field",
    element : React.ChangeEvent<HTMLInputElement>,
    field : apiFormFields
};

type EmptyFieldsAction = {
    type : "empty_fields"
};

type AddOptionAction = {
    type : "add_option",
    field : apiFormFields,
    optionState : optionsField[],
    callback? : () => void
};

type UpdateOptionAction = {
    type : "update_option",
    element : React.ChangeEvent<HTMLInputElement>,
    field : apiFormFields,
    option : number
};

type DeleteOptionAction = {
    type : "delete_option",
    field : apiFormFields,
    optionNumber : number
}

type SetFormAction = {
    type : "set_form",
    form : apiFormSingular
}

type SetFormFields = {
    type : "set_form_fields",
    formFields : apiFormFields[],
    orderState : number[]
    callback? : (ostate : number[]) => void
}

type SetOrder = {
    type : "set_order",
    order : number[]
}

export type formAction = 
    UpdateTitleAction 
    | AddFieldAction 
    | RemoveFieldAction
    | UpdateFieldAction 
    | EmptyFieldsAction
    | AddOptionAction
    | UpdateOptionAction
    | DeleteOptionAction
    | SetFormAction
    | SetFormFields
    | SetOrder

