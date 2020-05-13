import React, {Component} from "react";

import {connect} from 'react-redux';
import {getPatent, 
        getShippingCompany, 
        getReference, 
        changeStatusToRevalidate,
        addEta} from '../../../../../redux/actions/local/referenceImport.action';
import {api} from '../../../../../utils/keys/api.routes'

import {Breadcrumb} from '../../../../components/breadcrumb';
import {FloatButton, ActionButton} from '../../../../components/button';
import {Loader} from '../../../../components/loader';
import {Alert} from '../../../../components/alert';
import DataTable from 'react-data-table-component';
import {Label, Input} from '../../../../components/input';
import Modal from '../../../../components/modal';

import DocumentsForm from '../../../../forms/documents.form';
import EtaForm from '../../../../forms/eta.form';

import {copyReferenceInLocalStorage} from '../../../../../utils/helpers';

class ImportReferences extends Component{
   
    state = {
        loaderGeneral : true,
        loader : false,
        filterReference : [],
        actionToModal : "",
        _tReference : "",
        columns : [{
            name: 'Registrado por',
            selector: (i) => i.aUsers[0] === undefined ? "-" : i.aUsers[0].tName + " " + i.aUsers[0].tSurname,
            sortable: true,
            wrap: true
        },{
            name: 'Referencia',
            selector: 'tReference',
            sortable: true,
            wrap: true,
            grow: 1.5
        },{
            name: 'Patente',
            selector: (i) => i.aPatent[0].iPatent,
            sortable: true
        },{
            name: 'Cliente',
            selector: 'tClient',
            sortable: true,
            wrap: true
        },{
            name: 'Operacion',
            selector: (i) => {
                return (`I-${i.tImportKey}`);
            },
            sortable: true
        },{
            name: 'B/L',
            selector: 'tBl',
            sortable: true,
            wrap: true,
            grow : 2
        },{
            name: 'Contenedor',
            cell: rows => {
                return <div>
                    {rows.tContainer.map((genre, i) => {
                         return <div key={i}>{`${i+1}. ${genre}`}</div>
                        })
                    }
                </div>},
            sortable: true,
            wrap: true,
            grow: 2.5
        },{
            name: 'eTA',
            cell: rows => {
                return <div>
                    {rows.tEta.map((eta, i) => {
                         return <div key={i}>{`${i+1}. ${eta}`}</div>
                        })
                    }
                </div>},
            sortable: true,
            wrap: true,
            grow : 2
        },{
            name: 'Origen',
            selector: "tOrigin",
            sortable: true,
        },{
            name: 'Destino',
            selector: 'tDestination',
            sortable: true,
            grow : 1.5,
            wrap: true
        },{
            name: 'Estado',
            selector: (i) => {
                return (<Label label={i.tStatus} 
                            className={i.tStatus === "Pendiente" ? "info" 
                            : i.tStatus === "Revalidado" ? "danger" 
                            : i.tStatus === "Pagado" ? "teal" 
                            : i.tStatus === "Programada" ? "secondary" : ""} />);
            },
            sortable: true
        },{
            name: 'Acciones',
            cell: rows => {
                return(
                    <div className="">
                        <ActionButton 
                            icon="fa fa-exclamation"
                            tooltip="Informacion Extra"
                            className="info"
                            onClick={()=>{
                                this.setActionToModal("INFORMACION-EXTRA", rows.tReference);
                                this.modal.setIsShowModal(true);
                            }}
                        />
                        <ActionButton 
                            icon="fa fa-copy"
                            tooltip="Copiar referencia"
                            className="info"
                            onClick={() => copyReferenceInLocalStorage(rows._id, rows.tReference)}
                        />
                        <ActionButton 
                            icon="fa fa-calendar"
                            tooltip="Nueva eTA"
                            className="purple"
                            onClick={()=>{
                                this.setActionToModal("", rows.tReference);
                                this.modal.setIsShowModal(true);
                            }}
                        />
                        <ActionButton 
                            icon="fa fa-edit"
                            tooltip="Editar referencia"
                            className="warning"
                            to={`/ls/import/references/edit/${rows.tReference}`}
                        />
                        {rows.tStatus === "Pendiente" ? <ActionButton 
                            icon="fa fa-undo"
                            tooltip="Revalidar"
                            className="danger"
                            onClick={()=>{
                                this.setActionToModal("Revalidado", rows.tReference);
                                this.modal.setIsShowModal(true);
                            }}
                        /> : ""}
                        {rows.tStatus === "Revalidado" ? <ActionButton 
                            icon="fa fa-file-invoice-dollar"
                            tooltip="Pago pedimento"
                            className="teal"
                            onClick={()=>{
                                this.setActionToModal("Pagado", rows.tReference);
                                this.modal.setIsShowModal(true);
                            }}
                        /> : ""}
                        {rows.tStatus === "Pagado" ? <ActionButton 
                            icon="fa fa-bezier-curve"
                            tooltip="Maniobras portuarias"
                            className="secondary"
                            onClick={()=>{
                                this.setActionToModal("Programada", rows.tReference);
                                this.modal.setIsShowModal(true);
                            }}
                        /> : ""}
                    </div>
                )
            },
            grow: 5
        }]
    }

    async componentDidMount(){
        try{
            await this.props.getReference({},this.props.tRole,this.props._id)
            await this.props.getPatent({});   
            await this.props.getShippingCompany({});   

            this.setState({
                ...this.state, 
                filterReference : this.props.references,
                loaderGeneral : !this.state.loaderGeneral
            });
        }catch(err){
            console.log("Error in refereces : ",err)
        }
    }

    // HELPERS

    setActionToModal = (action, tReference) =>{
        this.setState({
            ...this.state,
            actionToModal : action,
            tReference : tReference
        })
    }

    toggleLoader = () => {
        this.setState({
            loader : !this.state.loader
        })
    }


    filter = (e) => {
        let value = e.target.value;
        value = value.toUpperCase();
        if(value === ""){
            this.setState({
                ...this.state,
                filterReference : this.props.references
            })
        }else{
            let filterReference = this.props.references.filter((i) => {
                return (i.tReference.includes(value) ||
                i.tContainer.join().includes(value)||
                i.tBl.includes(value) ||
                i.tClient.includes(value))
            })

            this.setState({
                ...this.state,
                filterReference : filterReference
            })
        }
    }

    modalWithForm = () => {
        const {actionToModal, tReference} = this.state;
        if(actionToModal === "Revalidado" || actionToModal === "Pagado" || actionToModal === "Programada"){
            return(<DocumentsForm 
                ref={e => this.requestForm = e}
                tReference={tReference}
            />)
        }else if(actionToModal === "INFORMACION-EXTRA"){
            this.modal.setIsShowModal(true);
            return this.extraInformation()
        }else{
            return(<EtaForm 
                ref={e => this.requestForm = e}
                tReference={tReference}
            />)
        }
    }

    extraInformation = () => {
        const {filterReference, tReference} = this.state;
        let data = filterReference.filter(reference => tReference === reference.tReference);
        data = data[0];
        
        data.aDocuments = data.aDocuments !== undefined ? data.aDocuments : []

        return(
            <div>
                <div className="row start-xs mb-2">
                    <div className="col-md-4 col-xs-12"><strong>Registrado el: </strong>{data.dRegistered}</div>
                    <div className="col-md-4 col-xs-12"><strong>Registrado por: </strong>{
                        data.aUsers[0] === undefined ? "-" : data.aUsers[0].tName + " " + data.aUsers[0].tSurname
                    }</div>
                    <div className="col-md-4 col-xs-12"><strong>Estado: </strong>{data.tStatus}</div>
                </div>
                <div className="row start-xs mb-2">
                    <div className="col-md-4 col-xs-12"><strong>Referencia: </strong>{data.tReference}</div>
                    <div className="col-md-4 col-xs-12"><strong>Importador: </strong>{data.tImporter}</div>
                    <div className="col-md-4 col-xs-12"><strong>Cliente: </strong>{data.tClient}</div>
                </div>
                <div className="row start-xs mb-2">
                    <div className="col-md-4 col-xs-12"><strong>Origen: </strong>{data.tOrigin}</div>
                    <div className="col-md-4 col-xs-12"><strong>Destino: </strong>{data.tDestination}</div>
                    <div className="col-md-4 col-xs-12"><strong>Naviera: </strong>{data.aShippingCompany[0].tName}</div>
                </div>
                <div className="row start-xs mb-2">
                    <div className="col-md-12"><strong>Patente: </strong>{data.aPatent[0].iPatent} - {data.aPatent[0].tAgent}</div>
                </div>
                <div className="row start-xs mb-2">
                    <div className="col-md-4 col-xs-12"><strong>Clave de importacion: </strong>I-{data.tImportKey}</div>
                    <div className="col-md-4 col-xs-12"><strong>B/L: </strong>{data.tBl}</div>
                    <div className="col-md-4 col-xs-12"><strong>eTA: </strong>
                        <ol>
                            {data.tEta.map(eta => {
                                return <li key={eta}>{eta}</li>
                            })}
                        </ol>
                    </div>
                </div>
                <div className="row start-xs mb-2">
                <div className="col-md-12"><strong>Contenedor: </strong>
                        <ol>
                            {data.tContainer.map(container => {
                                return <li key={container}>{container}</li>
                            })}
                        </ol>
                    </div>
                </div>
                <div className="row start-xs mb-2">
                    <div className="col-md-4 col-xs-12"><strong>Fraccion arancelaria: </strong>{data.tTariffFraction}</div>
                    <div className="col-md-8 col-xs-12"><strong>Producto: </strong>{data.tProduct}</div>
                </div>
                <div className="row start-xs mb-2">
                    <div className="col-md-12"><strong>Observaciones: </strong>{data.tObservation !== "" ? data.tObservation : "N/A"}</div>
                </div>
                {
                    data.aDocuments.length !== 0 ? 
                    <div className="row start-xs mb-2">
                        <ol>
                            {data.aDocuments.map(container => {
                                let namefile = container.tUri.split("/");
                                return(
                                    <li key={container._id} className="mb-2">
                                        <div>
                                            <div><strong>Registrado: </strong>{container.dRegistered}</div>
                                            <div><strong>Estado: </strong>{container.tStatus}</div>
                                            <div><strong>Documento: </strong><a href={`${api.API}/documents/attached/${namefile[3]}/${namefile[4]}/${namefile[5]}`} target="_blank" className="a-file-link" rel="noopener noreferrer">{container.tName}</a></div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ol>
                    </div> : ""
                }
            </div>
        )
    }

    // HANDLE

    changeStatusToRevalidate = async (dataForm) => {
        dataForm.set("tStatus", this.state.actionToModal);
        try{
            await this.props.changeStatusToRevalidate(dataForm,{
                toggleLoader : this.toggleLoader,
                showModal : this.modal.setIsShowModal
            })

            this.setState({
                ...this.state, 
                filterReference : this.props.references
            });
        }catch(err){
            console.log(err)
        }
    }

    addEta = async (dataForm) => {
        try{
            await this.props.addEta(dataForm,{
                toggleLoader : this.toggleLoader,
                showModal : this.modal.setIsShowModal
            });

            this.setState({
                ...this.state, 
                filterReference : this.props.references
            });
        }catch(err){
            console.log(err)
        }
    }

    render(){
        const {loader, filterReference, columns, actionToModal} = this.state;
        return(
            <React.Fragment>
                <div>
                    <Loader show={this.state.loaderGeneral}/>
                    <Breadcrumb title="Referencias para importación">Inicio > Importación > Referencias</Breadcrumb>
                    {
                        this.props.references === null ?
                        <Alert className="warning-light">No hay datos disponibles.</Alert> : 
                        <div className="white"><DataTable
                            noHeader
                            data={filterReference}
                            columns={columns}
                            theme="solarized"
                            highlightOnHover
                            pointerOnHover
                            pagination
                            paginationPerPage={10}
                            paginationComponentOptions={{
                                rowsPerPageText: 'Filas por página',
                                rangeSeparatorText: 'de'
                            }}
                            progressPending={loader}
                            subHeader
                            subHeaderComponent={
                                <Input 
                                type="text"
                                id="tBuscar"
                                className="col-xs-12"
                                placeholder="Ej. 20MZ0260"
                                label="Buscar"
                                onChange={this.filter}
                            />
                            }
                        /></div>
                    }
                </div>
                <div className="container-fb">
                    <FloatButton
                        icon="fa fa-plus"
                        className="success" 
                        tooltip="Nueva referencia"
                        openModal="true"
                        to="/ls/import/references/add"/>
                </div>
                <Modal
                    id="mImportReferences"
                    title={actionToModal === "Revalidado" ? "Agregar documento para revalidar." 
                            : actionToModal === "INFORMACION-EXTRA" ? "Informacion del la referencia" 
                            : actionToModal === "Pagado" ? "Agregar documento para pago de pedimento." 
                            : actionToModal === "Programada" ? "Agregar documento para maniobra portuarias." :"Agregar Nueva eTA"}
                    className={actionToModal === "INFORMACION-EXTRA" ? "col-md-8" : "col-md-6"}
                    hasAction
                    getDataForm={() => this.requestForm.getData()}
                    handleSubmit={actionToModal === "Revalidado" 
                                    || actionToModal === "Pagado" 
                                    || actionToModal === "Programada" ? this.changeStatusToRevalidate.bind(this) 
                                    : this.addEta.bind(this)}
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
        _id : state.SessionReducer.dataUser._id,
        tRole : state.SessionReducer.dataUser.tRole,
        patents : state.ImportReducer.patents,
        shippingCompanies : state.ImportReducer.shippingComapnies,
        references : state.ImportReducer.references
    }
}

export default connect(mapStateToProps, {
    getPatent,
    getShippingCompany,
    getReference,
    changeStatusToRevalidate,
    addEta
})(ImportReferences);