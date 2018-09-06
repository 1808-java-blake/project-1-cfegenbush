import * as React from 'react';

export class ManagerViewPending extends React.Component<any, any> {
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
                        <th scope="col">Author</th>
                        <th scope="col">Resolver</th>
                        <th scope="col">Status</th>
                        <th scope="col">Type</th>
                        <th scope="col">Approve/Deny</th>
                    </tr>
                </thead>
                <tbody id="reimb-table-body">
                    {
                        this.state.reimbs.map((reimb: any) => (
                            <tr key={reimb.reimb_id}>
                                <td>{reimb.reimb_amount}</td>
                                <td>{reimb.reimb_submitted}</td>
                                <td>{reimb.reimb_resolved}</td>
                                <td>{reimb.reimb_description}</td>
                                <td>{reimb.reimb_author}</td>
                                <td>{reimb.reimb_resolver}</td>
                                <td>{reimb.reimb_status_id}</td>
                                <td>{reimb.reimb_type_id}</td>
                                <td><button type="button" className="btn btn-default btn-lg">
                                        <span className="glyphicon glyphicon-ok" aria-hidden="true"></span> ok
                                    </button>
                                    <button type="button" className="btn btn-default btn-lg">
                                        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span> remove
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        );
    }
}