import React, {useState, useEffect} from 'react';

import {Button} from './button';
import {toast} from 'react-toastify';

export  const Input = ({label, type, id, className, placeholder, required, onChange, value}) =>{
    const handleChange = (e) => {
        onChange(e);
    }

    return(
        <div className={`form-group ${className}`}>
            <input type={type} 
                id={id} 
                name={id}
                className="form-input" 
                defaultValue={value}
                placeholder={placeholder} 
                required={required}
                onChange={handleChange.bind(this)}/>
            <label htmlFor={id}>{label} {required ? <span className="text-danger">*</span> : ""}</label>
        </div>
    )
}

export const Select = ({id, required, className, label, options, onChange, value}) => {
    const handleChange = (e) => {
        onChange(e);
    }

    const getOptions = () => {
        if(options !== null){
            return options.map((option)=>{
                return(
                    <option value={option.id} key={option.id}>{option.tName}</option>
                )
            })
        }
    }

    return(
        <div className={`form-group ${className}`}>
            <select
                id={id}
                name={id}
                className="form-input"
                onChange={handleChange.bind(this)}
                value={value !== undefined ? value : ""}
                required={required}
            >
                <option value="">Selecciona . . .</option>
                {getOptions()}
            </select>
            <label htmlFor={id}>{label} {required ? <span className="text-danger">*</span> : ""}</label>
        </div>
    )
}

export const TextArea = ({label, id, className, placeholder, required, onChange, rows, value}) => {
    const handleChange = (e) => {
        onChange(e);
    }

    return(
        <div className={`form-group ${className}`}>
            <textarea
                id={id}
                name={id}
                className="form-input"
                placeholder={placeholder}
                rows={rows}
                onChange={handleChange.bind(this)}
                defaultValue={value}
                required={required}
                ></textarea>
            <label htmlFor={id}>{label} {required ? <span className="text-danger">*</span> : ""}</label>
        </div>
    )
}

var arrayItem = [];
export const InputList = ({label, type, id, className, placeholder, required, value, onChange}) => {
    useEffect(()=>{
        if(Object.keys(value).length !== 0){
            if(value[0] !== ""){
                arrayItem = value;
                setItems({
                    [id] : arrayItem
                });
            }
        }

        return () => arrayItem = [];
    },[value, id])
    
    const [items, setItems] = useState({[id] : []});

    const addNewItem = () => {
        let item = document.getElementById(id);
        if(item.value === ""){
            toast("Debes de ingresar un contenedor.", {type : toast.TYPE.WARNING,autoClose : 3000});
        }else{
            arrayItem.push(item.value);
            setItems({
                ...items,
                [id] : arrayItem
            });
            onChange({
                target : {
                    name : id,
                    value : arrayItem
                }
            })
        }
        item.value = ""
    }

    const removeItem = (position) => {
        arrayItem = arrayItem.filter((item) => {
            return arrayItem[position] !== item ? item : ""
        })

        setItems({
            ...items,
            [id] : arrayItem
        });

        onChange({
            target : {
                name : id,
                value : arrayItem
            }
        })
    }
    
    return(
        <div className={className}>
            <div className="row middle-xs">
                <div className="form-group col-xs-11">
                    <input type={type} 
                        id={id} 
                        name={id}
                        className="form-input" 
                        placeholder={placeholder} 
                        required={required}/>
                    <label htmlFor={id}>{label} {required ? <span className="text-danger">*</span> : ""}</label>
                </div>
                <Button 
                    className={{
                        div : "col-xs-1",
                        button : "success"
                    }}
                    icon="fas fa-plus"
                    onClick={addNewItem}/>
            </div>
            <div className="listItemInput col-xs-12">
                <ul>
                    {
                        items[id].map((item, i) => {
                            return(
                            <li key={i}>
                                <div className="row start-xs listItem  middle-xs">
                                    <div className="col-xs-11">{`${i+1} - ${item}`}</div>
                                    <Button 
                                        className={{
                                            div : "col-xs-1",
                                            button : "danger"
                                        }}
                                        icon="fas fa-times"
                                        onClick={() => removeItem(i)}/>
                                </div>
                            </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export const InputFile = ({id, className, required, onChange, multiple}) => {
    const handleChange = (e) => {
        onChange(e);
    }

    return(
        <div className={`form-group ${className}`}>
            <input type="file" 
                id={id} 
                name={id}
                multiple={multiple}
                required={required}
                onChange={handleChange.bind(this)}/>
        </div>
    )
}

export const InputSwitch = ({id, children, onChange, checked, className}) => {
    const handleChange = (e) => {
        onChange({
            target : {
                name : id,
                value : e.target.checked.toString()
            }
        })
    }
    return(
        <div className={`row middle-xs col-xs-2 ${className}`}>
            <label className="switch">
                <input type="checkbox" 
                    id={id} 
                    name={id}
                    checked={checked}
                    value="juan"
                    onChange={handleChange.bind(this)}/>
                <div className="slider round"></div>
            </label>
            {children}
        </div>
    )
}

export const Label = ({label, className}) => {
    return(<div className={`label ${className}`}>
        {label}
    </div>)
}