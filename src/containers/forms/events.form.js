import React, {Component} from 'react';

import {Row} from '../components/layout';
import {Input} from '../components/input';

import {validateForm} from '../../utils/validations/validate';
import rules from '../../utils/validations/rules/event.rules';

export default class EventsForm extends Component{

    state = {
        formData : {
            tTitle : "",
            tStart : "",
            tEnd : "",
            _tReference : this.props.tReference,
        }
    }

    getValueOfInput = (e) => {
        let value = e.target.value;
        value = value.toUpperCase();
        this.setState({
            formData : {
                ...this.state.formData,
                [e.target.name] : value
            }
        })
    }

    getData = () => {
        if(validateForm(this.state.formData, rules)){
            return this.state.formData;
        }
    }

    render(){
        const {formData} = this.state;
        return(
            <form id="formNote">
                <Row className="col-xs-12 mb-1">
                    <small className="text-danger">(*) Todos los campos son requeridos</small>
                </Row>
                <Row>
                    <Input 
                        type="text"
                        id="tTitle"
                        className="col-xs-12 col-md-6"
                        placeholder="Ej. Entrega de garantia"
                        label="Titulo"
                        value={formData.tTitle}
                        required
                        onChange={this.getValueOfInput.bind(this)}
                    />
                    <Input 
                        type="date"
                        id="tStart"
                        className="col-xs-12 col-md-6"
                        label="Fecha"
                        value={formData.tStart}
                        required
                        onChange={this.getValueOfInput.bind(this)}
                    />
                </Row>
            </form>
        );
    }
}