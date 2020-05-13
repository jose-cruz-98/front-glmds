import React, {Component} from "react";

import {connect} from 'react-redux';
import {getRequest,delRequest, updReturnedDocument,addPaymentFile,getPayments,delDocument} from '../../../../../redux/actions/local/payment.action';

import Modal from '../../../../components/modal';
import {RequestListPending, RequestListReturned, FileList} from '../../../../components/list';
import {Alert} from '../../../../components/alert';

import RequestForm from '../../../../forms/request.form';
import DocumentsForm from '../../../../forms/documents.form';

import {getReferenceOfLocalstorage} from '../../../../../utils/helpers';

class RoleFacturation extends Component{
   
    state = {
        loader : false,
        tReference : getReferenceOfLocalstorage(),
        filterPayments : [],
        actionToModal : "",
        _aDocuments : null
    }

    async componentDidMount(){
        try{ 
            if(this.state.tReference !== null){
                await this.props.getRequest({_tReference : this.state.tReference._id},{_id : this.props._id, tRole : this.props.tRole});
                await this.props.getPayments({_tReference : this.state.tReference._id});
            }

            this.props.toggleGeneralLoader();
        }catch(err){
            console.log("Error in refereces : ",err)
        }
    }

    toggleLoader = () => {
        this.setState({
            loader : !this.state.loader
        })
    }

    setActionToModal = (action, _aDocuments=null) =>{
        this.setState({
            ...this.state,
            actionToModal : action,
            _aDocuments : _aDocuments !== null ? _aDocuments : ""
        })
    }

    modalWithForm = () => {
        const {actionToModal} = this.state;
        if(actionToModal === "REVISION"){
            this.modal.setIsShowModal(true);
            return(<DocumentsForm 
                ref={e => this.requestForm = e}
                tReference={this.state.tReference === null ? "" : this.state.tReference._id}
            />)
        }else{
            return(<RequestForm 
                ref={e => this.requestForm = e}
                tReference={this.state.tReference === null ? "" : this.state.tReference._id}
                tUserFrom={this.props._id}
                users={this.props.users}
            />)
        }

    }

    // SEND TO BACK

    handleAddPaymentFile = async (dataForm) => {
        if(this.state._aDocuments !== null){
            console.log("entre")
            dataForm.append("_aDocuments", this.state._aDocuments)
        }

        try {
            await this.props.addPaymentFile(dataForm,{
                toggleLoader : this.toggleLoader,
                showModal : this.modal.setIsShowModal
            },{_id : this.props._id, tRole : this.props.tRole});
        } catch (err) {   
            console.log(err)
        }
    }

    delDocument = async (id) => {
        try{
            await this.props.delDocument({
                _idReference : this.state.tReference._id,
                _idDocument : id
            })

            // this.setState({
            //     ...this.state,
            //     filterDocuments : this.props.documents
            // });
        }catch(err){
            console.log(err)
        }
    }

    render(){
        const {loader} = this.state;
        const {requests,paymentComplete} = this.props;
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
                                    />
                                }
                            </div>
                        </div>
                        <div className="col-xs-12 row">
                            <RequestListPending 
                                datas={requests.pending}
                                role="FACTURACION"
                                setActionToModal={this.setActionToModal.bind(this)}
                            />
                            <RequestListReturned 
                                datas={requests.returned}
                                role="FACTURACION"
                                setActionToModal={this.setActionToModal.bind(this)}
                            />
                        </div>
                    </div>
                </div>
                <Modal
                    id="mPayments"
                    title={"Agregar documento para revision."}
                    className="col-md-10"
                    hasAction
                    getDataForm={() => this.requestForm.getData()}
                    handleSubmit={this.handleAddPaymentFile.bind(this)}
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
    getRequest,
    delRequest,
    updReturnedDocument,
    addPaymentFile,
    getPayments,
    delDocument
})(RoleFacturation);