import React, {useState} from 'react';
import {useSelector} from 'react-redux';
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
            <Navbar tootleSidebar={tootleSidebar}/>
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

const Navbar = (props) => {
    const dataUser = useSelector(state => state.SessionReducer.dataUser);
    
    const tootleSidebar = (e) => {
        props.tootleSidebar(e)
    }

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
        <div className="navbar primary">
                <div className="col-xs-3 col-md-2 close" onClick={tootleSidebar}>
                    <i className="fa fa-bars close"></i> Menu
                </div>
                <div className="col-xs-9 col-md-10">
                    <ul className="navbar-options">
                        <li>
                            <i className="fa fa-bell"></i>
                        </li>
                        <li>
                            <i className="fa fa-envelope"></i>
                        </li>
                        <li>
                            <i className="fa fa-user"></i>
                            <ul className="navbar-user-options">
                                <li>
                                    <div className="navbar-user-profile">
                                        <div className="col-xs-2 col-sm-3 profile-photo">
                                            <img src={dataUser.tImage} alt="Foto de perfil"></img>
                                        </div>
                                        <div className="col-xs-10 col-sm-9">
                                            <div>{dataUser.tName}</div>
                                            <div ><small className="capitalize">{getRoles(dataUser.tRole)}</small></div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="navbar-user-item" onClick={goToHome}>
                                        <div><i className="fas fa-sign-out-alt"></i></div>
                                        <div>Salir</div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
    );
}
