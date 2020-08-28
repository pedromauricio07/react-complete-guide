import React, { useEffect, useRef } from 'react';

import classes from './Cockpit.css';

const cockpit = (props) => {
  const toggleBtnRef = useRef(null);

  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    const timer = setTimeout(() => {
      alert('Saved data to cloud');
    }, 1000);
    toggleBtnRef.current.click();
    return () => {
      clearTimeout(timer);
      console.log('[Cockpit.js] cleanup work in useEffect');
    };
  }, [props.persons]);

  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect');
  });

  let btnClasses = [classes.Button];
  if (props.showPersons) {
    btnClasses.push(classes.Red);
  }

  const assignedClasses = [];
  if (props.personsLength <= 2) {
    assignedClasses.push(classes.Red);
  }
  if (props.personsLength <= 1) {
    assignedClasses.push(classes.Bold);
  }

  return (
    <div>
      <h1>Hi, I'm a React App</h1>
      <p className={assignedClasses.join(' ')}>This is really working!</p>
      <button
        ref={toggleBtnRef}
        className={btnClasses.join(' ')}
        alt={props.showPersons ? true.toString() : undefined}
        onClick={props.clicked}
      >
        Toggle Persons
      </button>
      <button onClick={props.login}>Log in</button>
    </div>
  );
};

export default React.memo(cockpit);
