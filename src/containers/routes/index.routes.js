import React, {Component} from "react";

/// ROUTES
import Home from './home.routes';
import Local from './local.routes';

export default class IndexRoutes extends Component{

    render(){
        const {token, tTypeUser} = this.props;
        return(
            <React.Fragment>
               {
                   token === null && tTypeUser == null ? <Home /> : 
                   tTypeUser === "LOCAL" ? <Local /> : "Aun no hay usuarios externos"
               } 
            </React.Fragment>
        );
    }
}