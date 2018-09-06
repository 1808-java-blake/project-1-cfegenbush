import * as React from 'react';
import { ManagerNav } from './manager-nav/manager-nav.component';
import { ManagerHome } from './manager-home/manager-home.component';
import { ManagerViewUsers } from './manager-view-users/manager-view-users.component';
import { ManagerViewPending } from './manager-pending/manager-pending.component';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export class ManagerComponent extends React.Component {

    public render() {
        return (
            <BrowserRouter>
                <div>
                    <ManagerNav />
                    <div id="main-content-container">
                        <Switch>
                            <Route path="/manager-home" component={ManagerHome} />
                            <Route path="/manager-view-users" component={ManagerViewUsers} />
                            <Route path="/manager-view-pending" component={ManagerViewPending} />                                                        
                        </Switch>
                        <p> Manager component needs to route manager components</p>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}