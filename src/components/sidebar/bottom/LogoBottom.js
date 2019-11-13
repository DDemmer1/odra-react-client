import React, {Component} from 'react';
import logo from '../../../resources/lighthouse.svg';


class LogoBottom extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="sidebar-header">
                    <h3 style={headlineStyle}><img style={logoStyle} src={logo}/> ODRA<i
                        style={lighthouse}>lighthouse</i>
                    </h3>
                </div>
            </React.Fragment>
        );
    }
}

const logoStyle = {
    height: "1.5rem"
}

const lighthouse = {
    fontSize: "1rem"
}

const headlineStyle = {
    marginTop: "1rem",
    marginLeft: "0.2rem",
    fontSize: "1.2rem",
    position: "absolute",
    bottom: "1rem",

}

export default LogoBottom;