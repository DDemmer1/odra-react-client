import React, {Component} from 'react';
import Radium from "radium";
import axios from "axios/index";
import * as con from "../../../../OdraLighthouseConstants";

class ColumnOverviewButton extends Component {


    getIcon(){
        switch (this.props.column.type) {
            case ("socialmedia"):
                return "fas fa-hashtag";
            case ("query"):
                return "fas fa-search";
            case ("source"):
                return "far fa-newspaper";
            case ("star"):
                return "far fa-star";
            case ("flag"):
                return "far fa-flag";
            case ("topic"):
                return "fas fa-thumbtack";
            default:
                return "";
        }
    }

    state = {
        name:"All",
    };

    getUser(){
        if(this.props.column.query != "all" && this.props.column.query != "null" && (this.props.column.type == "flag" || this.props.column.type == "star")){
            axios.get(con.API_BASE_URL + "/user/" + this.props.column.query )
                .then((result) => {
                    this.setState({name: result.data.name})
                });
        }
    }

    componentDidMount(){
        this.getUser();
    }

    getHashTagListFromString(querys){
        switch (this.props.column.type) {
            case ("star"):
                return this.state.name + " ";
            case ("flag"):
                return this.state.name + " ";
            default:
                let out = "";
                querys.split(",").forEach((hashtag) => {
                    out = out + " #" + hashtag;
                });
                out = out + " ";
                return out;
        }
    }


    goToColumn(id){
        // let element = document.getElementById("header"+id);
        // let left = element.getBoundingClientRect().left;
        // console.log(left);
        // window.scrollTo({left:left+900,  behavior: "smooth",})
        // element.scrollIntoView({behavior: "smooth", block: "center"});
    }




    render() {
        let query = (this.props.column.query == "" || this.props.column.query == "null") ? "" : this.getHashTagListFromString(this.props.column.query);

        let icon = this.getIcon();
        return (
            <React.Fragment>
                <div  draggable="true" onClick={() => this.goToColumn(this.props.column.id)} className="row" style={[{paddingTop: "1rem", cursor: "move"}, hoverStyle]}
                     key={this.props.column.id}>
                    <div className="col-2" href={"#header"+this.props.column.id}>
                        <i style={{
                            float: "left", color: "#c6c6c6",
                            paddingTop: "0.7rem",
                            fontSize: "1.4rem"
                        }} className={icon}></i>
                    </div>
                    <div className="col-10" style={{paddingLeft: "1.4rem"}}>
                        <span
                            style={{
                                display: "block",
                                fontSize: "0.9rem"
                            }}>{this.props.column.type[0].toUpperCase() + this.props.column.type.slice(1)}</span>

                          <span style={{
                            display: "block",
                            fontSize: "0.7rem",
                            opacity: "0.6"
                        }}>
                              {(this.props.column.type == "star" || this.props.column.type == "flag") ? <i className="far fa-user"></i> : null} {query}{(this.props.column.type != "star" && this.props.column.type != "flag" )? <>@{this.props.column.source[0].toUpperCase() + this.props.column.source.slice(1)}</> : null}
                        </span>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

ColumnOverviewButton = Radium(ColumnOverviewButton);



var dragSrcEl = this;
const hoverStyle = {
    ':hover': {
        filter: "brightness(3)"
    }
};

export default ColumnOverviewButton;