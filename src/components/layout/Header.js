import React, {Component} from 'react';

class Header extends Component {
    render() {
        return (
            <header className={"navbar fixed-top"} style={navstyle}>
                <input style={{width: "30rem"}} className={"form-control"} placeholder="search"/>
            </header>
        );
    }
}

const navstyle = {
    marginLeft: "15rem",
    backgroundColor: "#E5E5E5"
}



export default Header;