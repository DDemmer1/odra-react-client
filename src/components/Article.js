import React, {Component} from 'react';
import Radium from "radium";

class Article extends Component {
    render() {
        const {headline, crawlDate,  link, topic } = this.props.article;

        return (
            <div style={articleStyle}>
                <p>{topic}</p>
                <h4 style={headlineStyle}><a href={link}>{headline}</a></h4>

                <span>{new Date(crawlDate).toLocaleString()}</span>
                <p style={itemList}>
                    <i style={[articleItems,{paddingLeft:"0"}]} class="far fa-comment"></i> 5
                    <i style={articleItems} class="far fa-flag"></i> 4
                    <i style={articleItems} class="far fa-star"></i> 1
                    <i style={articleItems} class="fas fa-ellipsis-h"></i>
                </p>
                <hr/>
            </div>
        );
    }
}

Article = Radium(Article)


const itemList = {
    color:"#b4b4b4"
}

const articleItems = {
    paddingLeft: "0.8rem",
    cursor:"pointer",
    fontSize: "0.9rem"

}

const headlineStyle = {
    fontSize: "0.9rem"
}

const articleStyle = {
}



export default Article;