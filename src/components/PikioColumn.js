import React, {Component} from 'react';
import ArticleList from "./ArticleList";
import axios from "axios";


class PikioColumn extends Component {

    state = {
        articles: []
    }

    componentDidMount() {
        axios.get("http://localhost:8080/articles/source/pikio?limit=20")
            .then((result) => that.setState({articles: result.data}));
        var that = this;
        window.setInterval(function() {
                axios.get("http://localhost:8080/articles/source/pikio?limit=20")
                    .then((result) => that.setState({articles: result.data}))},
            5000
        );
    }


    render() {
        return (
            <div className="col-2">
                <div style={headLineWrapper}>
                    <h2 style={headlineStyle}>Pikio</h2>
                </div>
                <div style={listStyle}>
                    <ArticleList  articles={this.state.articles}/>
                </div>
            </div>
        );
    }
}


const headlineStyle = {
    fontSize: "1.5rem",
}

const listStyle = {
    marginTop: "2.5rem",
    overflow: "scroll",
    height: "86vh"
}

const headLineWrapper = {
    position: "fixed"
}

export default PikioColumn;