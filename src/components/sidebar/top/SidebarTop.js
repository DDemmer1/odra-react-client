import React, {Component} from 'react';
import ColumnOverviewButton from "./buttons/ColumnOverviewButton";
import AddColumnButton from "./buttons/AddColumnButton";

class SidebarTop extends Component {
    render() {
        return (
            <React.Fragment>
                <h6 style={{paddingTop: "1rem"}}>Columns:</h6>
                <ul className="list-unstyled">
                    <div>
                        {this.props.newsColumns.map((column) => (
                            <ColumnOverviewButton column={column}/>
                        ))}
                    </div>
                    <hr style={{borderColor: "lightsteelblue"}}/>
                    <AddColumnButton toggle={this.props.toggle}/>
                </ul>
            </React.Fragment>
        );
    }
}

export default SidebarTop;