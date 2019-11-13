import React, {Component} from 'react';
import Article from "./Article";

class ArticleList extends Component {
    render() {
        return this.props.articles.map((article) => (
            <Article key={article.id} article={article}/>
            )
        );
    }
}

export default ArticleList;