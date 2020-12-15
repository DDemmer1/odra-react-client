import React, {Component} from 'react';
import Radium from "radium";
import Answer from "./Answer";
import * as con from "../../../../OdraLighthouseConstants.js";
import axios from "axios/index";
import OptionsButton from "./buttons/OptionsButton";


class CommentText extends Component {

    timestampToDate(timestamp) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
        let date = Date.parse(timestamp);
        return new Date(date).toLocaleTimeString('de-DE', options);
    }


    state = {
        inputFocus: false,
        user: {
            name:"",
            username:""
        }
    };

    getUserByID(){
        axios.get(con.API_BASE_URL + "/user/" + this.props.comment.userId).then((result) =>{
            console.log(result.data);
            this.setState({user: result.data})
        });
    }

    componentWillMount(){
        this.setState({answers: this.props.comment.answers});

    }

    componentDidMount(){
        this.getUserByID();
    }

    handleAnswerSubmit(){

        // Set state to directly render answer after submit
        let answerForState = {
            mediaId: this.props.comment.mediaId,
            text: this.state.text,
            timestamp: new Date(),
            userId:this.props.user.id
        };

        this.setState(state => {
            const answers = state.answers.concat(answerForState);
            return {
                answers
            };
        });


        //send answer request to server
        let answer = {
            mediaId: this.props.comment.mediaId,
            commentId: this.props.comment.id,
            text: this.state.text
        };

        console.log(answer);
        let that = this;
        axios.post(con.API_BASE_URL + "/meta/answer/add", answer)
            .then((result) => {
                console.log(result.data);
            });

        document.getElementById("answer-input").value = "";
    }




    handleAnswerInput(e){
        let text = e.target.value;
        this.setState({text: text});
    }

    delete(){
        console.log(this.props.comment.id);
        let that = this;
        axios.get(con.API_BASE_URL + "/meta/comment/delete?id=" + this.props.comment.id + "&metaId=" + this.props.metadata.id)
            .then((result) => {
                console.log(result.data);
                this.props.getMetadata();
            });
    }


    render() {
        return (
            <div className={'rounded-lg comment' + (this.props.comment.active ? ' active' : '')}
                 id={this.props.comment.id != undefined ? this.props.comment.id : this.props.comment.id}
                 onClick={() => {
                     this.props.focus(this.props.comment.id);
                 }}>
                <div>
                    {/*Username*/}
                    <span style={username}>
                        <i class="fas fa-user"></i> {this.state.user.name} <span
                        style={{color: "grey"}}>@{this.state.user.username}</span>
                    </span>
                    {/*Settings*/}
                    <OptionsButton delete={this.delete.bind(this)}/>
                </div>
                {/*Time*/}
                <div style={time}>
                    {this.timestampToDate(this.props.comment.timestamp)}
                </div>
                {/*Comment*/}
                <div>
                    <span style={{color: this.props.comment.color}}>&#11044;  </span>
                    {this.props.comment.commentText}
                </div>

                {/*Answers*/}
                <div style={answerList}>
                    { this.props.comment.active ?
                        this.state.answers.map((answer) => (
                            <div>
                                <hr/>
                                <Answer getMetadata={this.props.getMetadata} metadata={this.props.metadata} key={answer.answerId + "-answer"} answer={answer}/>
                            </div>))
                        :
                        this.state.answers.length == 0 ? null
                            :
                            <div><hr/><i class="fas fa-comments"></i> {this.state.answers.length} Answers. Read more...</div>
                    }

                </div>
                {/*Answer Input*/}
                {this.props.comment.active ?
                    <div>
                        <hr/>
                        <input id="answer-input" onChange={(event) => {
                            this.handleAnswerInput(event);
                            }}
                               onFocus={() => {
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
                                         this.handleAnswerSubmit();
                                     }}
                                >Answer
                                </div>
                                <div key="cancelButton"
                                     className="btn btn-light btn-sm text-center"
                                     onMouseDown={()=>{
                                         document.getElementById("answer-input").value = "";
                                     }}
                                >
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

const answerList = {
    maxHeight:"24rem",
    overflowY:"auto"
};

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