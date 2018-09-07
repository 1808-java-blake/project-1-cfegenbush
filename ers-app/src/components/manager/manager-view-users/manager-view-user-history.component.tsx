import * as React from 'react';

interface IProps {
    reimbs: any[]
}

export class ManagerViewUserHistory extends React.Component<IProps, any> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <table className="table table-striped table-dark cl" id="user-history-table">
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
                    </tr>
                </thead>
                <tbody id="user-history-table-body">
                    {
                        this.props.reimbs.map((reimb: any) => (
                            <tr key={reimb.reimb_id}>
                                <td>{reimb.reimb_amount}</td>
                                <td>{reimb.reimb_submitted}</td>
                                <td>{reimb.reimb_resolved}</td>
                                <td>{reimb.reimb_description}</td>
                                <td>{reimb.reimb_author}</td>
                                <td>{reimb.reimb_resolver}</td>
                                <td>{reimb.reimb_status_id}</td>
                                <td>{reimb.reimb_type_id}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }
}