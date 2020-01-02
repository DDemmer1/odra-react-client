import React, {Component} from 'react';
import './App.css';
import './fontawesome/css/all.css';

import Sidebar from "./components/sidebar/Sidebar";
import ArticleColumn from "./components/columns/articles/SourceColumn";
import QueryColumn from "./components/columns/query/QueryColumn";
import Popup from "./components/popups/Popup";
import LoginForm from "./components/login/LoginForm";
import axios from "axios/index";
import * as con from "./OdraLighthouseConstants.js";


//TODO finish QueryArticle


class App extends Component {


    constructor() {
        super();

        this.state = {
            isAuthenticated: localStorage.getItem("isAuthenticated"),
            token: localStorage.getItem("token"),
            showPopup: false,
            popUpType: "",
            newsColumns: []
        }

        axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");
    }

    componentDidMount() {
        let that = this;
        axios.get("http://localhost:8888/user/get/columns")
            .then((result) => that.setState({newsColumns: result.data}))
            .catch(function (error) {
                that.onError();
            });
    }

    refreshColumns() {
        let that = this;
        axios.get(con.API_BASE_URL+ "/user/get/columns")
            .then((result) => that.setState({newsColumns: result.data}))
            .catch(function (error) {
                that.onError();
            });
    }


    togglePopup = (popUpType) => {
        this.setState({
            showPopup: !this.state.showPopup,
            popUpType: popUpType
        });
    };

    addColumn = (source, type, query) => {
        console.log(source);
        console.log(type);
        console.log(query);
        let that = this;
        axios.get(con.API_BASE_URL+ "/user/add/column?source=" + source + "&type=" + type + "&query=" + query).then((result) => {
            axios.get(con.API_BASE_URL+ "/user/get/columns").then((result) => that.setState({newsColumns: result.data}))
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
    }

    onLogin = (token) => {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("token", token);
        this.setState({isAuthenticated: "true"});
        this.setState({token: localStorage.getItem("token", token)});
        let that = this;
        axios.get(con.API_BASE_URL+ "/user/get/columns")
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
                        <Sidebar newsColumns={this.state.newsColumns} toggle={this.togglePopup.bind(this)}
                                 onLogout={this.onLogout.bind(this)}/>
                        <div style={columnWrapper}>
                            {this.state.newsColumns.map((column) => {
                                switch (column.type) {
                                    case "source":
                                        return <ArticleColumn column={column} refreshColumns={this.refreshColumns.bind(this)}/>;
                                    case "query":
                                        return <QueryColumn column={column} refreshColumns={this.refreshColumns.bind(this)}/>;
                                    default:
                                        return "";
                                }
                            })}
                        </div>
                        {this.state.showPopup ?
                            <Popup popUpType={this.state.popUpType} toggle={this.togglePopup.bind(this)}
                                   addColumn={this.addColumn.bind(this)}/> : null}
                    </> : <LoginForm onLogin={this.onLogin.bind(this)}/>}


            </div>
        );
    }
}

const columnWrapper = {
    marginLeft: "12.5rem",
    whiteSpace: "nowrap"
}

export default App;
