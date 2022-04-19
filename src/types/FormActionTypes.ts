import { newField, optionsField } from "../components/Form";
import { apiFormFields, apiFormSingular, formField } from "./FormTypes";

type UpdateTitleAction = {
    type : "update_title",
    title : string
};

type AddFieldAction = {
    type : "add_field",
    field : newField,
    callback? : () => void,
    setUpOptions : () => void
};

type RemoveFieldAction = {
    type : "remove_field",
    field : apiFormFields
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
    formFields : apiFormFields[]
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

