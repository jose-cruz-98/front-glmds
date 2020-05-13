import React from 'react';

export const Breadcrumb = (props) => {
    return(
        <React.Fragment>
            <div className="row mt-2 mb-2 bottom-xs">
                <div className="col-xs-12 col-md-6 col-lg-3"><h3>{props.title}</h3></div>
                <div className="col-xs-12 col-md-6 col-lg-9 start-xs end-md">{props.children}</div>
            </div>
        </React.Fragment>
    )
}