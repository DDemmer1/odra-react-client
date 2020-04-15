import React, {Component} from 'react';
import Article from "../Article";

class ArticleList extends Component {
    render() {
        return this.props.articles.map((article) => (
            <Article user={this.props.user} key={article.id} article={article} toggle={this.props.toggle}/>
            )
        );
    }
}

export default ArticleList;