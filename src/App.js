import React, {Component} from 'react';
import './App.css';
import './fontawesome/css/all.css';

import Sidebar from "./components/layout/Sidebar";
import NewsColumn from "./components/NewsColumn";

class App extends Component {


    state = {
        newsColumns: [
            {
                id: "1",
                type: "source",
                source: "spiegel.de"
            }, {
                id: "2",
                type: "source",
                source: "pikio.pl"
            }
        ]
    }

    render() {
        return (
            <div className="App">
                <div>
                    <Sidebar newsColumns={this.state.newsColumns} />
                    <div style={columnWrapper}>
                        {this.state.newsColumns.map((column) => (
                            <NewsColumn column={column}/>
                        ))}
                    </div>
                </div>
            </div>
        );
    }


}

const columnWrapper = {
    marginLeft: "12.5rem",
    whiteSpace: "nowrap"
}

export default App;
