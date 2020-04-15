import React, {Component} from 'react';
import Radium from "radium";
import CommentButton from "../../buttons/CommentButton";
import FlagButton from "../../buttons/FlagButton";
import StarButton from "../../buttons/StarButton";
import ThreeDotsButton from "../../buttons/ThreeDotsButton";

class Tweet extends Component {

    state = {
        flags: 0,
        stars: 0,
        comments: 1
    };

    render() {
        const {id, text,  tweet_url, created_at, user_name, user_profile_image_url, user_handle} = this.props.tweet;

        return (
            <div>
                <p className="mb-1" style={{fontSize: "0.9rem", color: "#b4b4b4"}}><i style={{color: "#00aced"}}
                                                                     className="fab fa-twitter"></i> @Twitter</p>

                <div className="row">
                    <div className="col-2 pt-2">
                        <div style={profileImageWrapper} className="rounded-circle">
                            <a href={"https://twitter.com/" + user_handle}>
                                <img style={profileImage} src={user_profile_image_url}/>
                            </a>
                        </div>
                    </div>
                    <div className="col-10">
                        <span><a href={"https://twitter.com/" + user_handle}><span style={nameStyle}>{user_name}</span> <span style={screenNameStyle}>@{user_handle}</span></a></span>
                        <p className="mb-1" style={{fontSize: "0.9rem"}}><a href={tweet_url}>{text}</a></p>

                        <span style={{fontSize: "0.8rem"}}>{new Date().toDateString()}</span>

                    </div>
                </div>

                <p className="mt-3" style={{color: "#b4b4b4"}}>
                    <CommentButton toggle={this.props.toggle} comments={1} text={this.props.tweet.text} header={"Tweet " + "<i class='fab fa-twitter'></i>"}/>
                    <FlagButton flags={this.state.flags}/>
                    <StarButton stars={this.state.stars}/>
                    <ThreeDotsButton/>
                </p>

                <hr/>
            </div>
        );
    }

    handleStarClick() {
        this.setState({stars: this.state.stars+1});
        console.log("test");
    }
}


const profileImageWrapper = {
    overflow: "hidden",
    height: "2.3rem",
    width: "2.3rem"
};

const profileImage = {
    height: "2.3rem",
    width: "2.3rem"
};


const nameStyle = {
    fontWeight: "700",
    fontSize: "0.9rem"
};

const screenNameStyle = {
    color: "grey",
    fontSize: "0.8rem"


};

Tweet = Radium(Tweet)


export default Tweet;