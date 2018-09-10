import * as React from 'react';
import { ADButtonsComponent } from './manager-AD-buttons/manager-AD-buttons.component';

interface IState {
    reimbs: any[];
    selectedReimb: number;
}

export class ManagerViewPending extends React.Component<any, IState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            reimbs: [],
            selectedReimb: 0,            
        }
    }

    public componentDidMount() {
        fetch('http://localhost:3000/reimbs/pending', {
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

    public rowSelected = (selection: number) => {
        this.setState({
            ...this.state,
            selectedReimb: selection
            }
        )};

    public render() {
        return (
            <div>
                <table className="table table-striped table-dark cl" id="reimb-table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
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
                    <tbody id="reimb-table-body">
                        {
                            this.state.reimbs.map((reimb: any) => (
                                <tr key={reimb.reimb_id} onClick={() => this.rowSelected(reimb.reimb_id)}>
                                    <td>{reimb.reimb_id}</td>
                                    <td>${reimb.reimb_amount}</td>
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
                <p id="selected-reimb">Selected Reimbursement: {this.state.selectedReimb}</p>
                <ADButtonsComponent selectedReimb={this.state.selectedReimb} />
            </div>
        );
    }
}