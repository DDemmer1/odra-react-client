import React, {Component} from 'react';
import QueryHeader from "./QueryHeader";
import ArticleList from "../source/ArticleList";
import axios from "axios";
import LoadingButton from "../../buttons/LoadingButton";
import * as con from "../../../../OdraLighthouseConstants.js";



class QueryColumn extends Component {

    state = {
        articles: [],
        limit: 20,
        loading: false,
        maxLimit: 0
    };


    componentDidMount() {
        axios.get(con.API_SCRAPER_CONTROLLER_URL+ "/articles/source/" + this.props.column.source + "?limit="+this.state.limit+"&query=" + this.props.column.query)
            .then((result) => that.setState({articles: result.data}));
        //start 5sec refresh
        var that = this;
        window.setInterval(function () {
                axios.get(con.API_SCRAPER_CONTROLLER_URL+ "/articles/source/" + that.props.column.source + "?limit="+that.state.limit+"&query=" + that.props.column.query)
                    .then((result) => that.setState({articles: result.data}));
            }, 15000
        );
    }

    render() {
        return (
            <div style={columnStyle}>
                <QueryHeader source={this.props.column.source} column={this.props.column} refreshColumns={this.props.refreshColumns}/>
                <div style={listStyle} onScroll={this.handleScroll} className="columnScrollbar">
                    <ArticleList articles={this.state.articles}/>
                    {this.state.loading ? <LoadingButton/> : null}
                </div>
            </div>
        );
    }


    handleScroll = e => {
        let element = e.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight && this.state.loading === false && this.state.limit < this.state.articles.length +20) {
            this.setState({loading: true}, () => {
                this.setState({limit: this.state.limit + 20}, () => {
                    axios.get(con.API_SCRAPER_CONTROLLER_URL+ "/articles/source/" + this.props.column.source + "?limit=" + this.state.limit +"&query=" + this.props.column.query)
                        .then((result) => this.setState({articles: result.data}, () => {
                            this.setState({loading: false})
                        }))
                });
            });
        }
    };
}


const listStyle = {
    overflow: "scroll",
    height: "94.1vh",
    whiteSpace: "normal",
    width: "20rem",
    padding: "1rem 1rem 1rem 1rem",
    borderRight: "solid lightgray thin",
    background: "white"

}


const columnStyle = {
    display: "inline-block",

}

export default QueryColumn;