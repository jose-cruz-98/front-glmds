import React, {Component} from "react";

import {connect} from 'react-redux';
import {addCategory, getCategories, addFileToCategory} from '../../../../redux/actions/local/personal.action';

import {Loader} from '../../../components/loader'
import {Breadcrumb} from '../../../components/breadcrumb'
import { Button} from "../../../components/button";
import Modal from '../../../components/modal';
import {FolderList} from '../../../components/list';

import PersonalForm from '../../../forms/personal.form'
import PersonalFilesForm from '../../../forms/personalFiles.form'

class Personal extends Component{
   
    state = {
        loaderGeneral : true,
        actionToModal : "",
        loader : false,
        _tCategory : ""
    }

    // live cycle

    async componentDidMount(){
        try{ 
            if(this.state.tReference !== null){
                await this.props.getCategories({});
            }
            this.setState({
                ...this.state,
                loaderGeneral : !this.state.loaderGeneral
            });
        }catch(err){
            console.log("Error in refereces : ",err)
        }
    }

    // helpers

    setActionToModal = (action, _tCategory = "") =>{
        this.setState({
            ...this.state,
            actionToModal : action,
            _tCategory : _tCategory
        })
    }

    toggleLoader = () => {
        this.setState({
            loader : !this.state.loader
        })
    }

    modalWithForm = () => {
        const {actionToModal, _tCategory} = this.state;
        if(actionToModal === "NUEVO-ARCHIVO"){
            return(<PersonalFilesForm 
                ref={e => this.requestForm = e}
                _tCategory={_tCategory}
            />) 
        }else{
            return(<PersonalForm 
                ref={e => this.requestForm = e}
            />)
        }

    }

    // actions

    addCategory = async (dataForm) => {
        try{
            await this.props.addCategory(dataForm, {
                toggleLoader : this.toggleLoader,
                showModal : this.modal.setIsShowModal
            })
        }catch(err){
            console.log(err)
        }
    }

    addFileToCategory = async (dataForm) => {
        
        try{
            await this.props.addFileToCategory(dataForm, {
                toggleLoader : this.toggleLoader,
                showModal : this.modal.setIsShowModal
            })
        }catch(err){
            console.log(err)
        }
    }

    // render

    render(){
        const {loaderGeneral, actionToModal, loader} = this.state;
        const {personals} = this.props;
        
        return(
            <React.Fragment>
                <div>
                    <Loader show={loaderGeneral}/>
                    <Breadcrumb title="Personal">Inicio > Personal</Breadcrumb>
                </div>
                <div>
                    <div className="row">
                        <Button 
                            className={{
                                div : "col-xs-4 col-md-2",
                                button : "success"
                            }}
                            label=" Agregar categoría"
                            icon="fas fa-folder"
                            onClick={() => {
                                this.setActionToModal("");
                                this.modal.setIsShowModal(true);
                            }}/>
                    </div>
                    <div className="tree">
                        <FolderList 
                            data={personals}
                            setActionToModal={this.setActionToModal.bind(this)}
                            showModal={() => this.modal.setIsShowModal(true)}
                        />
                    </div>
                </div>
                <Modal
                    id="mDocuments"
                    title={actionToModal === "NUEVO-ARCHIVO" ? "Agregar archivo" : "Agregar categoría."}
                    className="col-md-6"
                    hasAction
                    getDataForm={() => this.requestForm.getData()}
                    handleSubmit={actionToModal === "NUEVO-ARCHIVO" ? this.addFileToCategory.bind(this) : this.addCategory.bind(this)}
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
        personals : state.PersonalReducer.personals
    }
}

export default connect(mapStateToProps, {
    addCategory,
    getCategories,
    addFileToCategory
})(Personal);