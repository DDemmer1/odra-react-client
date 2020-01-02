import React, {Component} from 'react';
import Radium from "radium";
import ScraperForm from "./ScraperForm";


class AdminMainForm extends Component {

    state = {
        scraper: false
    };

    reset() {
        this.setState(initialState);
    }

    handleClickScraper() {
        this.setState({scraper: true});
    }

    render() {
        return (

            <div>
                {(function (that) {
                    if (that.state.scraper) {
                        return <ScraperForm key="queryColumnForm" onBack={that.reset.bind(that)} />
                    } else {
                        return <React.Fragment>
                            <h5 className="text-center mt-3" style={{fontSize: "1rem"}}>Choose an Admin setting</h5>
                            <hr/>
                            <div className="row text-center" style={buttonsDiv}>
                                {/*Source Button*/}
                                <div onClick={() => {
                                    that.handleClickScraper();
                                }} className="text-center col" key="sourceButtonWrapper" style={buttonWrapper}>
                                    <span><i style={iconStyle} className="far fa-newspaper"></i> <p
                                        style={textStyle}>Scraper</p></span>
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
    scraper: false,
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

AdminMainForm = Radium(AdminMainForm);


export default AdminMainForm;