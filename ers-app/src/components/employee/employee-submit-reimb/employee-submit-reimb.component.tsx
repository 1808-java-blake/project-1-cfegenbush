import * as React from 'react';

interface IState {
    reimb: {
        amount: number,
        description: string,
        author: number,
        status: number,        
        type: number,
    },
    errorMessage: string
}
export class EmployeeSubmitReimb extends React.Component <any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            errorMessage: '',
            reimb: {
                amount: 0,                
                author: JSON.parse(localStorage.getItem('user') || '{}').ers_users_id,                
                description: ``,                
                status: 1,                                         
                type: 1
            },        
        }
    }

    public amountChange = (e: any) => {
    this.setState({
        ...this.state,
        reimb: {
        ...this.state.reimb,
        amount: e.target.value
        }
    });
    }
    
    public descriptionChange = (e: any) => {
    this.setState({
        ...this.state,
        reimb: {
        ...this.state.reimb,
        description: e.target.value
        }
    });
    }

    public typeChange = (e: any) => {
    this.setState({
        ...this.state,
        reimb: {
        ...this.state.reimb,
        type: e.target.value
        }
    });
    }

    public submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch('http://localhost:3000/reimbs/submit-reimb', {
            body: JSON.stringify(this.state.reimb),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        })
        .then(resp => {
            console.log(resp.status)
            if (resp.status === 401) {
              this.setState({
                ...this.state,
                errorMessage: 'Invalid something'
              });
            } else if (resp.status === 201) {
              this.props.history.push('/employee-home');  
              return resp.json();
            } else {
              this.setState({
                ...this.state,
                errorMessage: 'Failed to submit reimb at this time'
              });
            }
            throw new Error('Failed to submit reimb');
          })
          .then(resp => {
            if (resp) {
              this.props.history.push('/employee');
            }
          })
          .catch(err => {
            console.log(err);
          });
      }

    public render() {
        const reimb = this.state.reimb;
        return (
            <form className="form-submit-reimb" onSubmit={this.submit}>
                <h1 className="h3 mb-3 font-weight-normal"> Submit a Reimbursement </h1>

                <label htmlFor="inputAmount" className="sr-only">Amount</label>
                <input
                onChange={this.amountChange}
                value={reimb.amount}
                type="text"
                id="inputAmount"
                className="form-control"
                placeholder="Amount"
                required />

                <label htmlFor="inputDescription" className="sr-only">Description</label>
                <textarea
                onChange={this.descriptionChange}
                value={reimb.description}
                id="inputDescription"
                className="form-control"
                placeholder="Description"
                required />

                <label htmlFor="inputType" className="sr-only">Type</label>
                <select onChange={this.typeChange} value={reimb.type}>
                    <option value="1">Lodging</option>
                    <option value="2">Travel</option>
                    <option value="3">Food</option>
                    <option value="4">Other</option>
                </select>

                <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
            </form>
        )
    }
}