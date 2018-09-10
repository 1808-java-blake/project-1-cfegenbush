import * as React from 'react';
import './App.css';
import './include/bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ManagerComponent } from './components/manager/manager.component';

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <div id="app-main">
          <Switch>                
            <Route path="/sign-in" component={SignInComponent} />
            <Route path="/employee" component={EmployeeComponent} />
            <Route path="/manager" component={ManagerComponent} />
            <Route component={SignInComponent} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
