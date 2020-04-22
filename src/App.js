import React, {Component} from 'react';
import './App.css';
import './fontawesome/css/all.css';

import Sidebar from "./components/sidebar/Sidebar";
import ArticleColumn from "./components/columns/news/source/SourceColumn";
import QueryColumn from "./components/columns/news/query/QueryColumn";
import TwitterColumn from "./components/columns/socialmedia/twitter/TwitterColumn";
import FacebookColumn from "./components/columns/socialmedia/facebook/FacebookColumn";
import RedditColumn from "./components/columns/socialmedia/reddit/RedditColumn";
import Popup from "./components/popups/Popup";
import LoginForm from "./components/login/LoginForm";
import axios from "axios/index";
import * as con from "./OdraLighthouseConstants.js";
import StarColumn from "./components/columns/metadata/star/StarColumn";
import TopicColumn from "./components/columns/metadata/topic/TopicColumn";
import FlagColumn from "./components/columns/metadata/flag/FlagColumn";


//TODO finish QueryArticle


class App extends Component {


    constructor() {
        super();

        this.state = {
            isAuthenticated: localStorage.getItem("isAuthenticated"),
            token: localStorage.getItem("token"),
            showPopup: false,
            popUpType: "",
            popUpSize: "",
            newsColumns: [],
            mediaid:"",
            user: null
        };

        axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");
    }

    componentDidMount() {

        let that = this;
        axios.get(con.API_BASE_URL + "/user/get/columns")
            .then((result) => that.setState({newsColumns: result.data}))
            .catch(function (error) {
                that.onError();
            });
        axios.get(con.API_BASE_URL + "/api/auth/isAdmin")
            .then((result) => {
                if (result.data.success === true) {
                    localStorage.setItem("isAdmin", "true");
                }
            });

        axios.get(con.API_BASE_URL + "/user/current").then((response)=> {
            that.setState({user:response.data})
        });


    }

    refreshColumns() {
        let that = this;
        axios.get(con.API_BASE_URL + "/user/get/columns")
            .then((result) => that.setState({newsColumns: result.data}))
            .catch(function (error) {
                that.onError();
            });
    }


    togglePopup = (popUpType, popUpSize, mediaid, callback) => {
        this.setState({
            showPopup: !this.state.showPopup,
            popUpType: popUpType,
            popUpSize: popUpSize,
            mediaid: mediaid,
            callback: callback
        });
    };

    addColumn = (source, type, query) => {
        // console.log(source);
        // console.log(type);
        // console.log(query);
        if(query !== null && query !== "" ){
            query = query.replace("#","").replace(" ","").replace("?","").replace("=","").replace(".","").replace(":","").replace("/","");
        }
        let that = this;
        axios.get(con.API_BASE_URL + "/user/add/column?source=" + source + "&type=" + type + "&query=" + query).then((result) => {
            axios.get(con.API_BASE_URL + "/user/get/columns").then((result) => {that.setState({newsColumns: result.data});
                // console.log(result.data);
            })
        }).catch(function (error) {
            that.onError();
        });
        this.togglePopup();
    };

    onLogout = () => {
        localStorage.clear();
        this.setState({isAuthenticated: "false"});
        this.setState({newsColumns: []});
        window.location.reload();
    };

    onLogin = (token) => {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("token", token);
        this.setState({isAuthenticated: "true"});
        this.setState({token: localStorage.getItem("token", token)});
        let that = this;
        axios.get(con.API_BASE_URL + "/user/get/columns")
            .then((result) => that.setState({newsColumns: result.data}));
        window.location.reload();
    };

    onError = () => {
        localStorage.clear();
        this.setState({isAuthenticated: "false"});
        this.setState({newsColumns: []});
        this.setState({token: ""});
    };



    render() {
        return (
            <div className="App">
                {this.state.isAuthenticated === "true"
                    ? <>
                        <Sidebar key="sidebar" newsColumns={this.state.newsColumns} toggle={this.togglePopup.bind(this)}
                                 onLogout={this.onLogout.bind(this)}/>
                        <div style={columnWrapper}>
                            {this.state.newsColumns.map((column) => {
                                switch (column.type) {
                                    case "source":
                                        return <ArticleColumn key={column.id} column={column} user={this.state.user}
                                                              refreshColumns={this.refreshColumns.bind(this)} toggle={this.togglePopup.bind(this)}/>;
                                    case "query":
                                        return <QueryColumn key={column.id} column={column} user={this.state.user}
                                                            refreshColumns={this.refreshColumns.bind(this)} toggle={this.togglePopup.bind(this)}/>;
                                    case "star":
                                        return <StarColumn key={column.id} column={column} user={this.state.user}
                                                            refreshColumns={this.refreshColumns.bind(this)} toggle={this.togglePopup.bind(this)}/>;
                                    case "flag":
                                        return <FlagColumn key={column.id} column={column} user={this.state.user}
                                                           refreshColumns={this.refreshColumns.bind(this)} toggle={this.togglePopup.bind(this)}/>;
                                    case "topic":
                                        return <TopicColumn key={column.id} column={column} user={this.state.user}
                                                           refreshColumns={this.refreshColumns.bind(this)} toggle={this.togglePopup.bind(this)}/>;
                                    case "socialmedia":
                                        if (column.source === "twitter") {
                                            return <TwitterColumn key={column.id} column={column} user={this.state.user} refreshColumns={this.refreshColumns.bind(this)} toggle={this.togglePopup.bind(this)}/>;
                                        } else if(column.source === "facebook"){
                                            return <FacebookColumn key={column.id} column={column} user={this.state.user} refreshColumns={this.refreshColumns.bind(this)} toggle={this.togglePopup.bind(this)}/>;
                                        } else if(column.source === "reddit"){
                                            return <RedditColumn key={column.id} column={column} user={this.state.user} refreshColumns={this.refreshColumns.bind(this)} toggle={this.togglePopup.bind(this)}/>;
                                        } else {
                                            return "";
                                        }
                                    default:
                                        return "";
                                }
                            })}
                        </div>
                        {this.state.showPopup ?
                            <Popup popUpType={this.state.popUpType} toggle={this.togglePopup.bind(this)} user={this.state.user} mediaid={this.state.mediaid} popUpSize={this.state.popUpSize}
                                   addColumn={this.addColumn.bind(this)} callback={this.state.callback}/> : null}
                    </> : <LoginForm onLogin={this.onLogin.bind(this)}/>}


            </div>
        );
    }
}

const columnWrapper = {
    marginLeft: "12.5rem",
    whiteSpace: "nowrap"
};

export default App;
