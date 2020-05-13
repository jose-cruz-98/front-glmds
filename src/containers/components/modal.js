import React, {Component} from 'react';
import {Button} from './button';

export default class Modal extends Component {

    state = {
        isShowModal : false
    }

    setIsShowModal = (show) => {
        this.setState({
            isShowModal : show
        });
    }

    componentDidMount(){
        window.addEventListener("load", (event) => {
            setTimeout(()=>{
                let closeModalItem = document.querySelectorAll("[close-modal]");
                let openModalItem = document.querySelectorAll("[open-modal]");
            
                closeModalItem = Array.apply(null, closeModalItem);
                openModalItem = Array.apply(null, openModalItem);
            
                closeModalItem.forEach(item => {
                    item.addEventListener("click", (e) => {
                        this.setIsShowModal(false);
                    })
                })
            
                openModalItem.forEach(item => {
                    item.addEventListener("click", (e) => {
                        this.setIsShowModal(true);
                    })
                })
            },300)
        });
    }

    render(){
        const {children,title,className, getDataForm,hasAction, handleSubmit, loader} = this.props
        return(
            <div id="modal" className={`modal-background center-xs ${this.state.isShowModal ? "show-modal" : ""}`}>
            <div className={`container-modal col-xs-11 ${className}`}>
                <Header
                    title={title}
                    setIsShowModal={this.setIsShowModal.bind(this)}
                />
                <div className="body">
                    {this.state.isShowModal ? children : null}
                </div>
                <Footer
                    getDataForm={getDataForm}
                    hasAction={hasAction}
                    handleSubmit={handleSubmit}
                    loader={loader}
                    setIsShowModal={this.setIsShowModal.bind(this)}
                />
            </div>
        </div>
        )
    }
}

const Header = ({title,setIsShowModal}) => {
    return(
        <div className="row header start-xs middle-xs">
            <div className="col-xs-10">
                <h3>{title}</h3>
            </div>
            <div className="col-xs-2">
                <Button
                    className={{
                        div : "col-md-12",
                        button : "danger ml-1"
                    }}
                    icon="fa fa-times"
                    onClick={() => setIsShowModal(false)}
                    />
            </div>
        </div>
    )
}

const Footer = ({getDataForm, hasAction,handleSubmit,loader,setIsShowModal}) => {
    const onClick = () => {
        let dataForm = getDataForm()
        if(dataForm !== undefined){
            handleSubmit(dataForm)
        }
    }
    return(
        <div className="row footer center-xs end-sm middle-xs">
                <Button
                    className={{
                        div : "col-xs-4 col-sm-3 col-md-2",
                        button : "danger"
                    }}
                    icon="fa fa-times"
                    label="Cerrar"
                    onClick={() => setIsShowModal(false)}
                    />
                {
                    hasAction === true ? 
                        <Button
                            className={{
                                div : "col-xs-4 col-sm-3 col-md-2",
                                button : "success"
                            }}
                            icon="far fa-paper-plane"
                            label="Enviar"
                            loader={loader}
                            onClick={onClick}
                        />
                    : ""
                }
        </div>
    )
}