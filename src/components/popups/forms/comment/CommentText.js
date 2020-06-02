import React, {Component} from 'react';
import Radium from "radium";
import Answer from "./Answer";


class CommentText extends Component {

    toDateWithoutSeconds(date) {
        return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    }

    state = {
        inputFocus: false
    };


    render() {
        return (
            <div className={'rounded-lg comment' + (this.props.comment.active ? ' active' : '')}
                 id={this.props.comment.commentId}
                 onClick={() => {
                     this.props.focus(this.props.comment.commentId);
                 }}>
                <div>
                    {/*Username*/}
                    <span style={username}>
                        <i class="fas fa-user"></i> {this.props.comment.user.name} <span
                        style={{color: "grey"}}>@{this.props.comment.user.username}</span>
                    </span>
                    {/*Settings*/}
                    <span><i style={settings} key={this.props.comment.commentId + "-setting"} className="fas fa-ellipsis-h"></i></span>
                </div>
                {/*Time*/}
                <div
                    style={time}>{this.props.comment.time.toLocaleDateString() + " " + this.toDateWithoutSeconds(this.props.comment.time)}</div>
                {/*Comment*/}
                <div>
                    <span style={{color: this.props.comment.color}}>&#11044;  </span>
                    {this.props.comment.commentText}
                </div>

                {/*Answers*/}
                <div>

                    { this.props.comment.active ?
                        this.props.comment.answers.map((answer) => (
                            <div>
                                <hr/>
                                <Answer key={answer.answerId + "-answer"} answer={answer}/>
                            </div>))
                        :
                            this.props.comment.answers.length == 0 ? null
                                :
                            <div><hr/><i class="fas fa-comments"></i> {this.props.comment.answers.length} Answers. Read more...</div>
                    }

                </div>
                {/*Answer Input*/}
                {this.props.comment.active ?
                    <div>
                        <hr/>
                        <input onFocus={() => {
                            this.setState({inputFocus: true})
                        }}
                               placeholder="Answer..."
                               className="form-control"
                               onBlur={() => {
                                   this.setState({inputFocus: false})
                               }}></input>
                        {this.state.inputFocus ?
                            <div className="mt-2">
                                <div key="commentButton"
                                     className="btn btn-primary btn-sm text-center mr-2 "
                                     onMouseDown={(event) => {
                                         alert("Sending answer")
                                     }}
                                >Answer
                                </div>
                                <div key="cancelButton"
                                     className="btn btn-light btn-sm text-center">
                                    Cancel
                                </div>
                            </div>
                            : null}
                    </div>
                    : null
                }
            </div>
        );
    }
}



const username = {fontWeight: 600, display:"inline-block"};

const time = {
    paddingLeft: "1.35rem",
    fontSize: "10pt",
    marginBottom: "1rem"
};

const settings = {
    color: "lightgrey",
    cursor: "pointer",
    float: "right",
    paddingRight: "1rem",
    ':hover': {
        filter: "brightness(80%)"
    },
};

CommentText = Radium(CommentText);


export default CommentText;