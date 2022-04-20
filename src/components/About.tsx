import React from "react";

export default function About() {

    return (
        <div>
            <h1 className="text-5xl font-bold" tabIndex={0}>
                About Formify
            </h1>
            <br/>
            <p tabIndex={0}>
                Formify helps you to create forms as quick as someone can fill them in.
                <br/>
                Made with ❤️ by <a href="https://shivank.writeroo.in/" title="Shivank Kacker Website">Shivank Kacker</a>
            </p>
        </div>
    );
}