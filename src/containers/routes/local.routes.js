import React, {Component} from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {setHeadersAXIOS} from '../../utils/helpers';
import {api} from '../../utils/keys/api.routes'

import {Sidebar, Body, LinkItem, LinkSubItem, LinkSubSubItem} from '../../containers/components/sidebar';

import socketIOClient from 'socket.io-client';

/// VIEWS
import ImportReferences from '../views/local/import/references/importReferences.view';
import AddImportReferences from '../views/local/import/references/addOrEditImportReferences.view';
import ImportDocuments from '../views/local/import/documets/importDocuments.view';
import ImportPayments from '../views/local/import/payments/importPayments.view';
import WarrantyRecovery from '../views/local/import/inspectionPointAndEmptiness/warrantyRecovery.view';
import IPEDocuments from '../views/local/import/inspectionPointAndEmptiness/ipeDocuments.view';
import IPEMonitoring from '../views/local/import/inspectionPointAndEmptiness/ipeMonitoring.view';

setHeadersAXIOS();

export default class Local extends Component{
  state = {
    notifications : []
  }
  async componentDidMount(){
    const socket = socketIOClient(api.ENDPOINT);
    
    socket.on("getNotifications", res => {
      this.setState({
        ...this.state,
        notifications : res
      })
    });
  } 

  render(){
    const {notifications} = this.state;
      return(
          <Router>
            <Sidebar
              notifications={notifications}
            >
                <Body key="1">
                  <ul>
                    <li>
                      <ul> 
                        <LinkItem icon="fa fa-download">Importación</LinkItem>
                        <li><LinkSubItem><Link to="/ls/import/references">Referencias</Link></LinkSubItem></li>
                        <li><LinkSubItem><Link to="/ls/import/documents">Documentos</Link></LinkSubItem></li>
                        <li><LinkSubItem><Link to="/ls/import/payments">Pagos</Link></LinkSubItem></li>
                        <li className="list-sub-sub"><LinkSubSubItem>Punto de inspeccion / Vacios</LinkSubSubItem>
                          <ul>
                            <li><LinkSubItem><Link to="/ls/import/inspection-point-and-emptiness/documents">Documentos</Link></LinkSubItem></li>
                            <li><LinkSubItem><Link to="/ls/import/inspection-point-and-emptiness/monitoring">Monitoreo</Link></LinkSubItem></li>
                            <li><LinkSubItem><Link to="/ls/import/inspection-point-and-emptiness/warranty-recovery">Recuperacion de garantias</Link></LinkSubItem></li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </Body>
            </Sidebar>
            <div className="container-fluid-dashboard">
              <Switch>
                  <Route exact path="/ls/import/references" render={(props) => <ImportReferences {...props}/>}/>
                  <Route exact path="/ls/import/references/add" render={(props) => <AddImportReferences {...props}/>}/>
                  <Route exact path="/ls/import/references/edit/:_id" render={(props) => <AddImportReferences {...props}/>}/>
                  <Route exact path="/ls/import/documents" render={(props) => <ImportDocuments {...props}/>}/>
                  <Route exact path="/ls/import/payments" render={(props) => <ImportPayments {...props}/>}/>
                  <Route exact path="/ls/import/inspection-point-and-emptiness/warranty-recovery" render={(props) => <WarrantyRecovery {...props}/>}/>
                  <Route exact path="/ls/import/inspection-point-and-emptiness/documents" render={(props) => <IPEDocuments {...props}/>}/>
                  <Route exact path="/ls/import/inspection-point-and-emptiness/monitoring" render={(props) => <IPEMonitoring {...props}/>}/>
              </Switch>
            </div>
          </Router>
      );
  }
}