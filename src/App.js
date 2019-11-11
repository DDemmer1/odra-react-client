import React, {Component} from 'react';
import './App.css';
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import SpiegelColumn from "./components/SpiegelColumn";
import PikioColumn from "./components/PikioColumn";

class App extends Component {

    render() {
        return (
            <div className="App">
                <div className="container-fluid">
                    <Header/>
                    <Sidebar/>
                    <div className="row" style={wrapper}>
                        <SpiegelColumn/>
                        <PikioColumn/>
                        <PikioColumn/>
                        <SpiegelColumn/>
                        <PikioColumn/>
                        <SpiegelColumn/>
                    </div>
                </div>
            </div>
        );
    }


}

const wrapper = {
    marginTop: "4rem",
    marginLeft: "14rem"
}
export default App;
