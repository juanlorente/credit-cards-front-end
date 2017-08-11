import React from 'react';
import PropTypes from 'prop-types';

const Message = ({isVisible, state, messages, size, isPageMessage}) => {
  const classValue = `message-${state} ${isVisible ? '' : 'message-hidden'} message-size${size || 2}
    ${isPageMessage ? 'page-message' : ''}`;
  return (
    <div className={classValue}>
    {
      messages.map((message) => {
        return <div key={message}>{message}</div>;
      })
    }
    </div>
  );
};

Message.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  state: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  size: PropTypes.number,
  isPageMessage: PropTypes.bool
};

export default Message;
