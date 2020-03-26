import {connect} from 'react-redux';
import IndexRoutes from '../../../containers/routes/index.routes';

/// CONFIGS

/// ACTIONS

/// STATE
const mapStateToProps = state => {
    return {
        token : state.SessionReducer.token,
        tTypeUser : state.SessionReducer.dataUser === null ? null : state.SessionReducer.dataUser.tTypeUser
    }
}

const mapDispatchToProps = {

}

const createConnection = connect(
    mapStateToProps,
    mapDispatchToProps
)

const ComponentWithConnectionToRedux = createConnection(IndexRoutes)

export default ComponentWithConnectionToRedux;