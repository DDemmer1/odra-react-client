import React, {Component} from 'react';
import ArticleList from "./SourceList";
import axios from "axios";
import ColumnHeader from "./SourceHeader";

class ArticleColumn extends Component {


    state = {
        articles: []
    }


    componentDidMount() {
        axios.get("http://localhost:8080/articles/source/"+this.props.column.source+"?limit=20")
            .then((result) => that.setState({articles: result.data}));
        //start 5sec refresh
        var that = this;
        window.setInterval(function() {
            axios.get("http://localhost:8080/articles/source/"+that.props.column.source+"?limit=20")
                .then((result) => that.setState({articles: result.data}))},
            5000
        );
    }


    render() {
        return (
            <div style={columnStyle} >
                <ColumnHeader source={this.props.column.source}/>
                <div onScroll={this.handleScroll} style={listStyle} className="columnScrollbar">
                    <ArticleList  articles={this.state.articles}/>
                </div>
            </div>
        );
    }


    handleScroll = e => {
        let element = e.target
        console.log(element.scrollHeight);
        console.log(element.clientHeight);
        console.log(element.scrollTop);
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            alert("End");
        }
    }

}






const listStyle = {
    overflow: "scroll",
    height: "94.1vh",
    whiteSpace:"normal",
    width: "20rem",
    padding: "1rem 1rem 1rem 1rem",
    borderRight: "solid lightgray thin",
    background: "white"

}



const columnStyle = {
    display: "inline-block",

}


export default ArticleColumn;