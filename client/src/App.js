import React from 'react';
import { useContext } from "react";

import GlobalStyle from './globalStyles';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Navbar, Footer } from './components';
import Home from './components/pages/HomePage/Home';
import Advisors from './components/pages/Advisors';
import Budget from './components/pages/Budget';
import Asset from './components/pages/Asset';
// import OurTeam from './components/pages/OurTeam';
import SignUp from './components/pages/SignUp';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import NotFound from './components/pages/NotFound';
import ApexCharts from './components/pages/ApexCharts';
import ResourceSearch from './components/pages/ResourceSearch/ResourceSearch';
import AuthenticationContext from './components/auth/AuthenticationContext';
import AuthenticationProvider from './components/auth/AuthenticationProvider';
import SearchForm from './components/NearbySearch/SearchForm';



function App() {
  //const loginContext = useContext(AuthenticationContext);
  // alert("loginContext.isUser()="+ loginContext.isUser())
  return (
    <AuthenticationProvider>
      <Router>
        <GlobalStyle />
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          {/* <Route path='/promotions' exact component={Promotions} /> */}
          <Route path='/advisors' exact component={Advisors} />
          <Route path='/apex-charts' exact component={ApexCharts} />
          <Route path='/map' exact component={ResourceSearch} />
          <Route path='/form' exact component={SearchForm} />
          {/* <Route path='/our-team' exact component={OurTeam} /> */}

          <ConditionalRouteHome condition={()=>{return !UseAuth().isLogedIn()}} 
            path='/login' exact>
              <Login/>
          </ConditionalRouteHome >


          <ConditionalRouteHome condition={()=>{return UseAuth().isLogedIn()}} 
            path='/logout' exact>
              <Logout/>
          </ConditionalRouteHome >

          <ConditionalRoute condition={()=>{return UseAuth().isUser()}}
            path='/budget' exact>
            <Budget />
          </ConditionalRoute>

          <ConditionalRoute condition={()=>{return UseAuth().isUser()}}
            path='/asset' exact>
            <Asset/>
          </ConditionalRoute>


          <ConditionalRoute condition={()=>{const lc = UseAuth(); return !lc.isLogedIn() || lc.isAdmin()}} 
            path='/sign-up' exact>
             <SignUp/>
          </ConditionalRoute >

          <Route path='/notfound' exact component={NotFound} />
          <Route path='*' component={NotFound} />

        </Switch>
        <Footer />
      </Router>
    </AuthenticationProvider>
  );
}

function UseAuth() {
  return useContext(AuthenticationContext);
}


// function PrivateRoute({ children, condition, ...rest }) {
//   return (
//     <Route {...rest} render={({ location }) =>
//         auth.user ? (children) :
//         (<Redirect to={{ pathname: '/login', state: { from: location } }} />)
//       }
//     />
//   )
// }


// function ConditionalRoute3({ condition, component, ...rest }) {
//   alert("component=", component)
//   return (
//     <Route
//       {...rest}
//       render={(location) => {
//         return (
//           condition ?
//             ({ component })
//             :
//             <Redirect to={{ pathname: "/notfound", state: { from: location } }} />
//         )
//       }
//       }
//     />
//   )
// }

// function ConditionalRoute2({ condition, component, path, component2, path2, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={() => {
//         return (
//           condition ?
//             ({ component }, { path })
//             :
//             ({ component: component2 }, { path: path2 })
//         )
//       }
//       }
//     />
//   )
// }


function ConditionalRoute({ children, condition, ...rest }) {
  let condition2 = condition();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        condition2 ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/notfound",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function ConditionalRouteHome({ children, condition, ...rest }) {
  let condition2 = condition();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        condition2 ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}


export default App;
