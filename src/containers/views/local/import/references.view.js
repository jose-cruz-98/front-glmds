import React, {Component} from "react";

import {Breadcrumb} from '../../../components/breadcrumb';


export default class References extends Component{
    
    state = {
        loader : false
    }

    async componentDidMount(){
        try{
            await this.props.getPatent({});   
            this.props.toggleLoader();
        }catch(err){
            console.log("Error in refereces : ",err)
        }

        console.log(this.props.patents)
    }

    toggleLoader = () => {
        this.setState({
            loader : !this.state.loader
        })
    }
    
    render(){
        return(
            <div>
                <Breadcrumb title="Referencias">Inicio > Referencias</Breadcrumb>
                <div>sdafgsdfg</div>
            </div>
        );
    }
}