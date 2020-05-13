import React, {Component} from "react";

import {connect} from 'react-redux';
import {addEvent, getEvents} from '../../../../../redux/actions/local/warrantyRecovery.action';

import Modal from '../../../../components/modal';
import {Alert} from '../../../../components/alert';
import {Breadcrumb} from '../../../../components/breadcrumb';
import {Loader} from '../../../../components/loader';
import {Label} from '../../../../components/input';
import {FloatButton} from '../../../../components/button';
import {Link} from 'react-router-dom';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import EventsForm from '../../../../forms/events.form';


import {getReferenceOfLocalstorage} from '../../../../../utils/helpers';

class WarrantyRecovery extends Component{
   
    state = {
        loaderGeneral : true,
        loader : false,
        tReference : getReferenceOfLocalstorage(),
        actionToModal : "",
        events : []
    }

    // live cycle
    async componentDidMount(){
        try{ 
            if(this.state.tReference !== null){
                await this.props.getEvents({_tReference : this.state.tReference._id});
            }  
            
            this.setState({
                ...this.state,
                events : this.props.events,
                loaderGeneral : !this.state.loaderGeneral
            })
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

    setActionToModal = (action) =>{
        this.setState({
            ...this.state,
            actionToModal : action
        })
    }

    modalWithForm = () => {
        const {actionToModal,tReference} = this.state;
        if(actionToModal === "DEVUELTO"){
            this.modal.setIsShowModal(true);
            return "HOLA"
        }else{
            return(<EventsForm 
                ref={e => this.requestForm = e}
                tReference={tReference === null ? "" : tReference._id}
            />)
        }

    }

    // handle

    handleAddEvent = async (dataForm) => {
        try{
            await this.props.addEvent(dataForm,{
                toggleLoader : this.toggleLoader,
                showModal : this.modal.setIsShowModal
            });
            
        }catch(err){
            console.log(err)
        }
    }

    render(){
        const {loaderGeneral, tReference, loader, events} = this.state;
        
        
        return(
            <React.Fragment>
                <div>
                    <Loader show={loaderGeneral}/>
                    <Breadcrumb title="Recuperación de garantias.">Inicio > Importación > Punto de inspección / Vacios > Recuperación de garantias</Breadcrumb>
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
                    <FullCalendar
                        defaultView="dayGridMonth" 
                        events={events}
                        aspectRatio="auto"
                        locale="es"
                        fixedWeekCount={false}
                        header={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,listWeek"
                        }}
                        buttonText={{
                            today:'Hoy',
                            month:'Mes',
                            week:'Semana',
                            day:'Dia',
                            list:'Lista'
                        }}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        eventClick={(arg)=>console.log(arg.event.extendedProps)}/>
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
                    id="mEvents"
                    title={"Agregar Fecha"}
                    className="col-md-6"
                    hasAction
                    getDataForm={() => this.requestForm.getData()}
                    handleSubmit={this.handleAddEvent.bind(this)}
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
        events : state.WarrantyRecovery.events
    }
}

export default connect(mapStateToProps, {
    addEvent,
    getEvents
})(WarrantyRecovery);