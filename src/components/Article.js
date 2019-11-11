import React, {Component} from 'react';

class Article extends Component {
    render() {
        const {headline, crawlDate,  link, topic } = this.props.article;
        return (
            <div>
                <p>{topic}</p>
                <h4 style={headlineStyle}><a href={link}>{headline}</a></h4>

                <p>{new Date(crawlDate).toLocaleString()}</p>
                <hr/>
            </div>
        );
    }
}

const headlineStyle = {
    fontSize: "0.9rem"
}



export default Article;