import React, {Component} from "react";

import LoginForm from '../../forms/login.form';

export default class Login extends Component{
    
    state = {
        loader : false
    }

    toggleLoader = () => {
        this.setState({
            loader : !this.state.loader
        })
    }

    handleSubmit = (data) => {
        this.props.singin(data, {
            toggleLoader : this.toggleLoader
        }); 
    }
    
    render(){
        return(
            <div className="row middle-xs center-xs h-100 col-xs-12">
                <LoginForm handleSubmit={this.handleSubmit} loader={this.state.loader}/>
            </div>
        );
    }
}