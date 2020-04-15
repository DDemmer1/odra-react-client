import React, {Component} from 'react';

class CommentButton extends Component {
    render() {
        return (
            <React.Fragment>
                <i style={articleItem} className="far fa-comment" onClick={() => {this.props.toggle("comments","big",this.props.mediaid)}}></i> {this.props.comments.length}
            </React.Fragment>
        );
    }
}

const articleItem = {
    paddingLeft: "0",
    cursor:"pointer",
    fontSize: "0.9rem"
};

export default CommentButton;