import React, {Component} from "react";

import {connect} from 'react-redux';
import {addCarrier, getCarriers, addImagenMonitoring} from '../../../../../redux/actions/local/warrantyRecovery.action';

import Modal from '../../../../components/modal';
import {Alert} from '../../../../components/alert';
import {Breadcrumb} from '../../../../components/breadcrumb';
import {Loader} from '../../../../components/loader';
import {Label, Input} from '../../../../components/input';
import {FloatButton, ActionButton} from '../../../../components/button';
import {Link} from 'react-router-dom';
import DataTable from 'react-data-table-component';

import CarrierForm from '../../../../forms/carrier.form';
import ImagenMonitoringForm from '../../../../forms/imagenMonitoring.form';
import {api} from '../../../../../utils/keys/api.routes'


import {getReferenceOfLocalstorage} from '../../../../../utils/helpers';

class IPEMonitoring extends Component{
   
    state = {
        loaderGeneral : true,
        loader : false,
        tReference : getReferenceOfLocalstorage(),
        filterCarriers : [],
        actionToModal : "",
        _idCarrier : "",
        columns : [{
            name: 'Transportista',
            selector: 'tCarrier',
            sortable: true,
            wrap: true
        },{
            name: 'Tipo de transporte',
            selector: 'tTypeCarrier',
            sortable: true,
            wrap: true
        },{
            name: 'Operador',
            selector: 'tOperator',
            sortable: true,
            wrap: true
        },{
            name: 'Contacto',
            selector: 'tContact',
            sortable: true
        },{
            name: 'Placa',
            selector: 'tLicensePlate',
            sortable: true,
            wrap: true
        },{
            name: 'CAAT',
            selector: 'tCaat',
            sortable: true,
            wrap: true
        },{
            name: 'Nombre-custodia',
            selector: (i) => {
                return i.tName ? i.tName : "-";
            },
            sortable: true,
            wrap: true
        },{
            name: 'Placa-custodia',
            selector: (i) => {
                return i.tLicensePlateCustody ? i.tLicensePlateCustody : "-";
            },
            sortable: true,
            wrap: true
        },{
            name: 'Acciones',
            cell: rows => {
                return(
                    <div className="">
                        <ActionButton 
                            icon="fa fa-exclamation"
                            tooltip="Informacion extra"
                            className="info"
                            onClick={() => {
                                this.setActionToModal("INFORMACION-EXTRA", rows._id);
                                this.modal.setIsShowModal(true)
                            }}
                        />
                        <ActionButton 
                            icon="fa fa-upload"
                            tooltip="Agregar Imagen"
                            className="primary"
                            onClick={() => {
                                this.setActionToModal("IMAGEN", rows._id);
                                this.modal.setIsShowModal(true)
                            }}
                        />
                    </div>
                )
            },
            grow: 2
        }]
    }

    // live cycle
    async componentDidMount(){
        try{ 
            if(this.state.tReference !== null){
                await this.props.getCarriers({_tReference : this.state.tReference._id});
            }

            this.setState({
                ...this.state,
                loaderGeneral : !this.state.loaderGeneral,
                filterCarriers : this.props.carriers
            });
        }catch(err){
            console.log("Error in refereces : ",err)
        }
    }

    // helpers
    toggleLoader = () => {
        this.setState({
            loader : !this.state.loader
        })
    }

    setActionToModal = (action, _idCarrier=null) =>{
        this.setState({
            ...this.state,
            actionToModal : action,
            _idCarrier : _idCarrier
        })
    }

    filter = (e) => {
        let value = e.target.value;
        value = value.toUpperCase();
        if(value === ""){
            this.setState({
                ...this.state,
                filterCarriers : this.props.carriers
            })
        }else{
            let filterCarriers = this.props.carriers.filter((i) => {
                return (i.tCarrier.includes(value))
            })
            this.setState({
                ...this.state,
                filterCarriers : filterCarriers
            })
        }
    }

    modalWithForm = () => {
        const {actionToModal, tReference, _idCarrier} = this.state;
        if(actionToModal === "IMAGEN"){
            this.modal.setIsShowModal(true);
            return(<ImagenMonitoringForm 
                ref={e => this.requestForm = e}
                tReference={tReference === null ? "" : tReference._id}
                _idCarrier={_idCarrier}
            />)
        }else if(actionToModal === "INFORMACION-EXTRA"){
            this.modal.setIsShowModal(true);
            return this.extraInformation()
        }else{
            return(<CarrierForm 
                ref={e => this.requestForm = e}
                tReference={tReference === null ? "" : tReference._id}
            />)
        }

    }
    
    extraInformation = () => {
        const {filterCarriers, _idCarrier} = this.state;
        let data = filterCarriers.filter(filterCarrier => filterCarrier._id === _idCarrier);
        data = data[0];

        if(data.length !== 0){
            return(
                <div>
                    <div className="row start-xs mb-1">
                        <div className="col-md-4 col-xs-6"><strong>Transportista: </strong>{data.tCarrier}</div>
                        <div className="col-md-4 col-xs-6"><strong>Tipo de transporte: </strong>{data.tTypeCarrier}</div>
                        <div className="col-md-4 col-xs-6"><strong>CAAT: </strong>{data.tCaat}</div>
                    </div>
                    <div className="row start-xs mb-1">
                        <div className="col-md-4 col-xs-6"><strong>Operador: </strong>{data.tOperator}</div>
                        <div className="col-md-4 col-xs-6"><strong>Placa: </strong>{data.tLicensePlate}</div>
                        <div className="col-md-4 col-xs-6"><strong>Contacto: </strong>{data.tContact}</div>
                    </div>
                    {
                        data.tTypeCarrier !== "PUERTO" ? 
                        <div>
                            <div className="mb-1 mt-1"><h4>Datos de custodia</h4><hr /></div>
                            <div className="row start-xs mb-1">
                                <div className="col-xs-6"><strong>Nombre: </strong>{data.tName}</div>
                                <div className="col-xs-6"><strong>Placa: </strong>{data.tLicensePlateCustody}</div>
                            </div>
                        </div> : ""
                    }
                    {
                        data.aImages.length > 0 ?
                        <div className="start-xs">
                            <div className="mb-1 mt-1"><h4>Imagenes</h4><hr /></div>
                            <ul>
                                {
                                    data.aImages.map(imagen => {
                                        let namefile = imagen.tUri.split("/");
                                        return(
                                            <li key={imagen._id} className="mb-2">
                                                <div>
                                                    <div><strong>Registrado: </strong>{imagen.dRegistered}</div>
                                                    {imagen.tNote !== "" ? <div><strong>Nota: </strong>{imagen.tNote}</div>  : ""}
                                                    <div><a href={`${api.API}/documents/attached/${namefile[3]}/${namefile[4]}/${namefile[5]}`} target="_blank" className="a-file-link" rel="noopener noreferrer">{namefile[namefile.length - 1]}</a></div>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div> : ""
                    }
                </div>
            )
        }

    }

    // handle

    handleSubmit = async (dataForm) => {
        try{
            await this.props.addCarrier(dataForm, {
                toggleLoader : this.toggleLoader,
                showModal : this.modal.setIsShowModal
            })

            this.setState({
                ...this.state,
                filterCarriers : this.props.carriers
            });
        }catch(err){
            console.log(err)
        }
    }

    addImagenMonitoring = async (dataForm) => {

        try{
            await this.props.addImagenMonitoring(dataForm, {
                toggleLoader : this.toggleLoader,
                showModal : this.modal.setIsShowModal
            })

            this.setState({
                ...this.state,
                filterCarriers : this.props.carriers
            });
        }catch(err){
            console.log(err)
        }
    }

    render(){
        const {loader, loaderGeneral, tReference, filterCarriers, actionToModal, columns} = this.state;
        const {carriers} = this.props
        
        return(
            <React.Fragment>
                <div>
                    <Loader show={loaderGeneral}/>
                    <Breadcrumb title="Monitoreo.">Inicio > Importación > Punto de inspección / Vacios > Monitoreo</Breadcrumb>
                    {
                        tReference === null ? <Alert className="warning-light">
                            Debes de seleccionar una referencia.<Link to="/ls/import/references">Haz click aqui!</Link>
                        </Alert> :
                        <div className="row middle-xs mb-1">
                            <div className="col-xs-12">
                                <Label label={`Estas trabajando con la referencia: ${tReference === null ? "" : tReference.tReference}`} className="secondary"/>
                            </div>
                        </div>
                    }
                    {
                        carriers === null || Object.keys(carriers).length === 0? 
                        <Alert className="warning-light">No hay datos disponibles.</Alert> :
                        <div className="white"><DataTable
                            noHeader
                            data={filterCarriers}
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
                                 placeholder="Ej. Mi archivo"
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
                        tooltip="Nueva fecha"
                        onClick={() => {
                            this.setActionToModal("")
                            this.modal.setIsShowModal(true)
                        }}/>
                </div>
                <Modal
                    id="mIPEMonitoring"
                    title={actionToModal === "IMAGEN" ? "Agregar imagen" : actionToModal === "INFORMACION-EXTRA" ? "Informacion de la transportista" : "Agregar Transportista"}
                    className="col-md-8"
                    hasAction
                    getDataForm={() => this.requestForm.getData()}
                    handleSubmit={actionToModal === "IMAGEN" ? this.addImagenMonitoring.bind(this) : this.handleSubmit.bind(this)}
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
        carriers : state.WarrantyRecovery.carriers
    }
}

export default connect(mapStateToProps, {
    addCarrier,
    getCarriers,
    addImagenMonitoring
})(IPEMonitoring);