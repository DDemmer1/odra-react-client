import React, {Component} from 'react';
import AddColumnForm from "./forms/addColumns/AddColumnForm";
import AdminMainForm from "./forms/admin/AdminMainForm";


class Popup extends Component {
    render() {
        return (
            <div style={popupOuter} onClick={() => {
                this.props.toggle()
            }}>
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
                            default:
                                // return null;
                                return <AdminMainForm key="adminMainForm"/>;
                        }
                    })(this)}



                </div>
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
