import React, {Component} from 'react';
import ArticleList from "./ArticleList";
import axios from "axios";
import ColumnHeader from "./SourceHeader";
import LoadingButton from "../../buttons/LoadingButton";
import * as con from "../../../../OdraLighthouseConstants.js";


class SourceColumn extends Component {


    state = {
        articles: [],
        limit: 20,
        loading: false
    }

    componentWillUnmount(){
        window.clearInterval(this.interval);
    }

    interval;

    componentDidMount() {
        axios.get(con.API_SCRAPER_CONTROLLER_URL+ "/articles/source/" + this.props.column.source + "?limit=" + this.state.limit)
            .then((result) => that.setState({articles: result.data}));
        //start 5sec refresh
        var that = this;

        this.interval = window.setInterval(function () {
                axios.get(con.API_SCRAPER_CONTROLLER_URL+ "/articles/source/" + that.props.column.source + "?limit=" + that.state.limit)
                    .then((result) => that.setState({articles: result.data}))
            },
            15000
        );
    }


    render() {
        return (
            <div style={columnStyle}>
                <ColumnHeader source={this.props.column.source} column={this.props.column} refreshColumns={this.props.refreshColumns}/>
                <div onScroll={this.handleScroll} style={listStyle} className="columnScrollbar">
                    <ArticleList articles={this.state.articles} toggle={this.props.toggle} user={this.props.user}/>
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
                    axios.get(con.API_SCRAPER_CONTROLLER_URL+ "/articles/source/" + this.props.column.source + "?limit=" + this.state.limit)
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


export default SourceColumn;