import React from 'react';

export const Alert = (props) => {
    return(
        <React.Fragment>
            <div className={`${props.className} alert col-xs-12`}>
                {props.children}
            </div>
        </React.Fragment>
    )
}