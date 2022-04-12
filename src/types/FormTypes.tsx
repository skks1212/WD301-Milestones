export const textTypes = ["text" , "textarea" , "date"];
export const optionTypes = ["select" , "multiselect" , "radio" , "checkbox"];

export type optionsField = {
    kind : "options",
    id : number,
    label : string,
    type : string,
    options : string[]
};
export type textField = {
    kind : "text",
    id : number,
    label : string,
    type : string,
};

export type formField = optionsField | textField;

export const fieldTypesDisplay = [
    {
        type : "text",
        name : "Text Field"
    },
    {
        type : "textarea",
        name : "Paragraph"
    },
    {
        type : "date",
        name : "Date"
    },
    {
        type : "select",
        name : "Dropdown"
    },
    {
        type : "multiselect",
        name : "Multiselect Dropdown"
    },
    {
        type : "radio",
        name : "Radio"
    },
    {
        type : "checkbox",
        name : "Checkbox"
    }
];