import React, {Component} from "react";

import {connect} from 'react-redux';
import {getUsersByRole, 
    addRequest, 
    getRequest,
    delRequest, 
    updReturnedDocument,
    updDocumentToComplete,
    getPayments,
    delDocument,
    addNote,
    addPaymentComplete} from '../../../../../redux/actions/local/payment.action';

import Modal from '../../../../components/modal';
import {FloatButton} from '../../../../components/button';
import {Alert} from '../../../../components/alert';
import {RequestListPending, RequestListRevision, FileList} from '../../../../components/list';

import RequestForm from '../../../../forms/request.form';
import ReturnedDocumentForm from '../../../../forms/returnedDocument.form';
import NoteForm from '../../../../forms/note.form';
import DocumentsForm from '../../../../forms/documents.form';

import {getReferenceOfLocalstorage} from '../../../../../utils/helpers';

class RoleOperation extends Component{
   
    state = {
        loader : false,
        tReference : getReferenceOfLocalstorage(),
        filterPayments : [],
        actionToModal : "",
        _aDocuments : ""
    }

    async componentDidMount(){
        this.props.toggleGeneralLoader();
        try{ 
            if(this.state.tReference !== null){
                await this.props.getUsersByRole({tRole : "FACTURACION"});
                await this.props.getRequest({_tReference : this.state.tReference._id},{_id : this.props._id, tRole : this.props.tRole});
                await this.props.getPayments({_tReference : this.state.tReference._id});
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

    handleSubmit = async (dataForm) => {
        try{
            await this.props.addRequest(dataForm, {
                toggleLoader : this.toggleLoader,
                showModal : this.modal.setIsShowModal
            },{_id : this.props._id, tRole : this.props.tRole})
        }catch(err){
            console.log(err)
        }
    }

    handleReturnedDocument = async (dataForm) => {
        dataForm._aDocuments = this.state._aDocuments._aDocuments
        dataForm.tUri = this.state._aDocuments.tUri
        try{
            this.props.updReturnedDocument(dataForm,{
                toggleLoader : this.toggleLoader,
                showModal : this.modal.setIsShowModal
            },{_id : this.props._id, tRole : this.props.tRole})
        }catch(err){        
            console.log(err)
        }
    }

    delRequest = async(id) => {
        try{
            await this.props.delRequest(id,{_id : this.props._id, tRole : this.props.tRole});
        }catch(err){
            console.log(err)
        }
    }

    setActionToModal = (action, _aDocuments=null) =>{
        this.setState({
            ...this.state,
            actionToModal : action,
            _aDocuments : _aDocuments !== null ? _aDocuments : ""
        })
    }

    modalWithForm = () => {
        const {actionToModal,tReference,_aDocuments} = this.state;
        if(actionToModal === "DEVUELTO"){
            this.modal.setIsShowModal(true);
            return(<ReturnedDocumentForm 
                ref={e => this.requestForm = e}
                tReference={this.state.tReference === null ? "" : this.state.tReference._id}
            />)
        }else if(actionToModal === "NOTA"){
            this.modal.setIsShowModal(true);
            return(<NoteForm 
                ref={e => this.requestForm = e}
                tReference={tReference === null ? "" : tReference._id}
                aDocuments={_aDocuments}
            />)
        }else if(actionToModal === "ADD-PAYMENT-FILE"){
            return(<DocumentsForm 
                ref={e => this.requestForm = e}
                tReference={tReference === null ? "" : tReference._id}
            />)
        }else if(actionToModal === "INFORMACION-EXTRA"){
            this.modal.setIsShowModal(true);
            return this.extraInformation()
        }else{
            return(<RequestForm 
                ref={e => this.requestForm = e}
                tReference={this.state.tReference === null ? "" : this.state.tReference._id}
                tUserFrom={this.props._id}
                users={this.props.users}
            />)
        }

    }

    updDocumentToComplete = async (id) => {
        try {
            await this.props.updDocumentToComplete(id,{_id : this.props._id, tRole : this.props.tRole})
        } catch (err) {
            console.log(err)
        }
    }

    delDocument = async (id) => {
        try{
            await this.props.delDocument({
                _idReference : this.state.tReference._id,
                _idDocument : id
            });
        }catch(err){
            console.log(err)
        }
    }

    addNote = async (dataForm) => {
        try{
            await this.props.addNote(dataForm, {
                toggleLoader : this.toggleLoader,
                showModal : this.modal.setIsShowModal
            })

            this.modal.setIsShowModal(false)

        }catch(err){
            console.log(err)
        }
    }

    addPaymentComplete = async (dataForm) => {
        dataForm.set("tTypeDocument", "PAGOS")
        try{
            await this.props.addPaymentComplete(dataForm, {
                toggleLoader : this.toggleLoader,
                showModal : this.modal.setIsShowModal
            })

            await this.props.getPayments({_tReference : this.state.tReference._id});
        }catch(err){
            console.log(err)
        }
    }

    extraInformation = () => {
        const {_aDocuments} = this.state;
        let data = this.props.paymentComplete.filter(document => _aDocuments === document._id);
        data = data[0];

        return(
            <div>
                <div className="row start-xs mb-1">
                    <div className="col-md-12"><strong>Registrado el: </strong>{data.dRegistered}</div>
                </div>
                <div className="row start-xs mb-1">
                    <div className="col-md-8"><strong>Nombre: </strong>{data.tName}</div>
                    <div className="col-md-4"><strong>Estado: </strong>{data.tStatus}</div>
                </div>
                <div className="row start-xs mb-1">
                    <div className="col-md-12"><strong>Notas: </strong></div>
                </div>
                <div className="row start-xs mb-1">
                    <ol>
                    {
                        data.tNote.map(note => <li key={note}>{note}</li>)
                    }
                    </ol>
                </div>
            </div>
        )
    }

    render(){
        const {loader, actionToModal} = this.state;
        const {requests, paymentComplete} = this.props
        return(
            <React.Fragment>
                <div>
                    <div>
                        <div className="col-xs-12 row">
                            <div className="card-list col-md-12 card-list-complete">
                                {
                                    Object.keys(paymentComplete).length === 0?
                                    <Alert className="warning-light">No hay datos disponibles.</Alert> : 
                                    <FileList 
                                        datas={paymentComplete}
                                        delDocument={this.delDocument.bind(this)}
                                        addFormNewNote={this.setActionToModal.bind(this)}
                                        getExtraInfo={this.setActionToModal.bind(this)}
                                    />
                                    
                                }
                            </div>
                        </div>
                        <div className="col-xs-12 row">
                            <RequestListPending 
                                datas={requests.pending}
                                role="OPERATION"
                                delRequest={this.delRequest.bind(this)}
                            />
                            <RequestListRevision 
                                datas={requests.revision}
                                role="OPERATION"
                                delRequest={this.delRequest.bind(this)}
                                setActionToModal={this.setActionToModal.bind(this)}
                                updDocumentToComplete={this.updDocumentToComplete.bind(this)}
                            />
                        </div>
                    </div>
                </div>
                <div className="container-fb">
                    <FloatButton
                        icon="fa fa-upload"
                        className="info" 
                        tooltip="Nueva documento"
                        onClick={() => {
                            this.setActionToModal("ADD-PAYMENT-FILE")
                            this.modal.setIsShowModal(true)
                        }}/>
                    <FloatButton
                        icon="fa fa-plus"
                        className="success" 
                        tooltip="Nueva referencia"
                        onClick={() => {
                            this.setActionToModal("")
                            this.modal.setIsShowModal(true)
                        }}/>
                </div>
                <Modal
                    id="mPayments"
                    title={actionToModal === "DEVUELTO" ? "Devolver docuento para pago." : actionToModal === "INFORMACION-EXTRA" ? "Informacion del documento" : actionToModal === "ADD-PAYMENT-FILE" ? "Agregar archivo de pago" : "Agregar solicitud para pagos."}
                    className="col-md-10"
                    hasAction
                    getDataForm={() => this.requestForm.getData()}
                    handleSubmit={actionToModal === "DEVUELTO" ? this.handleReturnedDocument.bind(this) : actionToModal === "NOTA" ? this.addNote.bind(this) : actionToModal === "ADD-PAYMENT-FILE" ? this.addPaymentComplete.bind(this) : this.handleSubmit.bind(this)}
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
        tRole : state.SessionReducer.dataUser.tRole,
        _id : state.SessionReducer.dataUser._id,
        users : state.PaymentReducer.users,
        requests : state.PaymentReducer.requests,
        paymentComplete : state.PaymentReducer.paymentComplete
    }
}

export default connect(mapStateToProps, {
    getUsersByRole,
    addRequest,
    getRequest,
    delRequest,
    updReturnedDocument,
    updDocumentToComplete,
    getPayments,
    delDocument,
    addNote,
    addPaymentComplete
})(RoleOperation);