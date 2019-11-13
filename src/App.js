import React, {Component} from 'react';
import './App.css';
import './fontawesome/css/all.css';

import Sidebar from "./components/sidebar/Sidebar";
import NewsColumn from "./components/columns/articles/ArticleColumn";

class App extends Component {

    state = {
        newsColumns: [
            {
                id: "1",
                type: "source",
                source: "spiegel"
            }, {
                id: "2",
                type: "source",
                source: "pikio"
            }
        ]
    }

    render() {
        return (
            <div className="App">
                <Sidebar newsColumns={this.state.newsColumns}/>
                <div style={columnWrapper}>
                    {this.state.newsColumns.map((column) => (
                        <NewsColumn column={column}/>
                    ))}
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
