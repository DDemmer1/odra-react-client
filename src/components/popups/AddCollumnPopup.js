import React, {Component} from 'react';

class AddCollumnPopup extends Component {
    render() {
        return (
            <div style={popupOuter}>
                <div style={popupInner}>
                    <h1>{this.props.msg}</h1>
                    <button onClick={() => {this.props.toggle()}}>X</button>
                </div>
            </div>)
    }

};

const popupInner = {
    position: "absolute",
    left: "25%",
    right: "25%",
    top: "25%",
    bottom: "25",
    margin: "auto",
    background: "white"
}

const popupOuter = {
    position: "fixed",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
}

export default AddCollumnPopup;
