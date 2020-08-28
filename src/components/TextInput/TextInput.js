import React from 'react';

const textInput = (props) => {
  return (
    <div>
      <input type="text" onChange={props.changed} value={props.text} />
    </div>
  );
};

export default textInput;
