import React, {Component} from 'react';
import axios from "axios";
import LoadingButton from "../../buttons/LoadingButton";
import * as con from "../../../../OdraLighthouseConstants.js";
import TwitterHeader from "./TwitterHeader";
import TweetList from "./TweetList";


class TwitterColumn extends Component {

    state = {
        tweets: [],
        limit: 20,
        loading: false,
        maxLimit: 0
    };

    componentWillUnmount(){
        window.clearInterval(this.interval);
    }

    interval;

    componentDidMount() {
        axios.get(con.API_SCRAPER_CONTROLLER_URL+ "/twitter/tweet/get/list/" + this.props.column.query)
            .then((result) => that.setState({tweets: result.data}));
        //start 5sec refresh
        var that = this;
        this.interval = window.setInterval(function () {
                axios.get(con.API_SCRAPER_CONTROLLER_URL+ "/twitter/tweet/get/list/" + that.props.column.query)
                    .then((result) => that.setState({tweets: result.data}));
            }, 5000
        );
    }

    render() {
        return (
            <div style={columnStyle}>
                <TwitterHeader source={this.props.column.source} column={this.props.column}
                               refreshColumns={this.props.refreshColumns}/>
                <div style={listStyle} onScroll={this.handleScroll} className="columnScrollbar">
                    <TweetList toggle={this.props.toggle} tweets={this.state.tweets}/>
                    {this.state.loading ? <LoadingButton/> : null}
                </div>
            </div>
        );
    }


    handleScroll = e => {
        // let element = e.target;
        // if (element.scrollHeight - element.scrollTop === element.clientHeight && this.state.loading === false && this.state.limit < this.state.articles.length +20) {
        //     this.setState({loading: true}, () => {
        //         this.setState({limit: this.state.limit + 20}, () => {
        //             axios.get(con.API_SCRAPER_CONTROLLER_URL+ "/articles/source/" + this.props.column.source + "?limit=" + this.state.limit +"&query=" + this.props.column.query)
        //                 .then((result) => this.setState({articles: result.data}, () => {
        //                     this.setState({loading: false})
        //                 }))
        //         });
        //     });
        // }
    };
}


const listStyle = {
    overflow: "scroll",
    height: "94.1vh",
    whiteSpace: "normal",
    width: "30rem",
    padding: "1rem 1rem 1rem 1rem",
    borderRight: "solid lightgray thin",
    background: "white"

}


const columnStyle = {
    display: "inline-block",

}

export default TwitterColumn;