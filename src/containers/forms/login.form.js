import React, {Component} from 'react';

import {Input} from '../components/input';
import {Button} from '../components/button';
import {Row} from '../components/layout';

import {validateForm} from '../../utils/validations/validate';
import rules from '../../utils/validations/rules/login.rules';

export default class LoginForm extends Component {
    state = {
        form : {
            tEmail : "",
            tPassword : ""
        }
    }

    getValueOfInput = (e) => {
        this.setState({
            form : {
                ...this.state.form,
                [e.target.name] : e.target.value
            }
        });
    }

    handleSubmit = () => {
        if(validateForm(this.state.form, rules)){
            this.props.handleSubmit(this.state.form);
        }
    } 

    render(){
        return(
            <form className="col-xs-12 col-sm-6 col-md-3">
                <h2 className="mb-2">Bienvenido</h2>
                <Row>
                    <Input 
                        type="email"
                        id="tEmail"
                        className="col-xs-12"
                        placeholder="Ej. correo@gmail.com"
                        label="Correo"
                        required
                        onChange={this.getValueOfInput.bind(this)}
                    />
                </Row>
                <Row>
                    <Input 
                        type="password"
                        id="tPassword"
                        className="col-xs-12"
                        placeholder="Ej. Antonio12@"
                        label="Contraseña"
                        required
                        onChange={this.getValueOfInput.bind(this)}
                    />
                </Row>
                <Row className="mt-2">
                    <Button
                        className={{
                            div : "col-xs-6",
                            button : "success"
                        }}
                        label="Enviar"
                        icon="far fa-paper-plane"
                        loader={this.props.loader}
                        onClick={this.handleSubmit}/>
                    <Button 
                        className={{
                            div : "col-xs-6",
                            button : "danger"
                        }}
                        label="Inicio"
                        icon="fas fa-home"
                        onClick={false}/>
                </Row>
            </form>
        );
    }
}