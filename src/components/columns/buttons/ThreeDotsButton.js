import React, {Component} from 'react';
import * as con from "../../../OdraLighthouseConstants";
import axios from "axios/index";


class ThreeDotsButton extends Component {
    getMetadata(){
        axios.get(con.API_BASE_URL + "/meta/" + this.props.mediaid).then((result) => {
            console.log(result.data);
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="btn-group">
                    <div className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i style={articleItem} className="fas fa-ellipsis-h" ></i>
                    </div>
                    <div className="dropdown-menu">
                        <button className="dropdown-item" type="button" onClick={()=> {
                            this.props.toggle("addtopic", "small", this.props.mediaid, this.props.callback)}}>Add topic</button>
                        <button className="dropdown-item" type="button">Report faulty media</button>
                        <button className="dropdown-item" type="button" onClick={() => this.getMetadata()}>Debug Metadata</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const articleItem = {
    paddingLeft: "0.8rem",
    cursor:"pointer",
    fontSize: "0.9rem"

};

export default ThreeDotsButton;