import React, {Component} from 'react';

class StarButton extends Component {
    render() {
        return (
            <React.Fragment>
                <i style={articleItem} className="far fa-star"></i> {this.props.stars}
            </React.Fragment>
        );
    }
}

const articleItem = {
    paddingLeft: "0.8rem",
    cursor:"pointer",
    fontSize: "0.9rem"

}

export default StarButton;