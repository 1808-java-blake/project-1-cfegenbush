import * as React from 'react';

export class ManagerHome extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: JSON.parse(localStorage.getItem('user') || '{}').user_first_name,
        }
    }

    public render() {
        return (
            <div>
            <h1 id="welcome"> Welcome {this.state.name}! </h1>
            <h5> Use the links above to get started </h5>
            </div>
        )
    }
}