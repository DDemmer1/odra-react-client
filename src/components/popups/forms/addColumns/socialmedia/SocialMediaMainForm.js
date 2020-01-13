import React, {Component} from 'react';
import Radium from "radium";
import TwitterColumnForm from "./TwitterColumnForm";
import FacebookColumnForm from "./FacebookColumnForm";
import RedditColumnForm from "./RedditColumnForm";


class SocialMediaMainForm extends Component {


    state = {
        twitter: false,
        facebook: false,
        reddit: false,
    };

    back() {
        this.setState(initialState);
    }

    handleClickAddFacebook() {
        this.setState({facebook: true});
    }

    handleClickAddReddit() {
        this.setState({reddit: true});
    }

    handleClickAddTwitter() {
        this.setState({twitter: true});
    }

    render() {
        return (
            <div>
                {(function (that) {
                    if (that.state.twitter) {
                        return <TwitterColumnForm key="twitterColumnForm" onBack={that.back.bind(that)} addColumn={that.props.addColumn}/>
                    } else if(that.state.facebook){
                        return <FacebookColumnForm key="facebookColumnForm" onBack={that.back.bind(that)} addColumn={that.props.addColumn}/>
                    } else if(that.state.reddit){
                        return <RedditColumnForm key="redditColumnForm" onBack={that.back.bind(that)} addColumn={that.props.addColumn}/>
                    } else {
                            return <React.Fragment>
                                <h5 className="text-center mt-3" style={{fontSize: "1rem"}}>Choose a Social Media</h5>
                                <hr/>
                                <div className="row text-center" style={buttonsDiv}>
                                    {/*Twitter*/}
                                    <div onClick={() => {
                                        that.handleClickAddTwitter();
                                    }} className="text-center col" key="sourceButtonWrapper" style={buttonWrapper}>
                                    <span><i style={iconStyle} className="fab fa-twitter"></i> <p
                                        style={textStyle}>Twitter</p></span>
                                    </div>
                                    {/*Facebook*/}
                                    <div onClick={() => {
                                        that.handleClickAddFacebook();
                                    }} className="text-center col" key="addTwitterButtonWrapper" style={buttonWrapper}>
                                    <span><i style={iconStyle} className="fab fa-facebook-square"></i> <p
                                        style={textStyle}>Facebook</p></span>
                                    </div>
                                    {/*Reddit*/}
                                    <div onClick={() => {
                                        that.handleClickAddReddit();
                                    }} className="text-center col" key="addRedditButtonWrapper" style={buttonWrapper}>
                                    <span><i style={iconStyle} className="fab fa-reddit"></i> <p
                                        style={textStyle}>Reddit</p></span>
                                    </div>
                                </div>
                                <button className="btn btn-primary btn-sm odra-color" style={backButton} onClick={() => {
                                    that.props.onBack()
                                }}><i className="fas fa-long-arrow-alt-left"></i> Back
                                </button>
                            </React.Fragment>
                        }
                })(this)}



            </div>
        );
    }
}

const initialState = {
    twitter: false,
    facebook: false,
    reddit: false,
};

const textStyle = {
    fontFamily: " -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Ubuntu, \"Helvetica Neue\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", Arial, \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\", メイリオ, Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\"",
    fontWeight: "500",
    color: "#657786"
};

const iconStyle = {
    color: "rgb(29, 161, 242)",
    fontSize: "2.5rem",

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

const backButton = {
    position: "absolute",
    bottom: "2rem",
    left: "2rem",
    marginBottom:0,
    border: "light rgb(29, 161, 242)",
    backgroundColor:"white",
    ':hover': {
        color:"rgb(29, 161, 242)",
        backgroundColor:"rgba(29, 161, 242, 0.1)"
    }
};



SocialMediaMainForm = Radium(SocialMediaMainForm);


export default SocialMediaMainForm;