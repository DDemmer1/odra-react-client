import React, {Component} from 'react';
import axios from "axios/index";
import * as con from "../../../OdraLighthouseConstants";

class StarButton extends Component {



    checkIfUserStared(stars, userid) {
        if (stars.length == 0) {
            this.setState({isStaredByUser: false});
            return;
        }

        for (let i = 0; i < stars.length; i++) {
            let currentStar = stars[i];
            if (currentStar.userid === userid) {
                this.setState({isStaredByUser: true});
                return;
            } else if (this.state.isStaredByUser == false) {
                this.setState({isStaredByUser: false});
            }
        }
        this.setState({isStaredByUser: false})
    };

    interval;

    componentDidMount() {

        let that = this;
        this.checkIfUserStared(that.props.stars, that.props.user.id);
        this.interval =window.setInterval(function () {
                that.checkIfUserStared(that.props.stars, that.props.user.id);
            },
            con.META_REFRESH_RATE
        );
    };

    componentWillUnmount() {
        window.clearInterval(this.interval);
    }


    handleClick(event) {

        let that = this;
        axios.post(con.API_BASE_URL + "/meta/tag/star", {
            mediaId: parseInt(this.props.mediaid),
        }).then((result) => {
            axios.get(con.API_BASE_URL + "/meta/" + that.props.mediaid).then((result) => {
                that.props.setMeta(result.data);
                that.checkIfUserStared(result.data.stars, that.props.user.id);
            });
        });
    };

    state = {
        isStaredByUser: false
    };


    render() {
        return (
            <React.Fragment>
                {!this.state.isStaredByUser ? <i onClick={(event) => {
                        this.handleClick(event)
                    }} style={articleItemInActive} className="far fa-star"></i> :
                    <i onClick={(event) => {
                        this.handleClick(event)
                    }} style={articleItemActive} className="fas fa-star"></i>} {this.props.stars.length}
            </React.Fragment>
        );
    }
}

const articleItemActive = {
    paddingLeft: "0.8rem",
    cursor: "pointer",
    fontSize: "0.9rem",
    color: "gold"
};

const articleItemInActive = {
    paddingLeft: "0.8rem",
    cursor: "pointer",
    fontSize: "0.9rem",
    color: "#b4b4b4"
};


export default StarButton;