'use client';

import { useEffect } from "react";

export default function ThemeObserver(){
    useEffect(() => {
        const html = document.querySelector('html');
        if (window.localStorage.getItem('theme') == 'dark'){
            if(html){
                const theme = window.localStorage.getItem('theme') || 'light'; // Default to 'light'
                html.dataset.theme = theme; // Set the theme
            }
        }
    },[]); 
    return (
        <>

        </>
    )
}