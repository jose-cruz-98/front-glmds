import React from 'react';

export const Row = (props) => {
    return(<div className={`row ${props.className}`}>
        {props.children}
    </div>)
}