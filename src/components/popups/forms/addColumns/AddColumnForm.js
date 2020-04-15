import React, {Component} from 'react';
import QueryColumnForm from "./news/QueryColumnForm";
import SourceColumnForm from "./news/SourceColumnForm";
import Radium from "radium";
import SocialMediaMainForm from "./socialmedia/SocialMediaMainForm";
import StarColumnForm from "./metadata/StarColumnForm";
import TopicColumnForm from "./metadata/TopicColumnForm";

const initialState = {
    query: false,
    source: false,
    social: false,
    stars: false,
    flags: false,
    user: false,
    comments: false,
    topics: false
};

class AddColumnForm extends Component {

    state = {
        query: false,
        source: false,
        social: false,
        stars: false,
        flags: false,
        user: false,
        comments: false,
        topics: false

    };

    reset() {
        this.setState(initialState);
    }

    handleClickQuery() {
        this.setState({query: true});
    }

    handleClickSource() {
        this.setState({source: true});
    }

    handleClickSocial() {
        this.setState({social: true});
    }

    handleClickFlags() {
        this.setState({flags: true});
    }

    handleClickUser() {
        this.setState({user: true});
    }

    handleClickComments() {
        this.setState({comments: true});
    }

    handleClickStars() {
        this.setState({stars: true});
    }

    handleClickTopics() {
        this.setState({topics: true});
    }

    render() {
        return (

            <div>
                {(function (that) {
                    if (that.state.query) {
                        return <QueryColumnForm key="queryColumnForm" onBack={that.reset.bind(that)}
                                                addColumn={that.props.addColumn}/>
                    } else if (that.state.source) {
                        return <SourceColumnForm key="sourceColumnForm" onBack={that.reset.bind(that)}
                                                 addColumn={that.props.addColumn}/>
                    } else if (that.state.social) {
                        return <SocialMediaMainForm key="socialMediaMainForm" onBack={that.reset.bind(that)}
                                                 addColumn={that.props.addColumn}/>
                    } else if (that.state.stars) {
                        return <StarColumnForm key="starColumnForm" onBack={that.reset.bind(that)}
                                                    addColumn={that.props.addColumn}/>
                    } else if (that.state.topics) {
                        return <TopicColumnForm key="starColumnForm" onBack={that.reset.bind(that)}
                                               addColumn={that.props.addColumn}/>
                    } else {
                        return <React.Fragment>
                            <h5 className="text-center mt-3" style={{fontSize: "1rem"}}>Choose a column type to add</h5>
                            <hr/>
                            <div className="row text-center" style={buttonsDiv}>
                                {/*Source Button*/}
                                <div onClick={() => {
                                    that.handleClickSource();
                                }} className="text-center col" key="sourceButtonWrapper" style={buttonWrapper}>
                                    <span><i style={iconStyle} className="far fa-newspaper"></i> <p
                                        style={textStyle}>Source</p></span>
                                </div>

                                {/*Query Button*/}
                                <div onClick={() => {
                                    that.handleClickQuery();
                                }} className="text-center col" style={buttonWrapper}>
                                    <span><i key="searchIcon" style={iconStyle} className="fas fa-search"></i> <p
                                        style={textStyle}>Search</p></span>
                                </div>

                                {/*Social Media Button*/}
                                <div onClick={() => {
                                    that.handleClickSocial();
                                }} className="text-center col" style={buttonWrapper} key="hashTag">
                                    <span><i key="hashTagIcon" style={iconStyle} className="fas fa-hashtag"></i> <p
                                        style={textStyle}>Social Media</p></span>
                                </div>

                                {/*Topics Button*/}
                                <div onClick={() => {
                                    that.handleClickTopics();
                                }} className="text-center col" style={buttonWrapper} key="topic">
                                    <span> <i key="topicIcon" style={iconStyle} className = "fas fa-thumbtack"></i> <p
                                        style={textStyle}>Topic</p></span>
                                </div>
                                {/*Star Button*/}
                                <div onClick={() => {
                                    that.handleClickStars();
                                }} className="text-center col" style={buttonWrapper} key="star">
                                    <span><i key="starIcon" style={iconStyle} className="far fa-star"></i> <p
                                        style={textStyle}>Stars</p></span>
                                </div>

                                {/*Flags Button*/}
                                <div onClick={() => {
                                    that.handleClickFlags();
                                }} className="text-center col" style={buttonWrapper} key="flag">
                                    <span><i key="flagIcon" style={iconStyle} className="far fa-flag"></i> <p
                                        style={textStyle}>Flags</p></span>
                                </div>

                                {/*User Button*/}
                                <div onClick={() => {
                                    that.handleClickUser();
                                }} className="text-center col" style={buttonWrapper} key="user">
                                    <span><i key="userIcon" style={iconStyle} className="far fa-user"></i> <p
                                        style={textStyle}>User</p></span>
                                </div>

                                {/*Comments Button*/}
                                <div onClick={() => {
                                    that.handleClickComments();
                                }} className="text-center col" style={buttonWrapper} key="comment">
                                    <span><i key="commentIcon" style={iconStyle} className="far fa-comment"></i> <p
                                        style={textStyle}>Comment</p></span>
                                </div>


                            </div>
                        </React.Fragment>

                    }
                })(this)}


            </div>
        );
    }
}

const textStyle = {
    fontFamily: " -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Ubuntu, \"Helvetica Neue\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", Arial, \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\", メイリオ, Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\"",
    fontWeight: "500",
    color: "#657786"
};

const iconStyle = {
    color: "rgb(29, 161, 242)",
    fontSize: "2rem",

};

const buttonsDiv = {
    paddingLeft: "5rem",
    paddingTop: "2rem",
    paddingRight: "5rem",
    paddingBottom: "2rem"
};

const buttonWrapper = {
    width: "5rem",
    transition: "0.20s",
    ':hover': {
        filter: "brightness(80%)",
        cursor: "pointer",
        transform: "scale(1.08)"
    }
};

AddColumnForm = Radium(AddColumnForm);


export default AddColumnForm;