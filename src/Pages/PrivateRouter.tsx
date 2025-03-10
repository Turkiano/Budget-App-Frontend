import { ReactElement } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';

import { Role } from '../Types/Role';

export function PrivateRouter({ children }: { children: ReactElement }) {
  // logic should be here
  console.log('Global Data, or priavte Router');

  const token = localStorage.getItem('token') || '';

  //02.Decode the token
  const decodedToken = jwtDecode(token);
  const decodedUser: any = {};

  //02.01. To manipulate the decodedToken
  if (decodedToken) {
    for (const [key, value] of Object.entries(decodedToken)) {
      //02.02. resphare the decodedToken
      let cleanKey = '';
      if (key.startsWith('http')) {
        cleanKey = key.split('identity/claims')[1];
      } else {
        cleanKey = key;
      }

      decodedUser[cleanKey] = value;
    }
  }

  //04.Check if user is admin or customer
  return decodedUser.role === Role.Customer ? 
    <Navigate to="/login" />
   : children
  ;
}
