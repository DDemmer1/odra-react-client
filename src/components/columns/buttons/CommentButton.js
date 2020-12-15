import React, {Component} from 'react';
import axios from "axios/index";
import * as con from "../../../OdraLighthouseConstants";

class CommentButton extends Component {

    render() {
        return (
            <React.Fragment>
                <i style={articleItem} className="far fa-comment" onClick={() => {this.props.toggle("comments","big",this.props.mediaid)}}></i> {this.props.comments.length}
                {/*<i style={articleItem} className="far fa-comment" onClick={() => {alert("In development")}}></i> {this.props.comments.length}*/}
            </React.Fragment>
        );
    }
}




const articleItem = {
    paddingLeft: "0",
    cursor:"pointer",
    fontSize: "0.9rem",
};

export default CommentButton;