import React, {Component} from 'react';
import Radium from "radium"

class SliderButton extends Component {
    render() {
        return (
            <React.Fragment>
                <i key={this.props.source+"filter"} style={style} class="fas fa-sliders-h"></i>
            </React.Fragment>
        );
    }
}

SliderButton = Radium(SliderButton);

const style = {
    ':hover':{
        filter: "brightness(80%)"
    },
    color:"#1da1f2",
    float: "right",
    paddingRight:"1rem",
    cursor:"pointer"
}

export default SliderButton;