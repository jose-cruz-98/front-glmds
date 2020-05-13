import React, {Component} from 'react';

import {Row} from '../components/layout';
import {Input} from '../components/input';

import {validateForm} from '../../utils/validations/validate';
import rules from '../../utils/validations/rules/eta.rules';

export default class EtaForm extends Component{

    state = {
        formData : {
            tEta : "",
            _tReference : this.props.tReference
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
                        type="date"
                        id="tEta"
                        className="col-xs-12"
                        value={formData.tEta[0]}
                        label="eTa"
                        required
                        onChange={this.getValueOfInput.bind(this)}
                    />
                </Row>
            </form>
        );
    }
}