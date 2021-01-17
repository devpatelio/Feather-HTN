import React from 'react';
import { useHistory, Redirect } from 'react-router-dom';

/* */

  export default function SignOut() {
    let history = useHistory();

    localStorage.removeItem('access')
    localStorage.removeItem('refresh')

    return <Redirect to="/"/>;
  }