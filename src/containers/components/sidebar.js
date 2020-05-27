import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
import {api} from '../../utils/keys/api.routes';

export function Sidebar(props){
    const [isShow, setIsShow] = useState(false);

    const tootleSidebar = e => {
        let clasName = e.target.className;
        if(clasName.includes("close")){
            setIsShow(!isShow)
        }
    }

    return(
        <React.Fragment>
            <Navbar 
                tootleSidebar={tootleSidebar}
                notifications={props.notifications}/>
            <div className={`back-sidebar close ${isShow ? "" : "hidde"}`} onClick={tootleSidebar}>
                <div className="sidebar">
                    <div className="head primary">
                        <div className="col-xs-10">Menu</div>
                        <div className="col-xs-2 close" onClick={tootleSidebar}><i className="fa fa-times close"></i></div>
                    </div>
                    {props.children}
                </div>
            </div>
        </React.Fragment>
    )
}

export const Body = (props) => {
    return(
        <div className=" white body">
            <UserInfo />
            {props.children}
        </div>
    )
}

export const LinkItem = (props) => {
    return(
        <div className="link-item">
            <div className="col-xs-10">{props.children}</div>
            <div className="col-xs-2"><i className={props.icon}></i></div>
        </div>
    )
}

export const LinkSubItem = (props) => {
    return(
        <div className="link-sub-item">
            <div className="col-xs-1"><i className="fa fa-angle-right"></i></div>
            <div className="col-xs-11">{props.children}</div>
        </div>
    )
}

export const LinkSubSubItem = (props) => {
    return(
        <div className="link-sub-sub-item">
            <div className="col-xs-1"><i className="fa fa-angle-right"></i></div>
            <div className="col-xs-11">{props.children}</div>
        </div>
    )
}

const Navbar = (props) => {

    const [showNotification, setShowNotification] = useState(false)
    
    const tootleSidebar = (e) => {
        props.tootleSidebar(e)
    }

    return(
        <div className="navbar primary">
                <div className="col-xs-3 col-md-2 close" onClick={tootleSidebar}>
                    <i className="fa fa-bars close"></i> Menu
                </div>
                <div className="col-xs-9 col-md-10">
                    <ul className="navbar-options">
                        <li>
                            <Notification
                                show={showNotification} 
                                handleOnClick={() => setShowNotification(!showNotification)}
                                notifications={props.notifications}
                            />
                        </li>
                    </ul>
                </div>
            </div>
    );
}

const Notification = ({show,handleOnClick,notifications}) => {
    var numOfNotification = 0;
    let role = useSelector(state => state.SessionReducer.dataUser.tRole)
    let idUser = useSelector(state => state.SessionReducer.dataUser._id)

    return(
        <React.Fragment>
            <div className={`container-notifications ${show ? "" : "hide-container-notifications"}`}>
                {
                    notifications.map(notification => {
                        if(notification._tUser !== idUser){
                            if(notification.tRole[0] === "PRIVADO"){
                                if(role.join().includes(notification.tRole[0])){
                                    numOfNotification++
                                    return(
                                        <div className="notification-item" key={notification._id}>
                                            <small className="fz-0-6">{notification.dRegistered}</small>
                                            <div className="start-xs"><Link to={`${notification.tGoTo}`}>{notification.tMessage}</Link></div>
                                        </div>
                                    )
                                }else return null
                            }else{
                                numOfNotification++
                                return(
                                    <div className="notification-item" key={notification._id}>
                                        <small className="fz-0-6">{notification.dRegistered}</small>
                                        <div className="start-xs"><Link to={`${notification.tGoTo}`}>{notification.tMessage}</Link></div>
                                    </div>
                                )
                            }
                        }else return null;
                    })
                }
            </div>
            <i className={`${numOfNotification > 0? "text-warning" : ""} fa fa-bell`} onClick={() => handleOnClick()}></i>
        </React.Fragment>
    )
}



const UserInfo = (props) => {
    const dataUser = useSelector(state => state.SessionReducer.dataUser);

    const getRoles = (roles) => {
        roles = roles.toString();
        roles = roles.replace(',', ', ');
        return roles.toLowerCase();
    }

    const goToHome = () => {
        localStorage.clear();
        window.location.href=`${api.HOST}/iniciar-sesion`;
    }

    return(
        <div className="sidebar-user-info">
            <div className="user-info">
                <div className="col-xs-2 col-sm-3 profile-photo">
                    <img src="/img/logo.png" alt="Logo"></img>
                </div>
                <div className="col-xs-10 col-sm-9">
                    <div>{dataUser.tName}</div>
                    <div ><small className="capitalize">{getRoles(dataUser.tRole)}</small></div>
                </div>
            </div>
            <div className="col-xs-12 singout center-xs" onClick={goToHome}>
                <div><i className="fas fa-sign-out-alt mr-1"></i></div>
                <div>Salir</div>
            </div>
        </div>
    )
}
