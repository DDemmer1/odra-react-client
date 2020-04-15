import React, {Component} from 'react';
import Radium from "radium";
import * as con from "../../../../OdraLighthouseConstants";
import axios from "axios/index";


class CommentsForm extends Component {

    state = {
        selectedText:"",
        text:"",
        article: null
    };

    reset() {
        this.setState(initialState);
    }

    updateDimensions(){
        //for each comment id in article/tweet etc.
        this.getYofMark("1337")
    }

    handleMouseDown() {
        this.state.selectedText = "";
    }

    handleMouseUp() {
        if (window.getSelection) {
            let start = window.getSelection().anchorOffset;
            let end = window.getSelection().focusOffset;
            let selected = this.props.text.substring(start,end);
            this.setState({selectedText: selected});
            console.log(selected);
        }
    }

    randomComment(){
        let textSize = this.state.article.textBody.length;
        let start = Math.floor(Math.random() * textSize) - 20;
        let end = start + 20;
        console.log(start + "|"+ end);
        let text = document.getElementById("detail-text").innerHTML;
        document.getElementById("detail-text").innerHTML = text.replace(text.substring(start,end),"<span id='mark-1337' style='background-color: lightcoral'>"+text.substring(start,end)+"</span>")


    }

    componentDidMount(){
        let that = this;
        axios.get(con.API_SCRAPER_CONTROLLER_URL+ "/articles/" + this.props.mediaid)
            .then((result) => {
                that.setState({article: result.data});
                console.log(result.data);
                this.randomComment();
                this.updateDimensions();
            });

        window.addEventListener("resize", this.updateDimensions.bind(this));
    }


    getYofMark(commentId) {
        if(document.getElementById("mark-" + commentId)!=null){
            document.getElementById(commentId).style.top = document.getElementById("mark-" + commentId).getClientRects()[0].y-200 + "px";
        }
    };

    render() {
        if(this.state.article == null) {
            return null;
        }
        const {headline, crawlDate,  link , sourceName , source ,id, textBody} = this.state.article;

        return (
        <React.Fragment>
                <h5 className="text-center mt-3" style={{fontSize: "1rem"}}>Comments</h5>
                <hr/>
                <div className="container column pt-2 pb-5" style={{overflow:"hidden"}}>
                    <div className="row mb-2">
                        <div className="col-6" style={sourceStyle}>{sourceName} - {headline}</div>
                    </div>

                    <div className="row">
                        {/*Text*/}
                        <div id="detail-text" style={textStyle} className="col-6 columnScrollbar" onScroll={()=>{this.updateDimensions()}} onMouseDown={() => this.handleMouseDown()} onMouseUp={() => this.handleMouseUp()}>
                            {textBody}
                        </div>
                        {/*Comments*/}
                        <div className="col-6" >
                            <div className="rounded" style={comment}  id="1337">
                                <div style={username}>
                                    Dennis Demmer <span style={{color:"grey"}}>@DemmerDennis</span>
                                </div>
                                <div>
                                    <span style={{color:"LightCoral"}}>&#11044; </span>Das ist ein Kommentar an <b style={{color:"steelblue"}}>@spinfocl</b>
                                </div>
                                <div style={{marginLeft:"1.35rem"}} className="btn btn-light btn-sm">Answer</div>
                            </div>
                        </div>

                    </div>


                </div>
            </React.Fragment>
        );
    }
}


const initialState = {};

const sourceStyle = { fontWeight: "800"};
const sourceSecond = { fontWeight: "550"};

const comment = {position:"relative", border:"solid lightgrey thin", padding:"1rem"};

const username = {fontWeight: 600,paddingLeft:"1.35rem"};



const textStyle = {
    overflow:"scroll",
    maxHeight:"70vh"
};


CommentsForm = Radium(CommentsForm);


export default CommentsForm;