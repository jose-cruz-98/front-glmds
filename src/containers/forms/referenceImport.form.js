import React, {Component} from 'react';

import {Row} from '../components/layout';
import {Input, Select, TextArea, InputList, InputSwitch} from '../components/input';
import {Button} from '../components/button';

import {validateForm} from '../../utils/validations/validate';
import rules from '../../utils/validations/rules/referenceImport.rules';

export default class ReferenceImportForm extends Component{

    state = {
        importKey : [
            {
                id : "A1",
                tName : "A1"
            },
            {
                id : "A4",
                tName : "A4"
            }
        ],
        formData : {
            tReference : "",
            tEta : [],
            tBl : "",
            tImportKey : "",
            _idPatent : "",
            _idShippingCompany : "",
            tImporter : "",
            tTariffFraction : "",
            tProduct : "",
            tOrigin : "",
            tDestination : "",
            tClient : "",
            tObservation : "",
            tContainer : [],
            tPrivate : "FALSE"
        }
    }

    getValueOfInput = (e) => {
        let value = e.target.value;
        if(Array.isArray(value)){
            let arrayToString = value.toString()
            arrayToString = arrayToString.toUpperCase()
            arrayToString = arrayToString.split(",")
            value = arrayToString
        }else if(e.target.name === "tEta"){
            value = [value]
        }else{
            value = value.toUpperCase();
        }
        this.setState({
            formData : {
                ...this.state.formData,
                [e.target.name] : value
            }
        })
    }

    handleSend = () => {
        if(validateForm(this.state.formData, rules)){
            this.props.send(this.state.formData)
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.dataEdit !== null){
            let data = nextProps.dataEdit[0];
            this.setState({
                formData : data
            })
        }
    }

    render(){
        const {formData, importKey} = this.state;
        const {patents, shippingCompanies, role} = this.props;

        return(
            <form id="formAddOrEditImportReference">
                <Row className="col-xs-12 mb-1">
                    <small className="text-danger">(*) Todos los campos son requeridos</small>
                </Row>
                {
                    role.join().includes('PRIVADO') ? <Row>
                        <InputSwitch 
                            id="tPrivate" 
                            checked={formData.tPrivate === "TRUE" ? true : false}
                            onChange={this.getValueOfInput.bind(this)}
                        >Privado</InputSwitch>
                    </Row> : null
                }
                <Row>
                    <Input 
                        type="text"
                        id="tReference"
                        className="col-xs-6 col-md-3"
                        placeholder="Ej. 20MZ0260"
                        label="Referencia"
                        value={formData.tReference}
                        required
                        onChange={this.getValueOfInput.bind(this)}
                    />
                    <Input 
                        type="date"
                        id="tEta"
                        className="col-xs-6 col-md-3"
                        value={formData.tEta[0]}
                        label="eTa"
                        required
                        onChange={this.getValueOfInput.bind(this)}
                    />
                    
                    <Input 
                        type="text"
                        id="tBl"
                        className="col-xs-6 col-md-3"
                        label="B/L"
                        value={formData.tBl}
                        placeholder="Ej. MEDUL2590478"
                        onChange={this.getValueOfInput.bind(this)}
                        required
                    />
                    <Select 
                        id="tImportKey"
                        className="col-xs-6 col-md-3"
                        label="Clave de importacion"
                        options={importKey}
                        value={formData.tImportKey}
                        onChange={this.getValueOfInput.bind(this)}
                        required
                    />
                </Row>
                <Row>
                    <InputList 
                        type="text"
                        id="tContainer"
                        className="col-xs-12"
                        label="Contenedor"
                        placeholder="Ej. CXRU1219220"
                        onChange={this.getValueOfInput.bind(this)}
                        value={formData.tContainer}
                        required
                    />
                </Row>
                <Row>
                    <Select 
                        id="_idPatent"
                        className="col-xs-6 col-md-3"
                        label="Patente"
                        options={patents}
                        value={formData._idPatent.toLowerCase()}
                        required
                        onChange={this.getValueOfInput.bind(this)}
                    />
                    <Select 
                        id="_idShippingCompany"
                        className="col-xs-6 col-md-3"
                        label="Naviera"
                        options={shippingCompanies}
                        value={formData._idShippingCompany.toLowerCase()}
                        required
                        onChange={this.getValueOfInput.bind(this)}
                    />
                    <Input 
                        type="text"
                        id="tImporter"
                        className="col-xs-6 col-md-6"
                        placeholder="Ej. Logistica patagonica"
                        label="Importador"
                        required
                        value={formData.tImporter}
                        onChange={this.getValueOfInput.bind(this)}
                    />
                </Row>
                <Row>
                    <Input 
                        type="text"
                        id="tTariffFraction"
                        className="col-xs-6 col-md-3"
                        placeholder="Ej. Chile"
                        label="Fraccion arancelaria"
                        required
                        value={formData.tTariffFraction}
                        onChange={this.getValueOfInput.bind(this)}
                    />
                    <TextArea 
                        type="text"
                        id="tProduct"
                        className="col-xs-6 col-md-9"
                        placeholder="Ej. Ajo, Chile seco"
                        label="Producto"
                        rows="1"
                        required
                        value={formData.tProduct}
                        onChange={this.getValueOfInput.bind(this)}/>
                </Row>
                <Row>
                    <Input 
                        type="text"
                        id="tOrigin"
                        className="col-xs-6 col-md-3"
                        placeholder="Ej. Chile"
                        label="Origen"
                        required
                        value={formData.tOrigin}
                        onChange={this.getValueOfInput.bind(this)}
                    />
                     <Input 
                        type="text"
                        id="tDestination"
                        className="col-xs-6 col-md-3"
                        placeholder="Ej. Mexico"
                        label="Destino"
                        required
                        value={formData.tDestination}
                        onChange={this.getValueOfInput.bind(this)}
                    />
                    <Input 
                        type="text"
                        id="tClient"
                        className="col-xs-6 col-md-6"
                        placeholder="Ej. Juan Perez Leon"
                        label="Cliente"
                        required
                        value={formData.tClient}
                        onChange={this.getValueOfInput.bind(this)}
                    />
                </Row>
                <Row>
                    <TextArea 
                        type="text"
                        id="tObservation"
                        className="col-xs-12"
                        placeholder="Ej. El producto . . ."
                        label="Obervación"
                        rows="3"
                        value={formData.tObservation}
                        onChange={this.getValueOfInput.bind(this)}/>
                </Row>
                <Row className="center-xs mt-1">
                    <Button 
                        label="Regresar"
                        icon="fa fa-arrow-left"
                        className={{
                            div:"col-xs-6 col-md-2",
                            button : "danger"
                        }}
                        onClick={() => this.props.goBack()}
                    />
                    <Button 
                        label="Enviar"
                        icon="far fa-paper-plane"
                        className={{
                            div:"col-xs-6 col-md-2",
                            button : "success"
                        }}
                        loader={this.props.loader}
                        onClick={this.handleSend}
                    />
                </Row>
            </form>
        );
    }
}