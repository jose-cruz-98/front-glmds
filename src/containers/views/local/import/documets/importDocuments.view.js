import React, {Component} from "react";

import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import {addDocument, getDocument, delDocument, addNote} from '../../../../../redux/actions/local/documents.action';

import {Breadcrumb} from '../../../../components/breadcrumb';
import Modal from '../../../../components/modal';
import {FloatButton} from '../../../../components/button';
import {Loader} from '../../../../components/loader';
import {Alert} from '../../../../components/alert';
import {FileList} from '../../../../components/list';
import {Label, Input} from '../../../../components/input';

import DocumentsForm from '../../../../forms/documents.form';
import NoteForm from '../../../../forms/note.form';

import {getReferenceOfLocalstorage} from '../../../../../utils/helpers';

class ImportDocuments extends Component{
   
    state = {
        loaderGeneral : true,
        loader : false,
        tReference : getReferenceOfLocalstorage(),
        filterDocuments : [],
        actionToModal : "",
        aDocuments : ""
    }

    async componentDidMount(){
        try{ 
            if(this.state.tReference !== null){
                await this.props.getDocument({_tReference : this.state.tReference._id, tTypeDocument : "DOCUMENTOS"});
            }
            this.setState({
                ...this.state,
                loaderGeneral : !this.state.loaderGeneral,
                filterDocuments : this.props.documents
            });
        }catch(err){
            console.log("Error in refereces : ",err)
        }
    }

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

    handleSubmit = async (dataForm) => {
        try{
            await this.props.addDocument(dataForm, {
                toggleLoader : this.toggleLoader,
                showModal : this.modal.setIsShowModal
            })

            this.setState({
                ...this.state,
                filterDocuments : this.props.documents
            });
        }catch(err){
            console.log(err)
        }
    }

    delDocument = async (id) => {
        try{
            await this.props.delDocument({
                _idReference : this.state.tReference._id,
                _idDocument : id
            })

            this.setState({
                ...this.state,
                filterDocuments : this.props.documents
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

            this.setState({
                ...this.state,
                filterDocuments : this.props.documents
            });
        }catch(err){
            console.log(err)
        }
    }

    filter = (e) => {
        let value = e.target.value;
        if(value === ""){
            this.setState({
                ...this.state,
                filterDocuments : this.props.documents
            })
        }else{
            let filterDocuments = this.props.documents.filter((i) => {
                return (i.tName.includes(value))
            })
            this.setState({
                ...this.state,
                filterDocuments : filterDocuments
            })
        }
    }

    modalWithForm = () => {
        const {actionToModal, tReference, aDocuments} = this.state;
        if(actionToModal === "NOTA"){
            this.modal.setIsShowModal(true);
            return(<NoteForm 
                ref={e => this.requestForm = e}
                tReference={tReference === null ? "" : tReference._id}
                aDocuments={aDocuments}
            />)
        }else if(actionToModal === "INFORMACION-EXTRA"){
            this.modal.setIsShowModal(true);
            return this.extraInformation()
        }else{
            return(<DocumentsForm 
                ref={e => this.requestForm = e}
                tReference={tReference === null ? "" : tReference._id}
            />)
        }

    }

    extraInformation = () => {
        const {filterDocuments, aDocuments} = this.state;
        let data = filterDocuments.filter(document => aDocuments === document._id);
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
        const {loader, loaderGeneral, tReference, filterDocuments, actionToModal} = this.state;
        const {documents} = this.props
        return(
            <React.Fragment>
                <div>
                    <Loader show={loaderGeneral}/>
                    <Breadcrumb title="Documentos para importación">Inicio > Importación > Documentos</Breadcrumb>
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
                    {
                        documents === null || Object.keys(filterDocuments).length === 0?
                        <Alert className="warning-light">No hay datos disponibles.</Alert> : 
                        <FileList 
                            datas={filterDocuments}
                            delDocument={this.delDocument.bind(this)}
                            addFormNewNote={this.setActionToModal.bind(this)}
                            getExtraInfo={this.setActionToModal.bind(this)}
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
                    title={actionToModal === "NOTA" ? "Agregar Nota" : actionToModal === "INFORMACION-EXTRA" ? "Informacion del documento" : "Agregar Documento"}
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
        documents : state.DocumentReducer.documents
    }
}

export default connect(mapStateToProps, {
    addDocument,
    getDocument,
    delDocument,
    addNote
})(ImportDocuments);