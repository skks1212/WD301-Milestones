import React from "react";

export default function Header(props: {title :string}) {
    return (
        <div className="flex items-center justify-center flex-col">
            <div className="text-3xl font-bold text-center mx-12">
                {props.title}
            </div>
        </div>
    );
};