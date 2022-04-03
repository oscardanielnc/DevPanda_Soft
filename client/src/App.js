import React from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import routes from "./config/routes";

import './App.scss'

function App() {
  return (
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
  );
}
export default App;
