import React, {Component} from 'react';
import QueryColumnForm from "./news/QueryColumnForm";
import SourceColumnForm from "./news/SourceColumnForm";
import Radium from "radium";
import SocialMediaMainForm from "./socialmedia/SocialMediaMainForm";


class AddColumnForm extends Component {

    state = {
        query: false,
        source: false,
        social: false
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
                            </div>
                        </React.Fragment>
                    }
                })(this)}


            </div>
        );
    }
}


const initialState = {
    query: false,
    source: false,
    social: false
};

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
}

AddColumnForm = Radium(AddColumnForm);


export default AddColumnForm;