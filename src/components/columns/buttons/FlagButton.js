import React, {Component} from 'react';
import axios from "axios/index";
import * as con from "../../../OdraLighthouseConstants";

class FlagButton extends Component {


    checkIfUserFlagged(flags, userid) {
        if (flags.length == 0) {
            this.setState({isFlaggedByUser: false});
        }

        for (let i = 0; i < flags.length; i++) {
            let currentFlag = flags[i];
            if (currentFlag.userid === userid) {
                this.setState({isFlaggedByUser: true});
                return;
            } else if (this.state.isFlaggedByUser == false) {
                this.setState({isFlaggedByUser: false});
            }
            this.setState({isFlaggedByUser: false});
        }
    };

    interval;

    componentDidMount() {
        let that = this;
        that.checkIfUserFlagged(that.props.flags, that.props.user.id);
        this.interval = window.setInterval(function () {
                that.checkIfUserFlagged(that.props.flags, that.props.user.id);
            },
            con.META_REFRESH_RATE
        );
    };

    componentWillUnmount(){
        window.clearInterval(this.interval);
    }

    handleClick(event) {
        let that = this;
        axios.post(con.API_BASE_URL + "/meta/tag/flag", {
            mediaId: parseInt(this.props.mediaid),
        }).then((result) => {
            axios.get(con.API_BASE_URL + "/meta/" + that.props.mediaid).then((result) => {
                that.props.setMeta(result.data);
                that.checkIfUserFlagged(result.data.flags, that.props.user.id);
            });
        });
    };

    state = {
        isFlaggedByUser: false
    };

    render() {
        return (
            <React.Fragment>
                {!this.state.isFlaggedByUser ? <i onClick={(event) => {
                        this.handleClick(event)
                    }} style={articleItemInActive} className="far fa-flag"></i> :
                    <i onClick={(event) => {
                        this.handleClick(event)
                    }} style={articleItemActive} className="fas fa-flag"></i>} {this.props.flags.length}
            </React.Fragment>
        );
    }
}


const articleItemActive = {
    paddingLeft: "0.8rem",
    cursor: "pointer",
    fontSize: "0.9rem",
    color: "tomato"
};

const articleItemInActive = {
    paddingLeft: "0.8rem",
    cursor: "pointer",
    fontSize: "0.9rem",
    color: "#b4b4b4"
};


export default FlagButton;