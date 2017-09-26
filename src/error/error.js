import React from 'react';
import { Col } from 'react-bootstrap';

const ErrorPage = () => {
  return (
    <div className="errorText">
      <h2>Error</h2>
      <Col xs={12} md={8} mdOffset={2}>
        An error occurred while processing your request. You should call the inferior web developer
        who wrote this shoddy site and give them a piece of your mind!
      </Col>
    </div>
  );
};

export default ErrorPage;
