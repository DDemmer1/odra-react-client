import React, {Component} from 'react';
import axios from "axios/index";
import Radium from "radium";
import * as con from "../../../../OdraLighthouseConstants.js";
import LoadingButton from "../../../columns/buttons/LoadingButton";


class ScraperForm extends Component {


    state = {
        scrapers: [],
        url: "",
        name: "",
        error: false,
        success: false,
        message: "",
        loading: false
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");

        let that = this;
        axios.get(con.API_SCRAPER_CONTROLLER_URL + "/scraper/get")
            .then((result) => that.setState({scrapers: result.data}));
    }

    resetMessage = () => {
        this.setState({error: false});
        this.setState({loading: false});
        this.setState({message: ""});
        this.setState({success: false});
    };

    handleSubmit = () => {
        this.resetMessage();
        let that = this;
        this.setState({loading: true});
        // axios.get(con.API_SCRAPER_CONTROLLER_URL + "/scraper/add?url=" + this.state.url + "&name=" + this.state.name)
        axios.get(con.API_SCRAPER_CONTROLLER_URL + "/scraper/add?url=" + this.state.url)
            .then((result) => {
                this.setState({message: result.data.message});
                this.setState({loading: false})
                if (result.data.success === true) {
                    this.setState({success: true})
                } else {
                    this.setState({error: true})
                }
                axios.get(con.API_SCRAPER_CONTROLLER_URL + "/scraper/get")
                    .then((result) => {
                        that.setState({scrapers: result.data});
                        that.resetInput();
                    })
            });
    };

    handleDelete = (url) => {

        if (window.confirm('Are you sure you want to delete this Scraper link?')) {
            let that = this;
            axios.get(con.API_SCRAPER_CONTROLLER_URL + "/scraper/delete?url=" + url)
                .then((result) => axios.get(con.API_SCRAPER_CONTROLLER_URL + "/scraper/get")
                    .then((result) => {
                        that.setState({scrapers: result.data});
                        that.resetMessage();
                    }));
        }
    };

    resetInput = () => {
        // this.nameInput.value = "";
        this.urlInput.value = "";
    };

    render() {
        return (
            <div>
                <h5 className="text-center mt-3" style={{fontSize: "1rem"}}>Delete or add a Scraper</h5>
                <div style={form}>
                    <table className="table  table-hover table-responsive" >

                        <thead>
                        <tr>
                            <th scope="col">Source</th>
                            <th scope="col">Scraper URL</th>
                            <th scope="col">Status</th>
                            <th scope="col">Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.scrapers.map((scraper) => (
                                <tr key={scraper.id}>
                                    <td>{scraper.name}</td>
                                    <td style={{wordBreak: "break-all"}}>{scraper.url}</td>
                                    <td>{scraper.error ? <i style={{color:"red"}} class="fas fa-exclamation-circle"></i> : <i style={{color:"green"}} className="far fa-check-circle"></i>}</td>
                                    <td>
                                        <button className="btn mr-2" onClick={() => {
                                            this.handleDelete(scraper.url)
                                        }}><i style={{color: "red", fontSize: "1.2rem"}} className="fas fa-times"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>

                {/*Dropdown START*/}
                <div className="dropdown text-center">
                    <button className="btn-sm btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Add Scraper <i className="fas fa-caret-down"></i>
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton"
                         style={{marginLeft: "-12.8rem"}}>
                        <div className="input-group mb-3 pr-2 pt-2 pl-2">
                            {/*<input required type="text" className="form-control" placeholder="Name"*/}
                                   {/*ref={el => this.nameInput = el}*/}

                                   {/*aria-label="Name" aria-describedby="button-addon2" onChange={(event) => {*/}
                                {/*this.setState({name: event.target.value})*/}
                            {/*}}/>*/}
                            <input required type="text" className="form-control" placeholder="Scraper URL"
                                   ref={el => this.urlInput = el}
                                   aria-label="Scraper URL" aria-describedby="button-addon2" onChange={(event) => {
                                this.setState({url: event.target.value})
                            }}/>
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary " type="button"
                                        id="button-addon2" onClick={() => {
                                    this.handleSubmit();
                                }}>Submit
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
                {/*Dropdown END*/}

                {this.state.loading ?
                    <div className="rounded-lg" style={loading}><span style={loadingText}>Validating</span>
                        <LoadingButton/></div> : null}

                {this.state.success ? <div style={responseSuccess} className="rounded-lg">
                    <h5 style={{color: "green", fontWeight: "700"}}
                        className="text-center">SUCCESS</h5>{this.state.message}
                </div> : null}

                {this.state.error ? <div style={responseError} className="rounded-lg">
                    <h5 style={{color: "red", fontWeight: "700"}} className="text-center">ERROR</h5>{this.state.message}
                </div> : null}


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
    marginBottom: 0,
    border: "light rgb(29, 161, 242)",
    backgroundColor: "white",
    ':hover': {
        color: "rgb(29, 161, 242)",
        backgroundColor: "rgba(29, 161, 242, 0.1)"
    }
};


const responseSuccess = {
    paddingTop: "0.5rem",
    paddingBottom: "2rem",
    paddingRight: "0.5rem",
    paddingLeft: "0.5rem",
    position: "absolute",
    bottom: "-9rem",
    left: "10%",
    right: "10%",
    width: "80%",
    border: "solid green thin",
    backgroundColor: "white"
};

const responseError = {
    paddingTop: "0.5rem",
    paddingBottom: "2rem",
    paddingRight: "0.5rem",
    paddingLeft: "0.5rem",
    position: "absolute",
    bottom: "-9rem",
    left: "10%",
    right: "10%",
    width: "80%",
    backgroundColor: "white",
    border: "solid red thin"
};


const loading = {
    position: "absolute",
    bottom: "-5rem",
    left: "10rem",
    backgroundColor: "white",
    width: "10rem",
    height: "3.5rem"

};

const loadingText = {
    fontSize: "1.2rem",
    fontWeight: "500",
    position: "absolute",
    paddingLeft: "1.3rem",
    paddingTop: "1rem",
}

const form = {
    marginTop: "2rem",
    marginLeft: "2rem",
    marginRight: "1rem",
    marginBottom: "0rem",
    height: "22rem",
    overflowY: "scroll",
    overflowX: "hidden"
};

ScraperForm = Radium(ScraperForm);

export default ScraperForm;