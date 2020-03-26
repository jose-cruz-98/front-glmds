import React, {Component} from 'react'

export default class Button extends Component{
    onClick = (e) => {
        if(typeof(this.props.onClick) === "function"){
            this.props.onClick(e);
        }
    }
    render(){
        const {className, label, icon, type, loader} = this.props;
        return(
            <div className={className.div}>
                <button type={this.props.type === undefined ? "button" : type}
                    className={`btn ${className.button}`}
                    onClick={this.onClick.bind(this)}
                    disabled={loader}>
                    <i className={loader === true ? `fas fa-sync-alt fa-spin` : `${icon}`}></i> {loader === true ? "" : label}
                </button>
            </div>
        )
    }
}