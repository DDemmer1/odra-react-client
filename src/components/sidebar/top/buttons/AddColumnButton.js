import React, {Component} from 'react';
import Radium from "radium";

class AddColumnButton extends Component {

    render() {
        return (
            <React.Fragment>
                <div onClick={() => {this.props.toggle()}} style={wrapper} key="add"  >
                    <div  style={icon}><i class="fas fa-plus"></i></div>
                    <div style={iconText}>Add column</div>
                </div>
            </React.Fragment>
        );
    }
}

AddColumnButton = Radium(AddColumnButton);

// let addPopup = () => {
//     alert("popup");
// }


const wrapper = {
    cursor: "pointer",
    ':hover': {
        filter: "brightness(3)"
    }
}

const icon = {
    verticalAlign: "middle",
    fontSize: "1.2rem",
    color: "#1da1f2",
    display: "inline-block",
    paddingRight: "0.7rem",
}

const iconText = {
    verticalAlign: "middle",
    fontSize: "0.9rem",
    display: "inline-block"
}


export default AddColumnButton;