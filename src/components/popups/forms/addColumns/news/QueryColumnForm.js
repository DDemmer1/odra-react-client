import React, {Component} from 'react';
import Radium from "radium";
import * as con from "../../../../../OdraLighthouseConstants";
import axios from "axios/index";


class QueryColumnForm extends Component {


    state = {
        query: null,
        source: "",
        type: "query",
        scrapers: [],
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");

        let that = this;
        axios.get(con.API_SCRAPER_CONTROLLER_URL + "/scraper/get")
            .then((result) => {
                that.setState({scrapers: result.data});
                // that.setState({source: this.state.scrapers[0].name})
                that.setState({source: "all"});
            });

    }


    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addColumn(this.state.source, this.state.type, this.state.query)

    }

    render() {
        return (
            <div>
                <h5 className="text-center mt-3" style={{fontSize: "1rem"}}>Add a Search column</h5>
                <hr/>
                <form onSubmit={(event) => {
                    this.handleSubmit(event)
                }}>
                    <div className="form-group" style={form}>
                        <label className="col-form-label" htmlFor="source">News-Source: </label>
                        <select style={{textTransform: "capitalize"}} className="custom-select" name="source" onChange={(event) => {
                            this.setState({source: event.target.value})
                        }}>
                            <option style={{textTransform: "capitalize"}}>all</option>

                            {
                            this.state.scrapers.map((scraper) => (
                                <option key={scraper.id}>{scraper.name}</option>
                            ))
                        }
                        </select>

                        <label className="mt-3" htmlFor="query">Query: </label><input className="form-control" required name="query"
                                                                 onChange={(event) => {
                                                                     this.setState({query: event.target.value})
                                                                 }}/>
                        <button className="btn odra-bg-color btn-primary mt-3" type="submit">Submit</button>
                    </div>
                </form>

                <button className="btn btn-primary btn-sm odra-color" style={backButton} onClick={() => {
                    this.props.onBack()
                }}><i className="fas fa-long-arrow-alt-left"></i> Back
                </button>
            </div>
        );
    }
}

const backButton = {
    position: "absolute",
    bottom: "2rem",
    left: "2rem",
    marginBottom:0,
    border: "light rgb(29, 161, 242)",
    backgroundColor:"white",
    ':hover': {
        color:"rgb(29, 161, 242)",
        backgroundColor:"rgba(29, 161, 242, 0.1)"
    }
};

const form = {
    padding: "0.5rem 3.5rem "
}

QueryColumnForm = Radium(QueryColumnForm);

export default QueryColumnForm;