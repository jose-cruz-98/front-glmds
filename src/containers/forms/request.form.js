import React, {Component} from 'react';

import {Row} from '../components/layout';
import {Input, TextArea, Select, InputFile} from '../components/input';

import {validateForm} from '../../utils/validations/validate';
import rules from '../../utils/validations/rules/request.rules';

export default class RequestForm extends Component{

    state = {
        formData : {
            tAmount : "",
            tTypePayment : "",
            _tUserTo : "",
            tFile : "",
            tObservation : ""
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
            let formData = new FormData(document.querySelector("#formAddRequest"));
            formData.append("_tReference", this.props.tReference);
            formData.append("_tUserFrom", this.props.tUserFrom);
            formData.append("tStatus", "PENDIENTE");

            return formData;
        }
    }

    render(){
        const {formData} = this.state;
        const {users} = this.props;
        return(
            <form id="formAddRequest" encType="multipart/form-data">
                <Row className="col-xs-12 mb-1">
                    <small className="text-danger">(*) Todos los campos son requeridos</small>
                </Row>
                <Row className="col-xs-12 mb-1">
                <Input 
                    type="text"
                    id="tAmount"
                    className="col-xs-6 col-md-3"
                    placeholder="Ej. 3000"
                    label="Monto"
                    value={formData.tAmount}
                    required
                    onChange={this.getValueOfInput.bind(this)}
                />
                <Input 
                    type="text"
                    id="tTypePayment"
                    className="col-xs-6 col-md-3"
                    placeholder="Ej. Cuenta de gastos"
                    label="Tipo de pago"
                    value={formData.tTypePayment}
                    required
                    onChange={this.getValueOfInput.bind(this)}
                />
                <Select 
                        id="_tUserTo"
                        className="col-xs-6 col-md-3"
                        label="Usuario"
                        options={users}
                        value={formData._tUserTo.toLowerCase()}
                        required
                        onChange={this.getValueOfInput.bind(this)}
                    />
                <InputFile
                    id="tFile"
                    className="col-xs-6 col-md-3"
                    value={formData.tFile}
                    multiple
                    onChange={this.getValueOfInput.bind(this)}
                />
                </Row>
                <Row>
                <TextArea 
                        type="text"
                        id="tObservation"
                        className="col-xs-12"
                        placeholder="Ej. Solicito pago de . . ."
                        label="Nota"
                        rows="4"
                        value={formData.tProduct}
                        onChange={this.getValueOfInput.bind(this)}/>
                </Row>
            </form>
        );
    }
}