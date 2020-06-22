import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';

export default function Navigation() {
  return (
    <AuthUserContext.Consumer>
      {(authUser) =>
        authUser ? <NavigationWithAuth /> : <NavigationWithNonAuth />
      }
    </AuthUserContext.Consumer>
  );
}

function NavigationWithAuth() {
  return (
    <ul>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>

      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>

      <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li>
      <li>
        <SignOutButton />
      </li>
    </ul>
  );
}
function NavigationWithNonAuth() {
  return (
    <ul>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
      </li>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
    </ul>
  );
}
