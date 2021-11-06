import React, { Component } from 'react';
import { View } from 'react-native';
import FormButton from './FormButton';
import FormInput from './FormInput';

class Form extends Component {
  state = {
    error: false,
    value: {},
  };

  componentDidMount() {
    const defaultState = {};
    React.Children.forEach(this.props.children, child => {
      if (child.props.hasOwnProperty('id')) {
        if (child.props.hasOwnProperty('defaultValue')) {
          defaultState[child.props.id] = child.props.defaultValue;
        } else if (
          child.type === FormInput
        ) {
          defaultState[child.props.id] = '';
        } else {
          defaultState[child.props.id] = undefined;
        }
      }
    });
    this.setState({ value: defaultState });
  }

  onSend = () => {
    let keys = Object.keys(this.state.value);
    let flag = false;
    keys.forEach(key => {
      if (
        this.state.value[key] === '' ||
        this.state.value[key] === null ||
        this.state.value[key] === undefined
      ) {
        this.setState({ error: true });
        flag = true;
      }
    });
    if (!flag) {
      this.props.onSend(this.state.value);
    }
  };

  render() {
    const children = React.Children.map(this.props.children, child => {
      if (child.type === FormButton) {
        const additionalProps = { onClick: () => this.onSend() };
        return React.cloneElement(child, additionalProps);
      }

      if (!child.props.hasOwnProperty('id')) {
        return child;
      }
      const id = child.props.id;
      const additionalProps = {
        value: this.state.value[id],
        empty:
          (this.state.value[id] === '' ||
            this.state.value[id] === null ||
            this.state.value[id] === undefined) &&
          this.state.error,
        onChange: value =>
          this.setState({ value: { ...this.state.value, [id]: value } }),
      };
      return React.cloneElement(child, additionalProps);
    });

    return <View>{children}</View>;
  }
}

export default Form;
