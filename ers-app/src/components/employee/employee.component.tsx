import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { EmployeeHome } from './employee-home/employee-home';
import { EmployeeViewHistory } from './employee-history/employee-view-history';
import { EmployeeViewPending } from './employee-pending/employee-view-pending.component';
import { EmployeeSubmitReimb } from './employee-submit-reimb/employee-submit-reimb.component';
import { EmployeeNav } from './employee-nav/employee-nav.component';

export class EmployeeComponent extends React.Component {

    public render() {
        return (
            <BrowserRouter>
                <div>
                    <EmployeeNav />
                    <div id="main-content-container">
                        <Switch>
                            <Route path="/employee-home" component={EmployeeHome} />
                            <Route path="/employee-view-history" component={EmployeeViewHistory} />
                            <Route path="/employee-pending" component={EmployeeViewPending} />
                            <Route path="/employee-submit-reimb" component={EmployeeSubmitReimb} />                        
                        </Switch>
                        <p> Employee component routes employee components</p>            
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}