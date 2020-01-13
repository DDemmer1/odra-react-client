import React, {Component} from 'react';
import Radium from "radium";
import CommentButton from "../buttons/CommentButton";
import FlagButton from "../buttons/FlagButton";
import StarButton from "../buttons/StarButton";
import ThreeDotsButton from "../buttons/ThreeDotsButton";

class Article extends Component {
    render() {
        const {headline, crawlDate,  link , sourceName , source } = this.props.article;

        return (
            <div>
                <p style={{fontSize: "0.9rem" ,color:"#b4b4b4"}}><img alt="source favicon" src={"https://www.google.com/s2/favicons?domain="+source}></img> @{sourceName}</p>
                <h4 style={{ fontSize: "0.9rem"}}><a href={link}>{headline}</a></h4>

                <span style={{ fontSize: "0.8rem"}}>{new Date(crawlDate).toLocaleDateString()}</span>
                <p style={{color:"#b4b4b4"}}>
                    <CommentButton comments={Math.round((Math.random()+1) * 2)}/>
                    <FlagButton flags={Math.round((Math.random()+1) * 2)}/>
                    <StarButton stars={Math.round((Math.random()+1) * 2)}/>
                    <ThreeDotsButton/>
                </p>
                <hr/>
            </div>
        );
    }
}

Article = Radium(Article)


export default Article;