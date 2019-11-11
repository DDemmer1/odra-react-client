import React, {Component} from 'react';

class Sidebar extends Component {
    render() {
        return (
            <div style={navBarWrapper}>
                <nav style={sidebar}>
                    <div className="sidebar-header">
                        <h3 style={headlineStyle}>ODRA<i style={{fontSize: "1.2rem"}}> lighthouse</i></h3>
                    </div>

                    <ul className="list-unstyled components">
                    </ul>

                </nav>
            </div>
        );
    }


}

const navBarWrapper ={
    display: "flex",
    width: "100%",
}

const headlineStyle ={
    marginTop: "1rem",
    marginLeft: "1rem"
}


const sidebar ={
    width: "15rem",
    position: "fixed",
    top: "0",
    left: "0",
    height: "100vh",
    zIndex: "999",
    background: "#2A3F54",
    color: "#fff",
}
export default Sidebar;