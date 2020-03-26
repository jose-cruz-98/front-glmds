import React, {Component} from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

/// VIEWS
import LoginRedux from '../../redux/actions/home/session.action';

export default class Home extends Component{

    render(){
        return(
            <Router>
              <div>
                <nav>
                  <ul>
                    <li>
                      <Link to="/iniciar-sesion">Iniciar Sesion</Link>
                    </li>
                  </ul>
                </nav>
        
              </div>
                <Switch>
                    <Route exact path="/iniciar-sesion" component={LoginRedux} />
                </Switch>
            </Router>
        );
    }
}