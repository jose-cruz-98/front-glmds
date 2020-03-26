import React from 'react';

export const Loader = (props) => {
    return(
        <div className={`loader ${props.show ? "" : "hide"}`}>
            <div className="group-loader">
                <div></div>
                <div>Cargando...</div>
            </div>
        </div>
    )
}