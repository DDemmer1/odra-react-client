import React, {Component} from 'react';

class ThreeDotsButton extends Component {
    render() {
        return (
            <React.Fragment>
                <i style={articleItem} className="fas fa-ellipsis-h"></i>
            </React.Fragment>
        );
    }
}

const articleItem = {
    paddingLeft: "0.8rem",
    cursor:"pointer",
    fontSize: "0.9rem"

}

export default ThreeDotsButton;