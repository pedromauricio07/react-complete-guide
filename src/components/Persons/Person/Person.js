import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* import styled from 'styled-components'; */

//Aux - wraping component does the same as React.Fragment
import withClass from '../../../hoc/withClass';
import Aux from '../../../hoc/Auxiliary';
import classes from './Person.css';
import AuthContext from '../../../context/auth-context';

/* const StyledDiv = styled.div`
  width: 60%;
  margin: 16px auto;
  border: 1px solid #ccc;
  padding: 16px;
  text-align: center;

  @media (min-width: 500px) {
    width: 450px;
    color: 'blue';
  }
`; */

class Person extends Component {
  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }

  static contextType = AuthContext;

  componentDidMount() {
    this.inputElementRef.current.focus();
    console.log(this.context.authenticated);
  }

  render() {
    return (
      <Aux>
        {this.context.authenticated ? (
          <p>Authenticated</p>
        ) : (
          <p>Please log in</p>
        )}

        <p onClick={this.props.click}>
          I'm {this.props.name} and I'm {this.props.age} years old!
        </p>
        <p>{this.props.children}</p>
        <input
          /* ref={(inputEl) => {
            this.inputElement = inputEl;
          }} */
          ref={this.inputElementRef}
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
      </Aux>
    );
  }
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func,
};

export default withClass(Person, classes.Person);
