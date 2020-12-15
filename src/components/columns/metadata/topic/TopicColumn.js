import React, {Component} from 'react';
import axios from "axios";
import LoadingButton from "../../buttons/LoadingButton";
import ArticleList from "../../news/source/ArticleList";
import * as con from "../../../../OdraLighthouseConstants.js";
import TopicHeader from "./TopicHeader";


class TopicColumn extends Component {

    state = {
        articles: [],
        limit: 20,
        loading: false,
        maxLimit: 0
    };


    updateColumn(){
        axios.get(con.API_BASE_URL + "/meta/topic/all/" + this.props.column.query )
            .then((result) => {
                this.requestArticles(result.data)
            });
    }

    requestArticles(topics){
        let articleIds = [];
        topics.forEach((topic) => articleIds.push(topic.mediaId));
        let that = this;
        axios.post(con.API_SCRAPER_CONTROLLER_URL + "/articles", {articleIds: articleIds})
            .then((result) => {
                this.setState({articles:result.data})
            });
    }

    interval;
    componentDidMount() {
        this.updateColumn();
        //start 5sec refresh
        var that = this;
        this.interval = window.setInterval(()=> this.updateColumn(), 2000);
    }

    componentWillUnmount(){
        window.clearInterval(this.interval);
    }

    clearColumn() {
        this.setState({articles: []})
    }

    render() {
        return (
            <div style={columnStyle}>
                <TopicHeader clearColumn={this.clearColumn.bind(this)} source={this.props.column.source} column={this.props.column} refreshColumns={this.props.refreshColumns}/>
                <div style={listStyle} onScroll={this.handleScroll} className="columnScrollbar">
                    <ArticleList toggle={this.props.toggle} articles={this.state.articles} user={this.props.user}/>
                    {this.state.loading ? <LoadingButton/> : null}
                </div>
            </div>
        );
    }


    handleScroll = e => {
        let element = e.target;
        // console.log(Math.floor(element.scrollHeight- element.scrollTop) +" == " + element.clientHeight);
        if (Math.floor(element.scrollHeight - element.scrollTop) <= element.clientHeight && this.state.loading === false && this.state.limit < this.state.articles.length +20) {
            this.setState({loading: true}, () => {
                this.setState({limit: this.state.limit + 20}, () => {
                    this.updateColumn();
                });
            });
        }
    };
}


const listStyle = {
    overflow: "scroll",
    height: "94.1vh",
    whiteSpace: "normal",
    width: "30rem",
    padding: "1rem 1rem 1rem 1rem",
    borderRight: "solid lightgray thin",
    background: "white",
    paddingBottom:"3rem"
};


const columnStyle = {
    display: "inline-block",

};

export default TopicColumn;