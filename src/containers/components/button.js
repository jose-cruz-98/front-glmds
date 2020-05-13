import React from 'react';

import {Link} from "react-router-dom";

export const Button = (props) => {
    const {className, label, icon, type, loader, closeModal, openModal, tooltip} = props;

    const onClick = (e) => {
        if(typeof(props.onClick) === "function"){
            props.onClick(e);
        }
    }

    return(
        <div className={className.div}>
            <button type={type === undefined ? "button" : type}
                className={`btn ${className.button}`}
                onClick={onClick}
                disabled={loader}
                close-modal={closeModal}
                open-modal={openModal}
                tooltip={tooltip}>
                <i className={loader === true ? `fas fa-sync-alt fa-spin` : `${icon} ${label === undefined ? "" : " with-label"}`}></i>{loader === true ? "" : label}
            </button>
        </div>
    )
}

export const FloatButton = ({icon, className, tooltip, openModal, onClick, to}) => {
    const handleOnClick = (e) => {
        if(typeof(onClick) === "function"){
            onClick(e);
        }
    }

    const ButtonWithLink = () => {
        return(
            <Link to={to}>
                <button
                    className={className}
                    tooltip={tooltip}
                    open-modal={openModal}
                    onClick={handleOnClick}
                >
                    <i className={icon}></i>
                </button>
            </Link>
        )
    }

    const ButtonWithoutLink = () => {
        return(
            <button
                className={className}
                tooltip={tooltip}
                open-modal={openModal}
                onClick={handleOnClick}
            >
                <i className={icon}></i>
            </button>
        )
    }

    return(
        <div className="float-btn">
            {
                to === undefined ?
                <ButtonWithoutLink /> :
                <ButtonWithLink />
            }
        </div>
    )
}

export const ActionButton = (props) => {

    const ButtonWithLink = () => {
        return(
            <Link to={props.to}>
                <button
                    type="button"
                    className={`btn action-btn ${props.className}`}
                    tooltip={props.tooltip}
                    onClick={onClick}
                    open-modal={props.openModal}
                >
                    <i className={props.icon}></i>
                </button>
            </Link>
        )
    }

    const ButtonWithoutLink = () => {
        return(
            <button
                type="button"
                className={`btn action-btn ${props.className}`}
                tooltip={props.tooltip}
                onClick={onClick}
                open-modal={props.openModal}
            >
                <i className={props.icon}></i>
            </button>
        )
    }

    const onClick = (e) => {
        if(typeof(props.onClick) === "function"){
            props.onClick(e);
        }
    }

    return(
        <React.Fragment>
            {
                props.to === undefined ?
                <ButtonWithoutLink /> :
                <ButtonWithLink />
            }
        </React.Fragment>
    )
}