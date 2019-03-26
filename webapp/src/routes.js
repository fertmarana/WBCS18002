import React from 'react';

const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
const FindAirports = React.lazy(() => import('./views/Airports/FindAirports'));
const Routes = React.lazy(() => import('./views/Routes/Routes'));
const AirportRoute = React.lazy(() => import('./views/Routes/AirportRoute'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/airports/:id/routes', exact:true , name: 'Routes', component: Routes },
  { path: '/airports/:id/routes/:destination', name: 'AirportRoute', component: AirportRoute },
  { path: '/find-airports', exact: true, name: 'FindAirports', component: FindAirports   },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
];

export default routes;
