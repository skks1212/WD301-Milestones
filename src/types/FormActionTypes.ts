import { newField, optionsField } from "../components/Form";
import { formField } from "./FormTypes";

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
    field : formField
};

type UpdateFieldAction = {
    type : "update_field",
    element : React.ChangeEvent<HTMLInputElement>,
    field : formField
};

type EmptyFieldsAction = {
    type : "empty_fields"
};

type AddOptionAction = {
    type : "add_option",
    field : formField,
    optionState : optionsField[],
    callback? : () => void
};

type UpdateOptionAction = {
    type : "update_option",
    element : React.ChangeEvent<HTMLInputElement>,
    field : formField,
    option : number
};

type DeleteOptionAction = {
    type : "delete_option",
    field : formField,
    optionNumber : number
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

