import React, { Component } from 'react';
import { withFirebase } from '../firebase';
import * as ROUTES from '../../constants/routes';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>

    <SignUpForm />
  </div>
);
const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};
class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = async (event) => {
    const { username, email, passwordOne } = this.state;
    try {
      await this.props.firebase.doCreateUserWithEmailAndPassword(
        email,
        passwordOne
      );
      this.setState({ ...INITIAL_STATE });
      this.props.history.push(ROUTES.HOME);
    } catch (error) {
      console.log(error);
      this.setState({ error: error });
    }
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '' ||
      passwordOne.length < 6 ||
      passwordTwo.length < 6;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name='username'
          value={username}
          onChange={this.onChange}
          type='text'
          placeholder='Full Name'
        />
        <input
          name='email'
          value={email}
          onChange={this.onChange}
          type='text'
          placeholder='Email Address'
        />
        <input
          name='passwordOne'
          value={passwordOne}
          onChange={this.onChange}
          type='password'
          placeholder='Password'
        />
        <input
          name='passwordTwo'
          value={passwordTwo}
          onChange={this.onChange}
          type='password'
          placeholder='Confirm Password'
        />
        <button disabled={isInvalid} type='submit'>
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);
const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);
export default SignUpPage;

export { SignUpForm, SignUpLink };
