import React, {Component} from 'react';

import {Row} from '../components/layout';
import {Input, InputFile} from '../components/input';

import {validateForm} from '../../utils/validations/validate';
import rules from '../../utils/validations/rules/documet.rules';

export default class DocumentsForm extends Component{

    state = {
        formData : {
            tName : "",
            tFile : ""
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
            formData.append("_tReference", this.props.tReference);
            formData.append("tOperation", "IMPORTACION");
            formData.append("tTypeDocument", "DOCUMENTOS");
            formData.append("tStatus", "COMPLETADO");

            return formData;
        }
    }

    // componentWillReceiveProps(nextProps){
    //     if(nextProps.dataEdit !== null){
    //         let data = nextProps.dataEdit[0];
    //         this.setState({
    //             formData : data
    //         })
    //     }
    // }

    render(){
        const {formData} = this.state;

        return(
            <form id="formAddDocument" encType="multipart/form-data">
                <Row className="col-xs-12 mb-1">
                    <small className="text-danger">(*) Todos los campos son requeridos</small>
                </Row>
                <Row className="col-xs-12 mb-1">
                <Input 
                    type="text"
                    id="tName"
                    className="col-xs-12 col-md-6"
                    placeholder="Ej. 20MZ0260"
                    label="Nombre"
                    value={formData.tName}
                    required
                    onChange={this.getValueOfInput.bind(this)}
                />
                <InputFile
                    id="tFile"
                    className="col-xs-12 col-md-6"
                    value={formData.tFile}
                    required
                    onChange={this.getValueOfInput.bind(this)}
                />
                </Row>
            </form>
        );
    }
}