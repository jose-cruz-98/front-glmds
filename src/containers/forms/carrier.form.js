import React, {Component} from 'react';

import {Row} from '../components/layout';
import {Input, Select} from '../components/input';

import {validateForm} from '../../utils/validations/validate';
import rules from '../../utils/validations/rules/carrier.rules';

export default class CarrierForm extends Component{

    state = {
        formData : {
            _tReference : this.props.tReference,
            tCarrier : "",
            tLicensePlate : "",
            tOperator : "",
            tContact : "",
            tCaat : "",
            tName : "",
            tLicensePlateCustody : "",
            tTypeCarrier : ""
        },
        typeCarrier : [
            {
                id : "PUERTO",
                tName : "PUERTO"
            },
            {
                id : "DESPACHO",
                tName : "DESPACHO"
            }
        ],
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
        const {formData, typeCarrier} = this.state;
        return(
            <form id="formNote">
                <Row className="col-xs-12 mb-1">
                    <small className="text-danger">(*) Todos los campos son requeridos</small>
                </Row>
                <Row>
                    <Input 
                        type="text"
                        id="tCarrier"
                        className="col-xs-12 col-md-4"
                        placeholder="Ej. MAERSK"
                        label="Transportista"
                        value={formData.tCarrier}
                        required
                        onChange={this.getValueOfInput.bind(this)}
                    />
                    <Input 
                        type="text"
                        id="tLicensePlate"
                        className="col-xs-12 col-md-4"
                        placeholder="Ej. ABC 234"
                        label="Placa"
                        value={formData.tLicensePlate}
                        required
                        onChange={this.getValueOfInput.bind(this)}
                    />
                    <Select 
                        id="tTypeCarrier"
                        className="col-xs-12 col-md-4"
                        label="Tipo de transporte"
                        options={typeCarrier}
                        value={formData.tTypeCarrier}
                        onChange={this.getValueOfInput.bind(this)}
                        required
                    />
                </Row>
                <Row>
                    <Input 
                        type="text"
                        id="tOperator"
                        className="col-xs-12 col-md-4"
                        placeholder="Ej. Juan Antonio"
                        label="Operador"
                        value={formData.tOperator}
                        required
                        onChange={this.getValueOfInput.bind(this)}
                    />
                    <Input 
                        type="text"
                        id="tContact"
                        className="col-xs-12 col-md-4"
                        placeholder="Ej. 314 355 4578"
                        label="Contacto"
                        value={formData.tContact}
                        onChange={this.getValueOfInput.bind(this)}
                    />
                    <Input 
                        type="text"
                        id="tCaat"
                        className="col-xs-12 col-md-4"
                        placeholder="Ej. xxxx"
                        label="CAAT"
                        value={formData.tCaat}
                        required
                        onChange={this.getValueOfInput.bind(this)}
                    />
                </Row>
                <div className="mt-1 start-xs">Datos de custodia<hr /></div>
                <Row>
                    <Input 
                        type="text"
                        id="tName"
                        className="col-xs-12 col-md-6"
                        placeholder="Ej. MAERSK"
                        label="Nombre"
                        value={formData.tName}
                        onChange={this.getValueOfInput.bind(this)}
                    />
                    <Input 
                        type="text"
                        id="tLicensePlateCustody"
                        className="col-xs-12 col-md-6"
                        placeholder="Ej. ABC 234"
                        label="Placa"
                        value={formData.tLicensePlateCustody}
                        onChange={this.getValueOfInput.bind(this)}
                    />
                </Row>
            </form>
        );
    }
}