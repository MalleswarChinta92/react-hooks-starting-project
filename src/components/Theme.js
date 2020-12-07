import React from 'react';
import {useTheme, useThemeUpdate} from './../context/ThemeContextProvider';

const Theme = () => {

    const darkTheme = useTheme()
    const toggleTheme = useThemeUpdate()
    const themeStyles = {
        backgroundColor: darkTheme ? '#333': '#ccc',
        color: darkTheme ? '#ccc' : '#333',
        padding: '2rem',
        margib: '2rem'
    }

    return (
        <>
            <button onClick={toggleTheme}>Toggle</button>
            <div style={themeStyles}>Hello</div>
        </>
    )
}

export default Theme;