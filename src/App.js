import React from 'react';

import './css/flexbox.min.css'
import './css/styles.css'
import 'react-toastify/dist/ReactToastify.css';

import IndexRoutesRedux from './redux/actions/routes/routes.action';

import { ToastContainer } from 'react-toastify';

class App extends React.Component {
  render(){
    return (
      <React.Fragment>
        <ToastContainer />
        <IndexRoutesRedux />
      </React.Fragment>
    );
  }
}

export default App;
