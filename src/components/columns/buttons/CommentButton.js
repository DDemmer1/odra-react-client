import React, {Component} from 'react';

class CommentButton extends Component {
    render() {
        return (
            <React.Fragment>
                <i style={articleItem} class="far fa-comment"></i> {this.props.comments}
            </React.Fragment>
        );
    }
}


const articleItem = {
    paddingLeft: "0",
    cursor:"pointer",
    fontSize: "0.9rem"

}

export default CommentButton;