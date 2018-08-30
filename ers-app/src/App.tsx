import * as React from 'react';
import './App.css';
import './include/bootstrap';
import { AppNav } from './components/nav/nav.component';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ClickerComponent } from './components/clicker/clicker.component';
import { ReimbsComponent } from './components/reimbs/reimb.component';
import { HomeComponent } from './components/home/home.component';

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <div>
          <AppNav />
          <div id="main-content-container">
            <Switch>                
              <Route path="/sign-in" component={SignInComponent} />
              <Route path="/clicker" component={ClickerComponent} />
              <Route path="/home" component={HomeComponent} />
              <Route path="/reimbs" component={ReimbsComponent} />                            
              <Route component={SignInComponent} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
