import React, {Component} from "react";

import {Link} from "react-router-dom";

import {connect} from 'react-redux';
import {getPatent, getShippingCompany, addReference, getReference, updReference} from '../../../../../redux/actions/local/referenceImport.action';

import {Breadcrumb} from '../../../../components/breadcrumb';
import {Loader} from '../../../../components/loader';

import ReferenceImportForm from '../../../../forms/referenceImport.form';

class AddImportReferences extends Component {

    state = {
        loader : false,
        loaderGeneral : true
    }

    async componentDidMount(){
        try{
            await this.props.getPatent({});   
            await this.props.getShippingCompany({});   
            if(this.props.match.params._id !== undefined){
                await this.props.getReference({tReference : this.props.match.params._id});
            }

            this.setState({
                ...this.state, 
                loaderGeneral : !this.state.loaderGeneral
            });
        }catch(err){
            console.log("Error in refereces : ",err)
        }
    }

    toggleLoader = () => {
        this.setState({
            loader : !this.state.loader
        })
    }

    handleSubmit = async (dataForm) => {
        try{
            if(this.props.match.params._id === undefined){
                await this.props.addReference(dataForm, {
                    toggleLoader : this.toggleLoader,
                    goBack : this.props.history.goBack
                })
            }else{
                await this.props.updReference(dataForm, {
                    toggleLoader : this.toggleLoader,
                    goBack : this.props.history.goBack
                })
            }
        }catch(err){
        }
    }
    
    render(){
        const {loader, loaderGeneral} = this.state
        const {patents, shippingCompanies, history, match, tRole} = this.props;
        return(
            <React.Fragment>
                <div>
                    <Loader show={loaderGeneral}/>
                    <Breadcrumb title={`${match.params._id === undefined ? "Agregar" : "Editar"} referencia`}>
                        Inicio > Importación > <Link to="/ls/import/references" className="text-info">Referencias</Link> > {match.params._id === undefined ? "Agregar" : "Editar"}
                    </Breadcrumb>
                    <ReferenceImportForm
                        role={tRole}
                        patents={patents}
                        shippingCompanies={shippingCompanies}
                        goBack={history.goBack}
                        loader={loader}
                        dataEdit={match.params._id === undefined ? null : this.props.reference}
                        send={this.handleSubmit.bind()}/>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        tRole : state.SessionReducer.dataUser.tRole,
        patents : state.ImportReducer.patents,
        shippingCompanies : state.ImportReducer.shippingCompanies,
        reference : state.ImportReducer.references
    }
}

export default connect(mapStateToProps, {
    getPatent,
    getShippingCompany,
    addReference,
    getReference,
    updReference
})(AddImportReferences);