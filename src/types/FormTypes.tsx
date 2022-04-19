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

export type apiForm = {
    id? : number,
    title : string,
    description? : string,
    is_public? : boolean
}

export type apiFormSingular = {
    id? : number,
    title : string,
    description? : string,
    is_public? : boolean,
    created_by? : number,
    created_date? : string,
    modified_date? : string
}

export type apiFormFields = {
    id? : number,
    label : string,
    kind : "TEXT" | "DROPDOWN" | "RADIO" | "GENERIC",
    options? : string[] | null,
    value? : string,
    meta? : {
        description? : string
    }
};

export type apiFormWithFields = apiFormSingular & {formFields: any};

export type apiRecieveForm = {
    created_by: number,
    created_date: string,
    description: string,
    id: number,
    is_public: boolean,
    modified_date: string,
    title: string
}

export type Error<T> = Partial<Record<keyof T, string>>;

export const validateForm = (form : apiForm) => {
    const errors : Error<apiForm> = {};
    if(form.title.length < 1){
        errors.title = "No title specified";
    }
    if(form.title.length > 100){
        errors.title = "Title cannot exceed 100 characters";
    }
    return errors;
}

export type formField = optionsField | textField;

/*export const fieldTypesDisplay = [
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
];*/
export const fieldTypesDisplay = [
    {
        type : "TEXT",
        name : "Text Field"
    },
    {
        type : "DROPDOWN",
        name : "Dropdown"
    },
    {
        type : "RADIO",
        name : "Radio"
    }
];