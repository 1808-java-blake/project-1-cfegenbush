import * as React from 'react';

interface IState {
    reimbs: any
}

export class EmployeeViewHistory extends React.Component<any, IState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            reimbs: [],
        }
    }

    public componentDidMount() {
        fetch('http://localhost:3000/reimbs', {
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
            <table className="table table-striped table-dark cl" id="reimb-table">
                <thead>
                    <tr>
                        <th scope="col">Amount</th>
                        <th scope="col">Date Submitted</th>
                        <th scope="col">Date Resolved</th>
                        <th scope="col">Description</th>
                        <th scope="col">Resolver</th>
                        <th scope="col">Status</th>
                        <th scope="col">Type</th>
                    </tr>
                </thead>
                <tbody id="reimb-table-body">
                    {
                        this.state.reimbs.map((reimb: any) => (
                            <tr key={reimb.reimb_id}>
                                <td>${reimb.reimb_amount}</td>
                                <td>{reimb.reimb_submitted}</td>
                                <td>{reimb.reimb_resolved}</td>
                                <td>{reimb.reimb_description}</td>                                
                                <td>{reimb.reimb_resolver}</td>
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