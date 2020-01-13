import React, {Component} from 'react';
import Radium from "radium";


class RedditColumnForm extends Component {



    render() {
        return (
            <div>
                <h5 className="text-center mt-3" style={{fontSize: "1rem"}}>Choose a Reddit topic</h5>
                <hr/>


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



RedditColumnForm = Radium(RedditColumnForm);


export default RedditColumnForm;