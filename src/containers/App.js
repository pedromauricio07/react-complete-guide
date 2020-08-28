import React, { Component } from 'react';
/* import styled from 'styled-components'; */
/* import logo from './logo.svg'; */
import classes from './App.css';

import Persons from '../components/Persons/Persons';
import UserInput from '../components/UserInput/UserInput';
import UserOutput from '../components/UserOutput/UserOutput';
import TextInput from '../components/TextInput/TextInput';
import TextOutput from '../components/TextOutput/TextOutput';
import ValidationComponent from '../components/ValidationComponent/ValidationComponent';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Auxiliary';
import withClass from '../hoc/withClass';
/* const StyledButton = styled.button`
  background-color: ${(props) => (props.alt ? 'red' : 'green')};
  color: white;
  font: inherit;
  border: 1px solid blue;
  padding: 8px;
  cursor: pointer;
  &:hover {
        background-color: ${(props) => (props.alt ? 'salmon' : 'lightgreen')};
        color: black;
      },
`; */

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
      { id: '111', name: 'Max', age: 28 },
      { id: '222', name: 'Manu', age: 29 },
      { id: '333', name: 'Stephanie', age: 26 },
    ],
    username: 'user',
    showPersons: false,
    showCockpit: true,
    text: '',
    changeCounter: 0,
    authenticated: false,
  };

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  /*   componentWillMount() {
    console.log('[App.js] componentWillMount');
  } */

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((p) => {
      return p.id === id;
    });
    const person = {
      ...this.state.persons[personIndex],
    };
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1,
      };
    });
  };

  deletePersonhandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  usernameChangedHandler = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  textLengthListener = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  loginHandler = () => {
    this.setState({ authenticated: true });
  };

  render() {
    console.log('[App.js] render');
    let persons = null;
    //let btnClasses = [classes.Button];

    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonhandler}
          changed={this.nameChangedHandler}
          isAuthenticated={this.state.authenticated}
        />
      );
    }

    let usernameIO = (
      <div>
        <UserInput
          username={this.state.username}
          changed={this.usernameChangedHandler}
        ></UserInput>
        <UserOutput
          username={this.state.username}
          changed={this.usernameChangedHandler}
        ></UserOutput>
      </div>
    );

    let textIO = (
      <div>
        <TextInput
          text={this.state.text}
          changed={this.textLengthListener}
        ></TextInput>
        <TextOutput
          text={this.state.text}
          changed={this.textLengthListener}
        ></TextOutput>
      </div>
    );

    return (
      <Aux classes={classes.App}>
        <button
          onClick={() => {
            this.setState({ showCockpit: false });
          }}
        >
          Remove Cockpit
        </button>
        {this.state.showCockpit ? (
          <Cockpit
            showPersons={this.state.showPersons}
            personsLength={this.state.persons.length}
            clicked={this.togglePersonsHandler}
            login={this.loginHandler}
          />
        ) : null}
        {persons}
        {usernameIO}
        {textIO}
        <ValidationComponent
          text_length={this.state.text.length}
        ></ValidationComponent>
      </Aux>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default withClass(App, classes.App);
