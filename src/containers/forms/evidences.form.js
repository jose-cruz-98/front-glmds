import React, {Component} from 'react';

import {Row} from '../components/layout';
import {InputFile, TextArea} from '../components/input';

import {validateForm} from '../../utils/validations/validate';
import rules from '../../utils/validations/rules/evidences.rules';

export default class DocumentsForm extends Component{

    state = {
        formData : {
            tNote : "",
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
                <Row>
                    <TextArea 
                        type="text"
                        id="tNote"
                        className="col-xs-12"
                        placeholder="Ej. 20MZ0260"
                        label="Nota"
                        value={formData.tNote}
                        onChange={this.getValueOfInput.bind(this)}
                    />
                </Row>
                <Row className="col-xs-12 mb-1">
                    <InputFile
                        id="tFile"
                        className="col-xs-12"
                        value={formData.tFile}
                        multiple
                        required
                        onChange={this.getValueOfInput.bind(this)}
                    />
                </Row>
            </form>
        );
    }
}