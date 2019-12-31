import React, {Component} from 'react';

class FlagButton extends Component {
    render() {
        return (
            <React.Fragment>
                <i style={articleItem} className="far fa-flag"></i> {this.props.flags}
            </React.Fragment>
        );
    }
}


const articleItem = {
    paddingLeft: "0.8rem",
    cursor:"pointer",
    fontSize: "0.9rem"

}


export default FlagButton;