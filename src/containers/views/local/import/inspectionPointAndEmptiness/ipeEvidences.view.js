import React, {Component} from "react";

import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import {addEvidence, getEvidence} from '../../../../../redux/actions/local/warrantyRecovery.action';

import {Breadcrumb} from '../../../../components/breadcrumb';
import Modal from '../../../../components/modal';
import {FloatButton} from '../../../../components/button';
import {Loader} from '../../../../components/loader';
import {Alert} from '../../../../components/alert';
import {EvidencesGalery} from '../../../../components/evidencesGalery';
import {Label} from '../../../../components/input';

import EvidecesForm from '../../../../forms/evidences.form';

import {getReferenceOfLocalstorage} from '../../../../../utils/helpers';

class IPEEvidences extends Component{
   
    state = {
        loaderGeneral : true,
        loader : false,
        tReference : getReferenceOfLocalstorage(),
        evidences : [],
        actionToModal : "",
        aDocuments : ""
    }

    // lifecicle

    async componentDidMount(){
        try{ 
            if(this.state.tReference !== null){
                await this.props.getEvidence({_tReference : this.state.tReference._id});
            }
            this.setState({
                ...this.state,
                loaderGeneral : !this.state.loaderGeneral
            });
        }catch(err){
            console.log("Error in refereces : ",err)
        }
    }

    // helper

    setActionToModal = (action, aDocuments=null) =>{
        this.setState({
            ...this.state,
            actionToModal : action,
            aDocuments : aDocuments
        })
    }

    toggleLoader = () => {
        this.setState({
            loader : !this.state.loader
        })
    }

    // handle

    handleSubmit = async (dataForm) => {
        try{
            await this.props.addEvidence(dataForm, {
                toggleLoader : this.toggleLoader,
                showModal : this.modal.setIsShowModal
            })
        }catch(err){
            console.log(err)
        }
    }

    modalWithForm = () => {
        const {tReference} = this.state;
        return(<EvidecesForm 
            ref={e => this.requestForm = e}
            tReference={tReference === null ? "" : tReference._id}
        />)

    }

    // render

    render(){
        const {loader, loaderGeneral, tReference, actionToModal} = this.state;
        const {evidences} = this.props

        return(
            <React.Fragment>
                <div>
                    <Loader show={loaderGeneral}/>
                    <Breadcrumb title="Evidencias">Inicio > Importación > Punto de inspección / Vacios > Evidencias</Breadcrumb>
                    {
                        tReference === null ? <Alert className="warning-light">
                            Debes de seleccionar una referencia.<Link to="/ls/import/references">Haz click aqui!</Link>
                        </Alert> :
                        <div className="row middle-xs">
                            <div className="col-xs-12">
                                <Label label={`Estas trabajando con la referencia: ${tReference === null ? "" : tReference.tReference}`} className="secondary"/>
                            </div>
                        </div>
                    }
                    {
                        evidences === null ?
                        <Alert className="warning-light">No hay datos disponibles.</Alert> : 
                        <EvidencesGalery 
                            evidences={evidences}    
                        />
                    }

                </div>
                <div className="container-fb">
                    <FloatButton
                        icon="fa fa-plus"
                        className="success" 
                        tooltip="Nueva referencia"
                        onClick={() => {
                            this.setActionToModal("");
                            this.modal.setIsShowModal(true)
                        }}/>
                </div>
                <Modal
                    id="mDocuments"
                    title={actionToModal === "NOTA" ? "Agregar Nota" : actionToModal === "INFORMACION-EXTRA" ? "Informacion del documento" : "Agregar evidencia"}
                    className="col-md-6"
                    hasAction
                    getDataForm={() => this.requestForm.getData()}
                    handleSubmit={actionToModal === "NOTA" ? this.addNote.bind(this) : this.handleSubmit.bind(this)}
                    loader={loader}
                    ref={e => this.modal = e}>
                        {this.modalWithForm()}
                </Modal>
            </React.Fragment>
        );
    }
}


const mapStateToProps = state => {
    return {
        evidences : state.WarrantyRecovery.evidences
    }
}

export default connect(mapStateToProps, {
    addEvidence,
    getEvidence
})(IPEEvidences);