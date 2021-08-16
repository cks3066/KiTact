import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import {TopMenuComponent} from "./component/TopMenuComponent";
import { Restaurant } from './component/Restaurant';
import MainComponent from './MainComponent';

function App() {
  return (
      <div className="App">
          <div>
            <TopMenuComponent />
            <MainComponent/>
            <Restaurant />
          </div>
      </div>
  );
}

export default App;