import React from 'react';
import {Link} from 'react-router-dom';

const SignUp = () => (
        <form className="col-offset-md-4 col-md-6 mt-2">
            <div className="form-group">
                <label for="mail">Email address</label>
                <input type="email" className="form-control" id="mail" placeholder="Enter email" />
            </div>

            <div className="form-group">
                <label for="password">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password" />
            </div>

            <div className="form-group">
                <label for="password">Confirm Password</label>
                <input type="password" className="form-control" id="confirm" placeholder="confirm Password" />
            </div>

            <button type="submit" className="btn btn-primary">sign up</button>
            <Link to="/login" className="btn btn-secondary ml-1">login</Link>

        </form>
)
export default SignUp;