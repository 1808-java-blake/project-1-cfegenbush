import * as React from 'react';
import { Link } from 'react-router-dom';
export const EmployeeNav: React.StatelessComponent<{}> = () => {
  return (
    <div>
      <nav className="navbar navbar-toggleable-md navbar-expand-lg navbar-dark bg-dark display-front nav-pad">
        <div className="navbar-header c-pointer shift-left">
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav ml-auto margin-nav">
            <li className="nav-item active">
              <Link to="/employee-home" className="unset-anchor nav-link">Home</Link>
            </li>
            <li className="nav-item active">
              <Link to="/employee-view-history" className="unset-anchor nav-link">View History</Link>
            </li>
            <li className="nav-item active">
              <Link to="/employee-pending" className="unset-anchor nav-link">Pending</Link>
            </li>
            <li className="nav-item active">
              <Link to="/employee-submit-reimb" className="unset-anchor nav-link">Submit Request</Link>
            </li>
            <li className="nav-item active">
              <Link to="/sign-in" className="unset-anchor nav-link">Log Out</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div >
  );
}