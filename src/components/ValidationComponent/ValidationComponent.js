import React from 'react';

const validationComponent = (props) => {
  let text = '';
  if (props.text_length < 5) {
    text = (
      <div>
        <p>Text too short</p>
      </div>
    );
  } else {
    text = (
      <div>
        <p>Text long enough</p>
      </div>
    );
  }

  return text;
};

export default validationComponent;
