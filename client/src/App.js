import React from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import routes from "./config/routes";

import './App.scss'
import 'react-toastify/dist/ReactToastify.css'
import AuthProvider from "./providers/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {routes.map((route, index) => (
                <Route 
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  element={<route.component />}
                />
          ))}
        </Routes>
      </Router>
    </AuthProvider>

  );
}
export default App;
