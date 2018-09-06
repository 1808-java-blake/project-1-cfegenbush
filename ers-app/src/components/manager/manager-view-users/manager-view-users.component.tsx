import * as React from 'react';

export class ManagerViewUsers extends React.Component<any, any> {
    public constructor(props: any) {
        super(props);
        this.state = {
            users: [],
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

    public render() {
        return (
            <table className="table table-striped table-dark cl" id="reimb-table">
                <thead>
                    <tr>
                        <th scope="col">Emp #</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                    </tr>
                </thead>
                <tbody id="reimb-table-body">
                    {
                        this.state.users.map((user: any) => (
                            <tr key={user.ers_user_id}>
                                <td>{user.user_first_name}</td>
                                <td>{user.user_last_name}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        );
    }
}