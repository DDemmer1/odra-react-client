import React, {Component} from 'react';
import Radium from "radium";



class OptionsButton extends Component {



    render() {
        return (
                <div style={wrapper} className="btn-group dropleft">
                    <div  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i style={settings} className="fas fa-ellipsis-h" ></i>
                    </div>
                    <div className="dropdown-menu">
                        <button className="dropdown-item" type="button" onClick={()=> {this.props.delete()}}><i className="fas fa-trash"></i> Delete</button>
                    </div>
                </div>
        );
    }
}

const settings = {
    color: "lightgrey",
    cursor: "pointer",
    ':hover': {
        filter: "brightness(80%)"
    },
};

const wrapper = {
    float: "right",
    marginRight: "1rem"
};


OptionsButton = Radium(OptionsButton);


export default OptionsButton;