import React, {Component} from 'react';

import {Row} from '../components/layout';
import {TextArea, InputFile} from '../components/input';

import {validateForm} from '../../utils/validations/validate';
import rules from '../../utils/validations/rules/imagenMonitoring.rules';

export default class ImagenMonitoringForm extends Component{

    state = {
        formData : {
            tNote : "",
            tImagen : ""
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
            let formData = new FormData(document.querySelector("#formAddDocument"));
            formData.append("_idCarrier", this.props._idCarrier);
            return formData;
        }
    }

    render(){
        const {formData} = this.state;

        return(
            <form id="formAddDocument" encType="multipart/form-data">
                <Row className="col-xs-12 mb-1">
                    <small className="text-danger">(*) Todos los campos son requeridos</small>
                </Row>
                <Row className="col-xs-12 mb-1">
                <TextArea 
                    type="text"
                    id="tNote"
                    className="col-xs-12 col-md-6"
                    placeholder="Ej. 20MZ0260"
                    label="Nota"
                    value={formData.tNote}
                    onChange={this.getValueOfInput.bind(this)}
                />
                <InputFile
                    id="tImagen"
                    className="col-xs-12 col-md-6"
                    value={formData.tImagen}
                    required
                    onChange={this.getValueOfInput.bind(this)}
                />
                </Row>
            </form>
        );
    }
}