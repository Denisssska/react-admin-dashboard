import { ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../store/hooks/hooks';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector(state => state.user.currentUser);
  // Add your authentication logic here

  return user !== null ? <>{children}</> : <Navigate to="/login" replace />

  ;
};
export default PrivateRoute;
