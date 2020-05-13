import React, {Component} from 'react';

import {Row} from '../components/layout';
import {TextArea} from '../components/input';

import {validateForm} from '../../utils/validations/validate';
import rules from '../../utils/validations/rules/returnedDocument.rules';

export default class ReturnedDocumentForm extends Component{

    state = {
        formData : {
            tObservationReturned : "",
            tStatus : "DEVUELTO",
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
            <form id="formReturnedDocument">
                <Row className="col-xs-12 mb-1">
                    <small className="text-danger">(*) Todos los campos son requeridos</small>
                </Row>
                <Row>
                <TextArea 
                        type="text"
                        id="tObservationReturned"
                        className="col-xs-12"
                        placeholder="Ej. El documeto no corresponde con . . ."
                        label="Nota"
                        rows="4"
                        value={formData.tObservationReturned}
                        required
                        onChange={this.getValueOfInput.bind(this)}/>
                </Row>
            </form>
        );
    }
}