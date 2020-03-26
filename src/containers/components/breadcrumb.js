import React from 'react';

export const Breadcrumb = (props) => {
    return(
        <React.Fragment>
            <div className="row mt-2 mb-2 bottom-xs">
                <div className="col-xs-12 col-sm-5 col-md-9"><h3>{props.title}</h3></div>
                <div className="col-xs-12 col-sm-7 col-md-3 end-sm">{props.children}</div>
            </div>
        </React.Fragment>
    )
}