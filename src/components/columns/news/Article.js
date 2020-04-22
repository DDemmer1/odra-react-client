import React, {Component} from 'react';
import Radium from "radium";
import CommentButton from "../buttons/CommentButton";
import FlagButton from "../buttons/FlagButton";
import StarButton from "../buttons/StarButton";
import ThreeDotsButton from "../buttons/ThreeDotsButton";
import axios from "axios/index";
import * as con from "../../../OdraLighthouseConstants";

class Article extends Component {


    getMetadata() {
        let that = this;
        axios.get(con.API_BASE_URL + "/meta/" + this.props.article.id).then((result) => {
            that.setState({metadata: result.data})
        });
    }

    setMetadata(data) {
        this.setState({metadata: data})
    }

    componentWillMount() {
        this.getMetadata();
    }

    componentWillUnmount(){
        window.clearInterval(this.interval);
    }

    interval;

    componentDidMount(){
        let that = this;
        this.interval = window.setInterval(function () {
                that.getMetadata();
            },
            con.META_REFRESH_RATE
        );
    }

    deleteTopic(id){
        let that = this;
        if(!window.confirm("Do you realy want to remove this topic?")) return;
        axios.post(con.API_BASE_URL + "/meta/topic/delete",{
            metaId: that.state.metadata.id,
            topicId: id
        }).then((result) => {
            that.getMetadata();
        });
    }

    render() {
        const {headline, crawlDate, link, sourceName, source, id, textBody} = this.props.article;

        return (
            <div>
                <p style={{fontSize: "0.9rem", color: "#b4b4b4"}}><img alt="source favicon"
                                                                       src={"https://www.google.com/s2/favicons?domain=" + source}></img> @{sourceName}
                </p>
                <h4 style={{fontSize: "0.9rem"}}><a href={link} target="_blank" >{headline}</a></h4>

                <span style={{fontSize: "0.8rem"}}>{new Date(crawlDate).toLocaleDateString()}</span>
                {this.state.metadata != null ?
                    <p style={{fontSize: "0.8rem", marginTop:"0.5rem"}}>
                        {this.state.metadata.topics.map((topic, index) => (
                            <span key={index} style={topicStyle} className="rounded p-1"><i className="fas fa-times" style={{cursor: "pointer"}} onClick={() => this.deleteTopic(topic.id)}></i> {topic.topicName}</span>
                        ))}
                    </p>
                    : null}
                <div style={{color: "#b4b4b4"}}>
                    {this.state.metadata != null ?
                        <>
                            <CommentButton comments={this.state.metadata.comments} toggle={this.props.toggle}
                                           setMeta={this.setMetadata.bind(this)} text={textBody} mediaid={id}
                                           header={headline}/>
                            <FlagButton mediaid={id} flags={this.state.metadata.flags}
                                        setMeta={this.setMetadata.bind(this)} user={this.props.user}/>
                            <StarButton mediaid={id} stars={this.state.metadata.stars}
                                        setMeta={this.setMetadata.bind(this)} user={this.props.user}/>
                            <ThreeDotsButton mediaid={id} toggle={this.props.toggle} user={this.props.user} callback={this.getMetadata.bind(this)}/>
                        </>
                        : null}
                </div>
                <hr/>
            </div>
        );
    }
}

const topicStyle = {
    color:"gray",
    fontSize:"0.7rem",
    backgroundColor:"lightgray",
    marginRight:"0.2rem"
};

Article = Radium(Article);


export default Article;