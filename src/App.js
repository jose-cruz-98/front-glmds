import React from 'react';

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import './css/flexbox.min.css'
import './css/styles.css'
import 'react-toastify/dist/ReactToastify.css';

import IndexRoutesRedux from './redux/actions/routes/routes.action';

import { ToastContainer } from 'react-toastify';
import {Tooltip} from './containers/components/tooltip';

class App extends React.Component {
  render(){
    return (
      <React.Fragment>
        <ToastContainer />
        <Tooltip />
        <IndexRoutesRedux />
      </React.Fragment>
    );
  }
}

export default App;
