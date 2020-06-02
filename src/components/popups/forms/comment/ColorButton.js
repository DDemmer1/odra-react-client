import React, {Component} from 'react';
import Radium from "radium";


class ColorButton extends Component {
    render() {
        return (
            <div style={[{color:this.props.color},base,trans]} onClick={()=> this.props.changeColor(this.props.color)}>
                 &#11044;
            </div>
        )
    }
}

const base = {
    display: "inline-block",
    fontSize: "15pt",
    height:"2rem",
    width:"2rem",
    cursor:"pointer",
    ':hover': {
        fontSize: "15.3pt",
        textShadow: "-1px 0 grey, 0 1px grey, 1px 0 grey, 0 -1px grey"
    }
};


const trans = {
    transition: "font-size ease 0.5s",
};

ColorButton = Radium(ColorButton);


export default ColorButton;
