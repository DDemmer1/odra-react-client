import React, {Component} from 'react';


class LoginError extends Component {

    render() {
        return (
            <div className="mt-3 bg-danger text-white text-center rounded pt-1">
                <p>Wrong username or password</p>
            </div>
        );
    }
}


export default LoginError;