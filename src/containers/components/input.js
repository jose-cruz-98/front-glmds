import React, {Component} from 'react';

export default class Input extends Component{
    onChange = (e) => {
        this.props.onChange(e);
    }
    render(){
        const {label, type, id, className, placeholder, required} = this.props;
        return(
            <div className={`form-group ${className}`}>
                <input type={type} 
                    id={id} 
                    name={id}
                    className="form-input" 
                    placeholder={placeholder} 
                    required={required}
                    onChange={this.onChange.bind(this)}/>
                <label htmlFor={id}>{label}</label>
            </div>
        )
    }
}