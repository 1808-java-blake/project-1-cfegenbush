import * as React from 'react';

interface IState {
    id: number
    reimbs: any
}

export class EmployeeViewPending extends React.Component<any,IState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            id: JSON.parse(localStorage.getItem('user') || '{}').ers_users_id,
            reimbs: []
        }

    }

    public componentDidMount() {
        fetch(`http://localhost:3000/reimbs/pending/userid=${this.state.id}`, {
            credentials: 'include'
        })
        .then(resp => resp.json())
        .then(reimbs => {
            this.setState({reimbs});
        })
        .catch(err => {
            console.log(err);
        })
    }

    public render() {
        return (
            <table className="table table-striped table-dark cl" id="employee-pending-table">
                <thead>
                    <tr>
                        <th scope="col">Amount</th>
                        <th scope="col">Date Submitted</th>            
                        <th scope="col">Description</th>
                        <th scope="col">Status</th>
                        <th scope="col">Type</th>
                    </tr>
                </thead>
                <tbody id="employee-pending-table-body">
                    {
                        this.state.reimbs.map((reimb: any) => (
                            <tr key={reimb.reimb_id}>
                                <td>{reimb.reimb_amount}</td>
                                <td>{reimb.reimb_submitted}</td>                                
                                <td>{reimb.reimb_description}</td>                                                                
                                <td>{reimb.reimb_status_id}</td>
                                <td>{reimb.reimb_type_id}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        );
    }
}