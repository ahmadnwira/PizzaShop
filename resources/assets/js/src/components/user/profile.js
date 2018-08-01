import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            toLogin: false
        }
    }

    componentWillMount() {
        fetch("/api/session/user",
            {
                method: "POST",
                headers: {"Content-Type": "application/json; charset=utf-8"},
                body: JSON.stringify({token: localStorage.getItem('token')}),
            }
        )
        .then(response => response.json())
        .then(data => {
            switch (data['msg']) {
                case "expired":
                    localStorage.removeItem('token');
                    this.setState({toLogin: true})
                    break;
            }
        });
    }

    render() {
        if(this.state.toLogin === true){
            return <Redirect to="/login" />
        }
        return(
            <p> /Profile </p>
        );
    }
}

export default Profile;