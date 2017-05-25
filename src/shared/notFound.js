import React from 'react';
import { Link } from 'react-router-dom';

export default class NotFound extends React.Component {
  render() {
    return (
      <div style={{textAlign:'center'}}>
        <p>This URL is invalid. Try a new URL or go to the <Link to="/">Home page</Link></p>
      </div>
    );
  }
}
