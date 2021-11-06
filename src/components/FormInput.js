import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import DatePicker from 'react-native-datepicker';
import theme from '../theme';

export default ({
  style,
  placeholder,
  autoCapitalize = 'none',
  value,
  onChange,
  date,
  autoCompleteType,
  keyboardType,
  multiline,
  ...rest
}) =>
  !date ? (
    <TextInput
      style={
        !value
          ? [styles.container, style, styles.placeholderStyle]
          : [styles.container, style]
      }
      placeholder={placeholder}
      autoCapitalize={autoCapitalize}
      value={value}
      onChangeText={onChange}
      autoCompleteType={autoCompleteType}
      keyboardType={keyboardType}
      {...rest}
      placeholderTextColor={theme.colors.secondaryColor}
      multiline={multiline}
    />
  ) : (
    <DatePicker
      showIcon={false}
      date={value}
      style={[styles.dateContainer, style]}
      placeholder={placeholder}
      format="YYYY-MM-DD"
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      onDateChange={onChange}
      customStyles={{
        dateText: {
          color: theme.colors.textColor,
        },
        dateInput: {
          borderWidth: 0,
          alignItems: 'flex-start',
             fontFamily: Platform.OS =='android' ? 'GothamLight' : 'Feather',
        },
        placeholderText: {
          paddingStart: 5 * theme.consts.BW,
          color: theme.colors.secondaryColor,
             fontFamily: Platform.OS =='android' ? 'GothamLight' : 'Feather',
          opacity: 0.5,
        },
      }}
      {...rest}
    />
  );

const styles = StyleSheet.create({
  container: {
    textAlign: 'auto',
    marginHorizontal: 20 * theme.consts.BW,
    marginTop: 15 * theme.consts.BW,
    borderColor: theme.colors.secondaryColor,
    borderBottomWidth: 1,
    paddingStart: 5 * theme.consts.BW,
    color: theme.colors.textColor,
       fontFamily: Platform.OS =='android' ? 'GothamLight' : 'Feather',
  },
  dateContainer: {
    marginHorizontal: 20 * theme.consts.BW,
    marginTop: 15 * theme.consts.BW,
    borderColor: theme.colors.secondaryColor,
    borderBottomWidth: 1,
    width: 'auto',
  },
  placeholderStyle: {
    opacity: 0.5,
  },
});
