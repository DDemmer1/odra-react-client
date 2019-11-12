import React, {Component} from 'react';

class Article extends Component {
    render() {
        const {headline, crawlDate,  link, topic } = this.props.article;

        return (
            <div style={articleStyle}>
                <p>{topic}</p>
                <h4 style={headlineStyle}><a href={link}>{headline}</a></h4>

                <p>{new Date(crawlDate).toLocaleString()}</p>
                <p style={itemList}>
                    <i style={articleItems} class="far fa-comment"></i> 5
                    <i style={articleItems} class="far fa-flag"></i> 4
                    <i style={articleItems} class="far fa-star"></i> 1
                    <i style={articleItems} class="fas fa-ellipsis-h"></i>
                </p>
                <hr/>
            </div>
        );
    }
}



const itemList = {
    color:"gray"
}

const articleItems = {
    paddingLeft: "1rem"
}

const headlineStyle = {
    fontSize: "0.9rem"
}

const articleStyle = {
}



export default Article;