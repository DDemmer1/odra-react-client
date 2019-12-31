import React from 'react';

const LoadingButton = () => {
    return (
        <React.Fragment>
            <div  className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </React.Fragment>
    );
};

export default LoadingButton;

