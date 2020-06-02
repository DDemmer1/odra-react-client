import React, {Component} from 'react';
import AddColumnForm from "./forms/addColumns/AddColumnForm";
import AdminMainForm from "./forms/admin/AdminMainForm";
import CommentsForm from "./forms/comment/CommentsForm";
import AddTopicForm from "./forms/addTopic/AddTopicForm";
import ProfileInfoForm from "./forms/profile/ProfileInfoForm";


class Popup extends Component {
    render() {
        return (
            <div style={popupOuter} onClick={() => {this.props.toggle()}}>

                {this.props.popUpSize=="big" ?
                    //Big
                    <div className="rounded rounded-lg" style={popupInnerBig} onClick={(event)=> {event.stopPropagation()}}>
                        <button className="btn mr-2" style={closeButton} onClick={() => {
                            this.props.toggle()
                        }}><i style={{color:"lightgray",fontSize:"1.2rem"}} className="fas fa-times"></i>
                        </button>
                        {(function(that) {
                            switch(that.props.popUpType) {
                                case 'comments':
                                    return <CommentsForm key="commentsForm" mediaid={that.props.mediaid} user={that.props.user}/>;
                                default:
                                    return null;
                            }
                        })(this)}
                    </div>
                    :
                    //Small
                    <div  style={popupInner} onClick={(event)=> {event.stopPropagation()}}>
                    <button className="btn mr-2" style={closeButton} onClick={() => {
                        this.props.toggle()
                    }}><i style={{color:"lightgray",fontSize:"1.2rem"}} className="fas fa-times"></i>
                    </button>
                    {(function(that) {
                        switch(that.props.popUpType) {
                            case 'addColumn':
                                return <AddColumnForm key="addColumnForm" addColumn={that.props.addColumn}/>;
                            case 'admin':
                                return <AdminMainForm key="adminMainForm"/>;
                            case 'profile':
                                return <ProfileInfoForm key="profileInfoForm" user={that.props.user}/>;
                            case 'addtopic':
                                return <AddTopicForm mediaid={that.props.mediaid} key="addTopicForm" toggle={that.props.toggle} callback={that.props.callback}/>;
                            default:
                                return null;
                        }
                    })(this)}
                </div>}
            </div>)
    }
}



const popupInner = {
    position: "absolute",
    left: "35%",
    // right: "35%",
    top: "20%",
    // bottom: "35%",
    width: "30rem",
    height: "30rem",
    margin: "auto",
    background: "white",
    borderRadius: "5%",
};


const popupInnerBig = {
    position: "absolute",
    left: "10%",
    top: "5%",
    width: "80vw",
    // height: "90vh",
    paddingBottom:"2rem",
    margin: "auto",
    background: "white",
    // borderRadius: "5%",
};

const closeButton = {
    float: "right",
    marginTop: "0.8rem"
};

const popupOuter = {
    zIndex: "1000",
    position: "fixed",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: "auto",
    backgroundColor: "rgba(56, 68, 77, 0.9)"
};

export default Popup;
