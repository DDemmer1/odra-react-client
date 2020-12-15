import React, {Component} from 'react';
import Radium from "radium"
import axios from "axios/index";
import * as con from "../../../OdraLighthouseConstants.js";


class SliderButton extends Component {

    componentDidMount = () => {
        axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");
    };

    clear = () => {
        this.props.clearColumn();
    };

    handleSubmit = () => {
        let that = this;

        if (this.props.column.source == "twitter") {
            axios.get(con.API_SCRAPER_CONTROLLER_URL + "/twitter/track/close/" + this.props.column.query)
                .then((result) => {
                    axios.get(con.API_BASE_URL + "/user/delete/column?columnid=" + this.props.column.id)
                        .then((result) => {
                            that.props.refreshColumns();
                        });
                });
        } else {
            axios.get(con.API_BASE_URL + "/user/delete/column?columnid=" + this.props.column.id)
                .then((result) => {
                    that.props.refreshColumns();
                });
        }


    };

    render() {
        return (
            <React.Fragment>

                <div className="btn-group " style={{float: "right"}}>
                    <div key="settings" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
                         aria-expanded="false">
                        <i key={this.props.source + "filter"} style={style} className="fas fa-sliders-h"></i>
                    </div>
                    <div className="dropdown-menu">
                        <button onClick={() => {
                            this.handleSubmit()
                        }} className="dropdown-item" type="button"><i className="fas fa-trash"></i> Remove
                        </button>
                        <button onClick={() => {
                            this.clear()
                        }} className="dropdown-item" type="button"><i className="fas fa-brush"></i> Clear
                        </button>
                    </div>
                </div>


            </React.Fragment>
        );
    }
}


SliderButton = Radium(SliderButton);

const style = {
    ':hover': {
        filter: "brightness(80%)"
    },
    color: "#1da1f2",
    float: "right",
    paddingRight: "1rem",
    cursor: "pointer"
}

export default SliderButton;