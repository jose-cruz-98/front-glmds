import React, {Component} from "react";

import {Link} from 'react-router-dom';

import {connect} from 'react-redux';

import {Breadcrumb} from '../../../../components/breadcrumb';
import {Loader} from '../../../../components/loader';
import {Alert} from '../../../../components/alert';
import {Label, Input} from '../../../../components/input';

import RoleOperation from './roleOperation.view';
import RoleFacturation from './roleFacturation.view';

import {getReferenceOfLocalstorage} from '../../../../../utils/helpers';

class ImportPayments extends Component{
   
    state = {
        loaderGeneral : true,
        loader : false,
        tReference : getReferenceOfLocalstorage(),
        filterDocuments : []
    }

    async componentDidMount(){
        try{ 
            if(this.state.tReference !== null){
                // await this.props.getDocument({_tReference : this.state.tReference._id});
            }
        }catch(err){
            console.log("Error in refereces : ",err)
        }
    }

    toggleLoader = () => {
        this.setState({
            loader : !this.state.loader
        })
    }

    toggleGeneralLoader = () => {
        this.setState({
            loaderGeneral : !this.state.loaderGeneral
        })
    }

    BodyUserRole = () => {
        let role = this.props.tRole.join();

        if(role.includes("OPERACIONES") || role.includes("ADMINISTRADOR GENERAL")){
            return <RoleOperation toggleGeneralLoader={this.toggleGeneralLoader}/>
        }else if(role.includes("FACTURACION")){
            return <RoleFacturation toggleGeneralLoader={this.toggleGeneralLoader}/>
        }else{
            console.log("general")
        }
    }

    render(){
        const {loaderGeneral, tReference} = this.state;
        return(
            <React.Fragment>
                <div>
                    <Loader show={loaderGeneral}/>
                    <Breadcrumb title="Pagos para importación">Inicio > Importación > Pagos</Breadcrumb>
                    {
                        tReference === null ? <Alert className="warning-light">
                            Debes de seleccionar una referencia.<Link to="/ls/import/references">Haz click aqui!</Link>
                        </Alert> :
                        <div className="row middle-xs">
                            <div className="col-xs-9">
                                <Label label={`Estas trabajando con la referencia: ${tReference === null ? "" : tReference.tReference}`} className="secondary"/>
                            </div>
                            <div className="col-xs-3">
                                <Input 
                                    type="text"
                                    id="tBuscar"
                                    className="col-xs-12"
                                    placeholder="Ej. Mi archivo"
                                    label="Buscar"
                                    onChange={this.filter}
                                />
                            </div>
                        </div>
                    }
                    {this.BodyUserRole()}
                </div>
            </React.Fragment>
        );
    }
}


const mapStateToProps = state => {
    return {
        tRole : state.SessionReducer.dataUser.tRole
    }
}

export default connect(mapStateToProps, {
})(ImportPayments);