import React, {Component} from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {setHeadersAXIOS} from '../../utils/helpers';

import {Sidebar, Body, LinkItem, LinkSubItem} from '../../containers/components/sidebar';
import {Loader} from '../../containers/components/loader';

/// VIEWS
import ReferencesRedux from '../../redux/actions/local/references.action';
setHeadersAXIOS();

export default class Local extends Component{

  state = {
    loader : true
  }

  toggleLoader = () => {
    this.setState({
      loader : !this.state.loader
    })
  }

  render(){
      return(
          <Router>
            <Loader show={this.state.loader}/>
            <Sidebar>
                <Body key="1">
                  <ul>
                    <li>
                      <ul> 
                        <LinkItem icon="fa fa-download">Importación</LinkItem>
                        <li><LinkSubItem><Link to="/ls/import/references">Referencias</Link></LinkSubItem></li>
                        <li><LinkSubItem><Link to="/ls/import/payments">Pagos</Link></LinkSubItem></li>
                      </ul>
                    </li>
                  </ul>
                </Body>
            </Sidebar>
            <div className="container-fluid-dashboard">
              <Switch>
                  <Route exact path="/ls/import/references" render={(props) => <ReferencesRedux {...props} toggleLoader={this.toggleLoader} />}/>
              </Switch>
            </div>
          </Router>
      );
  }
}