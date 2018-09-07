import * as React from 'react';

interface IProps {
    selectedReimb: number;
}

export class ADButtonsComponent extends React.Component<IProps, any> {
    public constructor(props: any) {
        super(props);
    }

    public approve() {
        const approval = {
          author: JSON.parse(localStorage.getItem('user') || '{}').ers_users_id,
          id: this.props.selectedReimb, 
          status: 2};
        fetch('http://localhost:3000/reimbs/update', {
            body: JSON.stringify(approval),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        }).then(resp => {
            console.log(resp.status)
            if (resp.status === 401) {
              this.setState({
                ...this.state,
                errorMessage: 'Invalid something'
              });
            } else if (resp.status === 201) {  
              return resp.json();
            } else {
              this.setState({
                ...this.state,
                errorMessage: 'Failed to update approval at this time'
              });
            }
            throw new Error('Failed to update reimb');
          })
          .then(resp => {
            console.log(resp);
          })
          .catch(err => {
            console.log(err);
          });
      }

    public deny() {
        const denial = {
          author: JSON.parse(localStorage.getItem('user') || '{}').ers_users_id,
          id: this.props.selectedReimb, 
          status: 3};
        fetch('http://localhost:3000/reimbs/update', {
            body: JSON.stringify(denial),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        }).then(resp => {
            console.log(resp.status)
            if (resp.status === 401) {
              this.setState({
                ...this.state,
                errorMessage: 'Invalid something'
              });
            } else if (resp.status === 201) {  
              return resp.json();
            } else {
              this.setState({
                ...this.state,
                errorMessage: 'Failed to update denial at this time'
              });
            }
            throw new Error('Failed to update reimb');
          })
          .then(resp => {
            console.log(resp);
          })
          .catch(err => {
            console.log(err);
          });
      }

    public render() {
        return (
            <div>
                <button type="button" className="btn btn-default btn-lg" onClick={() => this.approve()}>
                    <span className="glyphicon glyphicon-ok" aria-hidden="true"></span> ok
                </button>
                <button type="button" className="btn btn-default btn-lg" onClick={() => this.deny()}>
                    <span className="glyphicon glyphicon-remove" aria-hidden="true"></span> remove
                </button>                
            </div>
        )
    }
}