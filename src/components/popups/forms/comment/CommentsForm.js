import React, {Component} from 'react';
import Radium from "radium";
import * as con from "../../../../OdraLighthouseConstants";
import axios from "axios/index";
import CommentText from "./CommentText";
import ColorButton from "./ColorButton";
import customCursor from '../../../../resources/marker.png';


class CommentsForm extends Component {

    state = {
        selectedText: "",
        text: "",
        article: null,
        comments: [],
        showCommentButton: false
    };


    getMetadata() {
        let that = this;
        axios.get(con.API_BASE_URL + "/meta/" + this.props.mediaid).then((result) => {
            that.setState({comments: result.data.comments});
            that.setState({metadata: result.data});
        });
    }

    reset() {
        this.setState(initialState);
    }

    updateAllCommentBoxes() {
        console.log("update");
        for (var i = 0; i < this.state.comments.length; i++) {
            let comment = this.state.comments[i];
            if (comment.preview) continue;
            let commentId = comment.commentId == undefined ? comment.id : comment.commentId;
            if (document.getElementById("mark-" + commentId) != null && document.getElementById(commentId) != null) {
                document.getElementById(commentId).style.top = document.getElementById("mark-" + commentId).getClientRects()[0].y - 170 + "px";
            }
        }
    }

    setOnClickForMarks() {
        for (var i = 0; i < this.state.comments.length; i++) {
            let comment = this.state.comments[i];
            let commentId = comment.commentId == undefined ? comment.id : comment.commentId;
            if (document.getElementById("mark-" + commentId) != undefined && document.getElementById(commentId) != null) {
                let mark = document.getElementById("mark-" + commentId);
                mark.addEventListener("click", () => {
                    this.focusBox(commentId)
                })
                mark.addEventListener("mouseover", () => {
                    this.toggleCommentBoxHover("in", commentId)
                });
                mark.addEventListener("mouseout", () => {
                    this.toggleCommentBoxHover("out", commentId)
                });
            }
        }
    }

    toggleCommentBoxHover(toggle, id) {
        let box = document.getElementById(id);

        if (toggle == "in") {
            if (!box.classList.contains("active")) {
                box.classList.add("shadow");
            }
        } else {
            if (!box.classList.contains("active")) {
                box.classList.remove("shadow");
            }
        }
    }

    handleMouseDown() {
        this.deletePreview();
        if (this.state.showCommentButton) {
            this.setState({showCommentButton: false})
        }
    }

    handleMouseUp() {
        if (window.getSelection) {
            //no range found
            try {
                window.getSelection().getRangeAt(0);
            } catch (e) {
                return;
            }

            //prepare comment request from selection
            let range = window.getSelection().getRangeAt(0);
            let currentNode = range.startContainer;
            let parentChildNodes = window.document.getElementById("detail-text").childNodes;
            let indexOfCurrentNode = -1;
            let lengthBeforeSelection = 0;

            for (let i = 0; i < parentChildNodes.length; i++) {
                if (parentChildNodes[i].contains(currentNode)) {
                    indexOfCurrentNode = i;
                    break;
                }
                lengthBeforeSelection += parentChildNodes[i].textContent.length;
            }

            let text = range.toString();
            let start = range.startOffset + lengthBeforeSelection;
            let end = range.startOffset + text.length + lengthBeforeSelection;
            let selectedText = this.state.article.textBody.substring(start, end);

            if (start != end) {
                let commentRequest = {
                    start: start,
                    end: end,
                    selectedText: selectedText,
                    mediaId: this.state.article.id,
                    user: this.props.user,
                    userId: this.props.user.id,
                    timestamp: new Date(),
                    preview: true,
                    color: "#F08080",
                    // commentId: Math.floor(Math.random() * 99999),
                    id: Math.floor(Math.random() * 99999),
                    commentText:"",
                    answers: []

                };
                //save request and show "Add comment" button
                this.setState({commentRequest: commentRequest, showCommentButton: true});

                //set all boxes inactive
                this.focusBox(-1);

                //set comment preview
                this.addComment(commentRequest);
            }
        }
    }


    addComment(comment) {
        //Check if comments overlap
        for (var i = 0; i < this.state.comments.length; i++) {
            let dbComment = this.state.comments[i];

            if (comment.start >= dbComment.start && comment.start <= dbComment.end) { //if start is in between existing boundaries
                this.setState({showCommentButton: false});
                alert("Overlaping not allowed");
                window.getSelection().empty();
                return;
            }

            if (comment.end >= dbComment.start && comment.end <= dbComment.end) { //if end is in between existing boundaries
                this.setState({showCommentButton: false});
                alert("Overlaping not allowed");
                window.getSelection().empty();
                return;
            }

            if (comment.start <= dbComment.start && comment.end >= dbComment.end) { //if start is in before existing dbcom.start and end after dbcom.end
                this.setState({showCommentButton: false});
                alert("Overlaping not allowed");
                window.getSelection().empty();
                return;
            }
        }

        //TODO send commentRequest to server, recieve SSE with new comment
        this.sendComment(comment)

    }


    sendComment(comment) {
        comment.commentText = this.state.commentInput;


        // Mockup send/recieve
        let addComments = this.state.comments;
        addComments.push(comment);
        this.setState({comments: addComments});
        //

        let id;
        if (comment.preview != true) {
            console.log(comment);
            axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");
            axios.post(con.API_BASE_URL + "/meta/comment/add", comment)
                .then((result) => {
                    console.log(result.data);
                    this.getMetadata();
                });

        }

        //TODO Refocus not possible, need to fetch new id from backend for this
        // this.focusBox(comment.id);
        this.setState({commentInput: ""});
    }

    dynamicsort(property, order) {
        var sort_order = 1;
        if (order === "desc") {
            sort_order = -1;
        }
        return function (a, b) {
            // a should come before b in the sorted order
            if (a[property] < b[property]) {
                return -1 * sort_order;
                // a should come after b in the sorted order
            } else if (a[property] > b[property]) {
                return 1 * sort_order;
                // a and b are the same
            } else {
                return 0 * sort_order;
            }
        }
    }


    renderCommments() {

        String.prototype.splice = function (start, length, replacement) {
            return this.substr(0, start) + replacement + this.substr(start + length);
        };

        //Reset text and render markers from the bottom up
        document.getElementById("detail-text").innerHTML = this.state.article.textBody;
        let text = document.getElementById("detail-text").innerHTML;

        let comments = this.state.comments;

        comments.sort(this.dynamicsort("end", "desc"));

        for (var i = 0; i < comments.length; i++) {
            let text = document.getElementById("detail-text").innerHTML;
            let comment = comments[i];
            let commentId = comment.id != undefined ? comment.id : comment.commentId
            let replacement = "<span preview='" + comment.preview + "' id='mark-" + commentId + "' style='cursor: pointer; background-color:" + comment.color + "'>" + comment.selectedText + "</span>"

            document.getElementById("detail-text").innerHTML = text.splice(comment.start, comment.end - comment.start, replacement);
        }
        this.setOnClickForMarks();
    }


    componentDidUpdate() {
        this.renderCommments();
        this.updateAllCommentBoxes();
        this.updateAddCommentButton();
    }


    componentDidMount() {
        let that = this;
        axios.get(con.API_SCRAPER_CONTROLLER_URL + "/articles/" + this.props.mediaid)
            .then((result) => {
                that.setState({article: result.data});
                that.getMetadata();
            });

        window.addEventListener("resize", this.updateAllCommentBoxes.bind(this));
        window.addEventListener("resize", this.updateAddCommentButton.bind(this));
    }


    handleAddCommentClick() {
        if (this.state.commentInput == "") {
            alert("Please enter a comment!");
            return;
        }
        let request = this.deletePreview();
        this.setState({showCommentButton: false});
        //TODO send request to server
        request.preview = false;
        this.sendComment(request);
    }

    handleCommentCancel() {
        this.deletePreview();
        this.setState({showCommentButton: false});
        this.setState({commentInput: ""});
    }

    updateAddCommentButton() {
        if (this.state.showCommentButton) {
            if (document.getElementById("add-comment") != undefined && document.querySelectorAll('[preview="true"]')[0] != undefined) {
                document.getElementById("add-comment").style.top = document.querySelectorAll('[preview="true"]')[0].getBoundingClientRect().y - 170 + "px";
                document.getElementById("comment-input").focus();
            }
        }
    }

    //delete preview comments and returns preview request
    deletePreview() {
        let request;
        var i = this.state.comments.length;
        while (i--) {
            if (this.state.comments[i].preview) {
                request = this.state.comments[i];
                this.state.comments.splice(i, 1);
            }
        }
        return request;
    }


    handleCommentInput(event) {
        let commentInput = event.target.value;
        this.setState({commentInput: commentInput});
    }

    changeColor(color) {
        for (let i = 0; i < this.state.comments.length; i++) {
            if (this.state.comments[i].preview) {
                let comments = this.state.comments;
                let comment = comments[i];
                comment.color = color;
                comments[i] = comment;
                this.setState({comments: comments});
            }
        }
    }


    focusBox(boxId) {
        //set all boxes inactive
        for (let i = 0; i < this.state.comments.length; i++) {
            let comments = this.state.comments;
            let comment = comments[i];
            comment.active = false;
            comments[i] = comment;
            this.setState({comments: comments});
        }

        //set box with id active
        for (let i = 0; i < this.state.comments.length; i++) {
            if (this.state.comments[i].id == boxId) {
                let comments = this.state.comments;
                let comment = comments[i];
                comment.active = true;
                comments[i] = comment;
                this.setState({comments: comments});
            }
        }
    }


    render() {
        if (this.state.article == null) {
            return null;
        }
        const {headline, crawlDate, link, sourceName, source, id, textBody} = this.state.article;

        return (
            <React.Fragment>
                <h5 className="text-center mt-3" style={{fontSize: "1rem"}}>Comments</h5>
                <hr/>
                <div className="container column pt-2 pb-5" style={{overflow: "hidden"}}>
                    <div className="row mb-2">
                        <div className="col-6" style={sourceStyle}>{sourceName} - {headline}</div>
                    </div>
                    <div className="row">
                        {/*Text*/}
                        <p id="detail-text" style={[textStyle]} className="col-6 columnScrollbar"
                           onScroll={() => {
                               this.updateAllCommentBoxes();
                               this.updateAddCommentButton();
                           }}
                           onMouseDown={() => this.handleMouseDown()}
                           onMouseUp={() => this.handleMouseUp()}>
                            {textBody}
                        </p>
                        {/*Comments*/}
                        <div className="col-6" onMouseDown={() => this.handleMouseDown()}>
                            {/*START AddCommentField*/}
                            {this.state.showCommentButton ?
                                <div className="rounded-lg" style={addCommentStyle} id="add-comment"
                                     onMouseDown={(event) => {
                                         event.stopPropagation();
                                     }}>

                                    <div style={username}>
                                        <i class="fas fa-user"></i> {this.props.user.name} <span
                                        style={{color: "grey"}}>@{this.props.user.username}</span>
                                    </div>
                                    <div><i className="fas fa-highlighter"></i> Color:</div>
                                    <div style={{height: "2rem"}}>
                                        <ColorButton color={"#F08080"} active={true}
                                                     changeColor={this.changeColor.bind(this)}/>
                                        <ColorButton color={"#73f087"} changeColor={this.changeColor.bind(this)}/>
                                        <ColorButton color={"#7888f0"} changeColor={this.changeColor.bind(this)}/>
                                        <ColorButton color={"#f0ee64"} changeColor={this.changeColor.bind(this)}/>
                                    </div>
                                    <input id="comment-input" className="form-control" onChange={(event) => {
                                        this.handleCommentInput(event);
                                    }}></input>

                                    <div className="mt-2">
                                        <div key="commentButton"
                                             className="btn btn-primary btn-sm odra-color text-center mr-2 "
                                             style={comment}
                                             onClick={() => {
                                                 this.handleAddCommentClick();
                                             }}
                                             onMouseDown={(event) => {
                                                 event.stopPropagation()
                                             }}
                                        >Comment
                                        </div>
                                        <div key="cancelButton"
                                             className="btn btn-primary btn-sm odra-color text-center"
                                             style={cancel}
                                             onClick={() => {
                                                 this.handleCommentCancel();
                                             }}>
                                            Cancel
                                        </div>
                                    </div>
                                </div>
                                : null}
                            {/*END AddCommentField*/}


                            {/*CommentText fields*/}
                            {this.state.comments.map((comment) => (
                                <React.Fragment key={comment.id + "-fragment"}> {comment.preview ? null :
                                    <CommentText metadata={this.state.metadata} getMetadata={this.getMetadata.bind(this)} user={this.props.user} key={comment.id + "-text"} comment={comment}
                                                 focus={this.focusBox.bind(this)}/>}
                                </React.Fragment>
                            ))}


                        </div>

                    </div>


                </div>
            </React.Fragment>
        );
    }


}


const initialState = {};

const sourceStyle = {fontWeight: "800"};

const addCommentStyle = {
    zIndex: 9999999,
    position: "absolute",
    boxShadow: "rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
    borderRadius: "8px",
    left: "-0.5rem",
    padding: "1rem 1rem 1rem 2.35rem",
    width: "90%",
    backgroundColor: "white"
};


const cancel = {
    marginBottom: 0,
    border: "light rgb(29, 161, 242)",
    backgroundColor: "white",
    fontWeight: "500"
};


const comment = {
    marginBottom: 0,
    border: "light rgb(29, 161, 242)",
    color: "white",
    fontWeight: "500"
};


const textStyle = {
    overflow: "scroll",
    maxHeight: "70vh",
    cursor: "url('" + customCursor + "'), auto"
};

const username = {fontWeight: 600, marginBottom: "0.5rem"};


CommentsForm = Radium(CommentsForm);


export default CommentsForm;