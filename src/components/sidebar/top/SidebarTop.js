import React, {Component} from 'react';
import ColumnOverviewButton from "./buttons/ColumnOverviewButton";
import AddColumnButton from "./buttons/AddColumnButton";
import 'react-base-table/styles.css'

class SidebarTop extends Component {

    handleDragStart(e) {
        console.log("test");
    }

    handleDragEnd(e) {
        console.log("test");

    }

    render() {
        return (
            <React.Fragment>
                <h6 style={{paddingTop: "1rem"}}>Columns:</h6>
                <ul className="list-unstyled">
                    <div>
                        {this.props.newsColumns.map((column) => (
                            <ColumnOverviewButton key={"columnOverview"+column.id} column={column}/>
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