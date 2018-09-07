import * as React from 'react';
import { ManagerViewUserHistory } from './manager-view-user-history.component';

export class ManagerViewUsers extends React.Component<any, any> {
    public constructor(props: any) {
        super(props);
        this.state = {
            reimbs: [],
            users: []            
        }
    }

    public componentDidMount() {
        fetch('http://localhost:3000/users', {
            credentials: 'include'
        })
        .then(resp => resp.json())
        .then(users => {
            this.setState({users});
        })
        .catch(err => {
            console.log(err);
        })
    }

    public getUserHistory = (selection: number) => {
        fetch(`http://localhost:3000/reimbs/${selection}`, {
            credentials: 'include'
        })
        .then(resp => resp.json())
        .then(reimbs => {
            this.setState({reimbs});
        })
        .catch(err => {
            console.log(err);
        })};

    public render() {
        return (
            <div>
                <table className="table table-striped table-dark cl" id="users-table">
                    <thead>
                        <tr>
                            <th scope="col">Emp #</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                        </tr>
                    </thead>
                    <tbody id="user-table-body">
                        {
                            this.state.users.map((user: any) => (
                                <tr key={user.ers_users_id} onClick={() => this.getUserHistory(user.ers_users_id)}>
                                    <td>{user.ers_users_id}</td>
                                    <td>{user.user_first_name}</td>
                                    <td>{user.user_last_name}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <ManagerViewUserHistory reimbs={this.state.reimbs}/>
            </div>
        );
    }
}