import React from 'react';

import Swal from 'sweetalert2';
import {ActionButton} from '../components/button';
import {Alert} from '../components/alert';
import {api} from '../../utils/keys/api.routes'

export const FileList = ({datas, delDocument, addFormNewNote, getExtraInfo}) => {
    const handleConfirm = (id)=> { 
        Swal.fire({
            title: 'Espera!',
            text: "Estas apunto de eliminar este archivo, una vez hecha la accion ya no se podra recuperar.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2e7d32',
            cancelButtonColor: '#c62828',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Volver'
        }).then((result) => {
            if (result.value) {
                delDocument(id)
            }
        }) 
    } 
    return(
        <div className="col-xs-12 file-list-content">
            <ul>
                <li className="file-list-item row secondary">
                    <div className="col-xs-6 col-md-7">
                        Nombre del archivo
                    </div>
                    <div className="col-xs-4 col-md-3">
                        Fecha de registro
                    </div>
                    <div className="col-xs-2 col-md-2">
                        Acciones
                    </div>
                </li>
                {
                    datas !== null?
                    datas.map(data => {
                        return(
                            <li className="file-list-item row" key={data._id}>
                                <div className="col-xs-6 col-md-7">
                                    {data.tName}
                                </div>
                                <div className="col-xs-4 col-md-3">
                                    {data.dRegistered}
                                </div>
                                <div className="col-xs-2 col-md-2">
                                <ActionButton 
                                        icon="fa fa-exclamation"
                                        className="primary"
                                        onClick={() => getExtraInfo("INFORMACION-EXTRA", data._id)}
                                    />
                                    <ActionButton 
                                        icon="fa fa-pencil"
                                        className="warning"
                                        onClick={() => addFormNewNote("NOTA", data._id)}
                                    />
                                    <ActionButton 
                                        icon="fa fa-trash"
                                        className="danger"
                                        onClick={() => handleConfirm(data._id)}
                                    />
                                    <ActionButton 
                                        icon="fa fa-eye"
                                        className="info"
                                        onClick={() => window.open(api.API + "/documents/"+data._id)}
                                    />
                                </div>
                            </li>
                        )
                    })
                    : ""
                }
            </ul>
        </div>
    )
}

export const RequestListPending = ({datas, role, delRequest, setActionToModal}) => {

    const handleDelRequest = (id)=> { 
        Swal.fire({
            title: 'Espera!',
            text: "Estas apunto de eliminar esta solicitud, una vez hecha la accion ya no se podra recuperar.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2e7d32',
            cancelButtonColor: '#c62828',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Volver'
        }).then((result) => {
            if (result.value) {
                delRequest(id)
            }
        }) 
    } 

    const actions = (data) => {
        if(role === "OPERATION"){
            return(
                <React.Fragment>
                    <ActionButton 
                        icon="fa fa-trash"
                        className="danger"
                        onClick={() => handleDelRequest(data._id)}
                    />
                </React.Fragment>
            )
        }else if(role === "FACTURACION"){
            return(<React.Fragment>
                <ActionButton 
                    icon="fa fa-upload"
                    className="info"
                    onClick={() => setActionToModal("REVISION" )}
                />
            </React.Fragment>)
        }else{
            console.log("general");
        }
    }
    
    const list = () => {
        return datas.map(data => {
            return(
                <li key={data._id} className="list-item">
                    <div className="info-content-list">
                        <div className="col-xs-8">{data.tTypePayment}</div>
                        <div className="col-xs-4">
                            {actions(data)}
                        </div>
                    </div>
                    <div className="sub-content-list">
                        {Object.keys(data.aAttachedFrom).length !== 0 ? 
                            <div><strong>Adjuntos: <br/></strong>
                                {
                                    data.aAttachedFrom.map((file, index) => {
                                        let namefile = file.split("/");
                                        return(
                                            <div className="row" key={index}>
                                                <a href={`${api.API}/documents/attached/${namefile[3]}/${namefile[4]}/${namefile[5]}`} target="_blank" className="a-file-link ml-1" rel="noopener noreferrer">{namefile[namefile.length - 1]}</a>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        : ""}
                        <div><strong>Monto:</strong> ${data.tAmount}</div>
                        <div><strong>Consignatario:</strong> {data.refImportReference[0].tImporter}</div>
                        {data.tObservation !== "" ? <div><strong>Nota:</strong> {data.tObservation}</div> : ""}
                    </div>
                 </li>
            )
        })
    }
    return(
        <div className="card-list col-xs-12 col-md-6">
            <div className="white">
                <div className="title-list info">
                    <div><h3 className="text-white">Pendiente</h3></div>
                </div>
                {
                    Object.keys(datas).length === 0 ?
                    <Alert className="warning-light">No hay solicitudes pendientes</Alert>
                    :
                    <div className="col-xs-12">
                        <div className="list-content">
                            <ul>
                                <li className="list-item-title">
                                    <div className="col-xs-8">Descripción</div>
                                    <div className="col-xs-4">Acciones</div>
                                </li>
                                {list()}
                            </ul>
                        </div>
                    </div>
                }
            </div>
        </div>
        
    )
}

export const RequestListRevision = ({datas, role, updDocumentToComplete, setActionToModal}) => {

    const handleUpdDocumentToComplete = (id)=> { 
        Swal.fire({
            title: 'Espera!',
            text: "Estas apunto de poner esta solicitud en COMPLETADO, una vez hecha la accion ya no se podra recuperar.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2e7d32',
            cancelButtonColor: '#c62828',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Volver'
        }).then((result) => {
            if (result.value) {
                updDocumentToComplete(id)
            }
        }) 
    } 

    const actions = (data) => {
        if(role === "OPERATION"){
            console.log(data)
            let namefile = data.refDocuments[0].aDocuments[0].tUri.split("/");
            return(
                <React.Fragment>
                    <ActionButton 
                        icon="fa fa-eye"
                        className="info"
                        onClick={() => window.open(`${api.API}/documents/attached/${namefile[3]}/${namefile[4]}/${namefile[5]}`)}
                    />
                    <ActionButton 
                        icon="fa fa-check"
                        className="success"
                        onClick={() => handleUpdDocumentToComplete(data._id)}
                    />
                    <ActionButton 
                        icon="fa fa-undo"
                        className="warning"
                        onClick={() => setActionToModal("DEVUELTO", {_aDocuments : data._aDocuments, tUri : data.refDocuments[0].tUri})}
                    />
                </React.Fragment>
            )
        }
    }
    
    const list = () => {
        return datas.map(data => {
            return(
                <li key={data._id} className="list-item">
                    <div className="info-content-list">
                        <div className="col-xs-8">{data.tTypePayment}</div>
                        <div className="col-xs-4">
                            {actions(data)}
                        </div>
                    </div>
                    <div className="sub-content-list">
                        <div><strong>Adjuntos: <br/></strong>
                                {
                                    data.aAttachedFrom.map((file, index) => {
                                        let namefile = file.split("/");
                                        return(
                                            <div className="row" key={index}>
                                                <a href={`${api.API}/documents/attached/${namefile[3]}/${namefile[4]}/${namefile[5]}`} target="_blank" className="a-file-link ml-1" rel="noopener noreferrer">{namefile[namefile.length - 1]}</a>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        <div><strong>Monto:</strong> ${data.tAmount}</div>
                        <div><strong>Consignatario:</strong> {data.refImportReference[0].tImporter}</div>
                        {data.tObservation !== "" ? <div><strong>Nota:</strong> {data.tObservation}</div> : ""}
                    </div>
                 </li>
            )
        })
    }
    return(
        <div className="card-list col-xs-12 col-md-6">
            <div className="white">
                <div className="title-list secondary">
                    <div><h3 className="text-white">Revisión</h3></div>
                </div>
                {
                    Object.keys(datas).length === 0 ?
                    <Alert className="warning-light">No hay solicitudes en revision pendientes</Alert>
                    :
                    <div className="col-xs-12">
                        <div className="list-content">
                            <ul>
                                <li className="list-item-title">
                                    <div className="col-xs-8">Descripción</div>
                                    <div className="col-xs-4">Acciones</div>
                                </li>
                                {list()}
                            </ul>
                        </div>
                    </div>
                }
            </div>
        </div>
        
    )
}

export const RequestListReturned = ({datas, role, updRequest, setActionToModal}) => {

    const handleChangeStatusRequest = (id, status)=> { 
        Swal.fire({
            title: 'Espera!',
            text: "Estas apunto de poner esta solicitud en "+status+", una vez hecha la accion ya no se podra recuperar.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2e7d32',
            cancelButtonColor: '#c62828',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Volver'
        }).then((result) => {
            if (result.value) {
                updRequest(id, status)
            }
        }) 
    } 

    const actions = (data) => {
        if(role === "OPERATION"){
            return(
                <React.Fragment>
                    <ActionButton 
                        icon="fa fa-check"
                        className="success"
                        onClick={() => handleChangeStatusRequest(data._id, "COMPLETADO")}
                    />
                    <ActionButton 
                        icon="fa fa-undo"
                        className="warning"
                        onClick={() => setActionToModal("DEVUELTO", data._aDocuments)}
                    />
                </React.Fragment>
            )
        }else if(role === "FACTURACION"){
            return(<React.Fragment>
                <ActionButton 
                    icon="fa fa-upload"
                    className="info"
                    onClick={() => setActionToModal("REVISION", data._aDocuments)}
                />
            </React.Fragment>)
        }else{
            console.log("general");
        }
    }
    
    const list = () => {
        return datas.map(data => {
            return(
                <li key={data._id} className="list-item">
                    <div className="info-content-list">
                        <div className="col-xs-8">{data.tTypePayment}</div>
                        <div className="col-xs-4">
                            {actions(data)}
                        </div>
                    </div>
                    <div className="sub-content-list">
                        <div><strong>Adjuntos: <br/></strong>
                                {
                                    data.aAttachedFrom.map((file, index) => {
                                        let namefile = file.split("/");
                                        return(
                                            <div className="row" key={index}>
                                                <a href={`${api.API}/documents/attached/${namefile[3]}/${namefile[4]}/${namefile[5]}`} target="_blank" className="a-file-link ml-1" rel="noopener noreferrer">{namefile[namefile.length - 1]}</a>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        <div><strong>Monto:</strong> ${data.tAmount}</div>
                        <div><strong>Consignatario:</strong> {data.refImportReference[0].tImporter}</div>
                        {data.tObservation !== "" ? <div><strong>Nota:</strong> {data.tObservation}</div> : ""}
                        <div><strong>Razon del regreso:</strong> {data.tObservationReturned}</div>
                    </div>
                 </li>
            )
        })
    }
    return(
        <div className="card-list col-xs-12 col-md-6">
            <div className="white">
                <div className="title-list warning">
                    <div><h3 className="text-white">Devuelto</h3></div>
                </div>
                {
                    Object.keys(datas).length === 0 ?
                    <Alert className="warning-light">No hay solicitudes devueltas.</Alert>
                    :
                    <div className="col-xs-12">
                        <div className="list-content">
                            <ul>
                                <li className="list-item-title">
                                    <div className="col-xs-8">Descripción</div>
                                    <div className="col-xs-4">Acciones</div>
                                </li>
                                {list()}
                            </ul>
                        </div>
                    </div>
                }
            </div>
        </div>
        
    )
}

export const FolderList = ({data, setActionToModal, showModal}) => {
    return(
        <React.Fragment>
            <ul className="folder-list mt-2">
                {
                    data.map(d => {
                        return(
                            <li key={d._id} className="mb-1">
                                <div className="row">
                                    <i className="fa fa-folder mr-1"></i>
                                    <p>{d.tCategory}</p>
                                    <i className="fa fa-plus ml-1 text-success" title="nuevo archivo" onClick={()=>{
                                        setActionToModal("NUEVO-ARCHIVO", d._id)
                                        showModal();
                                    }}></i>
                                </div>
                                {
                                    d.aDocuments.length !== 0 ? 
                                        <ul>
                                            {
                                                d.aDocuments.map(document => {
                                                    let namefile = document.tUri.split("/");
                                                    return(
                                                        <li key={document._id}>
                                                            <div className="row middle-xs">
                                                                <div className="fas fa-file mr-2"></div>
                                                                <div>
                                                                    <div>
                                                                        <b>Nombre: </b>
                                                                        <a href={`${api.API}/documents/attached/${namefile[3]}/${namefile[4]}/${namefile[5]}`} 
                                                                            target="_blank" 
                                                                            className="a-file-link ml-1" 
                                                                            rel="noopener noreferrer">
                                                                            {document.tName}
                                                                        </a>
                                                                    </div>
                                                                    {document.tNote !== "" ? <div><b>Nota:</b> {document.tNote}</div> : ""}
                                                                </div>
                                                            </div> 
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    : ""
                                }
                            </li>
                        )
                    })
                }
            </ul>
        </React.Fragment>
    );
}