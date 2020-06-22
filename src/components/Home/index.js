import React from 'react';

import { withAuthorization } from '../Session';
function Home() {
  return (
    <div>
      <h1>THis. is home page</h1>
      <p>The Home Page is accessible by every signed in user.</p>
    </div>
  );
}
const condition = (authUser) => authUser != null;
export default withAuthorization(condition)(Home);
