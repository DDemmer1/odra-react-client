import React, {Component} from 'react';
import Tweet from "./Tweet";

class TweetList extends Component {
    render() {
        return this.props.tweets.map((tweet) => (
                <Tweet key={tweet.id} tweet={tweet} toggle={this.props.toggle} text={this.props.text}/>
            )
        );
    }
}

export default TweetList;