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
            apiUrl: "http://localhost:8080/",
            // apiUrl: "http://dennis-demmer.de:8080/",
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
            .then((result) => that.setState({newsColumns: result.data}));
    }

    refreshColumns() {
        let that = this;
        axios.get("http://localhost:8888/user/get/columns")
            .then((result) => that.setState({newsColumns: result.data}));
        console.log("refresh");
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
        axios.get("http://localhost:8888/user/add/column?source=" + source + "&type=" + type + "&query=" + query).then((result) => {
            axios.get("http://localhost:8888/user/get/columns").then((result) => that.setState({newsColumns: result.data}))
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
        let that = this;
        axios.get("http://localhost:8888/user/get/columns").then((result) => that.setState({newsColumns: result.data}));
        window.location.reload();
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
                                        return <ArticleColumn column={column} apiUrl={this.state.apiUrl} refreshColumns={this.refreshColumns.bind(this)}/>;
                                    case "query":
                                        return <QueryColumn column={column} apiUrl={this.state.apiUrl} refreshColumns={this.refreshColumns.bind(this)}/>;
                                    default:
                                        return "";
                                }
                            })}
                        </div>
                        {this.state.showPopup ? <Popup popUpType={this.state.popUpType} toggle={this.togglePopup.bind(this)}
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
