import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Animated,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Input} from 'react-native-elements';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker';
import theme from '../theme';
import {bindActionCreators} from 'redux';
import reacttotron from '../redux/Reactotron';
import actions from '../redux/actions';
import {connect} from 'react-redux';
const {logOut, getProfile, setField, updateProfileUser} = actions;
import ImageProf from '../../assets/images/EditProfileimage.svg';
import Edit from '../../assets/images/EditProfile.svg';
import moment from 'moment';
import reactotron from 'reactotron-react-native';

const URL = 'http://services.larsa.io/files/file/';
class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editNameInProgress: false,
      editMobileInProgress: false,
      editBirthdayInProgress: false,
      editCityInProgress: false,
      editCountryInProgress: false,
      keyboardHeight: new Animated.Value(0),
    };
  }
  async componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }
  componentWillUnmount() {
    // this.keyboardDidShowListener.remove();
    // this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = (e) => {
    Animated.timing(this.state.keyboardHeight, {
      toValue: e.endCoordinates.height,
      duration: 100,
    }).start();
  };

  _keyboardDidHide = () => {
    Animated.timing(this.state.keyboardHeight, {
      toValue: 0,
      duration: 100,
    }).start();
  };

  componentDidMount() {
    this.props.getProfile();
  }

  _upload = () => {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        this.props.updateProfileUser({field: 'photo', data: response});
        reacttotron.log('response', response);
      }
    });
  };

  renderEditName = () => {
    if (!this.state.editNameInProgress) {
      return (
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => this.setState({editNameInProgress: true})}
            style={styles.headerCenterName}>
            <Text style={styles.userName} numberOfLines={1}>
              {this.props.profile.firstName} {this.props.profile.lastName}
            </Text>
            <View
              style={{
                paddingHorizontal: 10 * theme.consts.BW,
              }}>
              <Edit height={16} width={16} />
            </View>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <Input
        autoFocus={true}
        inputStyle={styles.inputStyle}
        rightIcon={
          <TouchableOpacity
            onPress={() => {
              this.setState({editNameInProgress: false});
              this.props.updateProfileUser({
                field: 'userName',
              });
            }}>
            <Icon type="material" name="done" color={'#7D7D7D'} size={25} />
          </TouchableOpacity>
        }
        leftIcon={
          <TouchableOpacity
            onPress={() => {
              this.setState({editNameInProgress: false});
            }}>
            <Image
              resizeMode="contain"
              style={[styles.imageHeaderCancel, {tintColor: '#7D7D7D'}]}
              source={require('../../assets/images/cancel.png')}
            />
          </TouchableOpacity>
        }
        inputContainerStyle={[
          styles.inputContainerStyle,
          !this.props.userName && styles.inputContainerErrorStyle,
        ]}
        placeholder="Your name"
        placeholderTextColor="#7D7D7D"
        autoCapitalize="none"
        value={this.props.userName}
        onFocus={() => this.props.setName(this.props.userName)}
        onChangeText={(value) => this.props.setName(value)}
      />
    );
  };

  renderEdit = ({
    defaultValue,
    placeholder,
    active,
    setActive,
    value,
    setValue,
    save,
    onChange,
    keyboardType,
  }) => {
    const renderValueField = () => (
      <>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 40 * theme.consts.BW,
            marginHorizontal: 10 * theme.consts.BW,
            marginTop: 25 * theme.consts.BW,
            borderBottomWidth: 0.5,
          }}>
          <Text style={styles.title}>{placeholder}</Text>
          {placeholder == 'Birthday' ? (
            <>
              <DatePicker
                ref={(component) => (this.datePicker = component)}
                showIcon={defaultValue != '' ? false : true}
                customStyles={{borderWidth: 2}}
                androidMode={'spinner'}
                mode="date"
                hideText={defaultValue != '' ? false : true}
                date={value}
                onDateChange={onChange}
                format={'YYYY-MM-DD'}
              />
            </>
          ) : (
            <TouchableOpacity
              style={styles.imageContainerEdit}
              onPress={() => setActive(true)}>
              {defaultValue != '' ? (
                <Text style={[styles.title, {fontWeight: 'bold'}]}>
                  {defaultValue}
                </Text>
              ) : (
                <Text
                  style={[styles.title, {fontWeight: 'bold', color: 'red'}]}>
                  * Required
                </Text>
              )}
              <Edit height={15} width={15} />
            </TouchableOpacity>
          )}
        </View>
      </>
    );

    const renderInputField = () => (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          height: 40 * theme.consts.BW,
          marginHorizontal: 10 * theme.consts.BW,
          paddingTop: 3 * theme.consts.BW,
          marginTop: 25 * theme.consts.BW,
          borderBottomWidth: 0.5,
        }}>
        <Text style={styles.title}>{placeholder}</Text>
        <View>
          <Input
            autoFocus={true}
            style={{margin: 0, padding: 0}}
            inputStyle={styles.inputProfileStyle}
            inputContainerStyle={styles.inputItemContainerStyle}
            rightIcon={
              <TouchableOpacity
                onPress={() => {
                  setActive(false);
                  save();
                }}>
                <Icon type="material" name="done" color={'#7D7D7D'} size={25} />
              </TouchableOpacity>
            }
            placeholder={placeholder}
            placeholderTextColor="#000"
            autoCapitalize="none"
            value={value}
            onFocus={() => setValue(defaultValue || '')}
            onChangeText={(value) => setValue(value)}
            keyboardType={keyboardType}
          />
        </View>
      </View>
    );

    return (
      <View style={styles.item}>
        {!active ? renderValueField() : renderInputField()}
      </View>
    );
  };

  render() {
    const {profile, isUploadingPhoto, isLoading} = this.props;

    if (isLoading)
      return (
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
            alignItems: 'center',
          }}>
          <ActivityIndicator size={'large'} color={'green'} />
        </View>
      );

    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={styles.headercontainercontent}>
              <Text
                style={{
                  color: '#808080',
                  fontSize: 12 * theme.consts.BW,
                  fontWeight: 'bold',
                }}>
                {this.props.Total == 0 ? 0 : this.props.Total}
              </Text>
              <Text style={{color: '#808080', fontSize: 12 * theme.consts.BW}}>
                total Points
              </Text>
            </View>
            <TouchableOpacity
              style={{
                alignItems: 'flex-end',
                margin: 10,
              }}
              onPress={() => this.props.logOut()}>
              <Text style={{color: '#808080', opacity: 0.8}}>Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: 250 * theme.consts.BW,
            height: 150 * theme.consts.BW,
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.imageContainer}>
            {isUploadingPhoto ? (
              <ActivityIndicator size={'small'} color={'green'} />
            ) : profile.picture ? (
              <Image
                resizeMode="cover"
                style={styles.imageHeaderUser}
                source={{uri: URL + profile.picture}}
              />
            ) : (
              <Icon type="material" name="person" color={'#7D7D7D'} size={70} />
            )}
          </View>
          <TouchableOpacity
            onPress={() => this._upload()}
            style={{
              alignItems: 'flex-end',
              bottom: 95 * theme.consts.BW,
              left: 45 * theme.consts.BW,
            }}>
            <ImageProf height={50} width={50} />
          </TouchableOpacity>
          <View
            style={{
              bottom: 100 * theme.consts.BW,
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {this.renderEditName()}
            </View>
            <Text style={styles.email} numberOfLines={1}>
              {this.props.profile.email}
            </Text>
          </View>
        </View>
        <View style={{marginTop: 30 * theme.consts.BW}}>
          {this.renderEdit({
            keyboardType: 'phone-pad',
            defaultValue: this.props.mobile,
            placeholder: 'Mobile',
            image: require('../../assets/images/cancel.png'),
            active: this.state.editMobileInProgress,
            setActive: (value) => this.setState({editMobileInProgress: value}),
            value: this.props.mobile,
            setValue: (value) => this.props.setMobile(value),
            save: () =>
              this.props.updateProfileUser({
                field: 'meta',
              }),
          })}
          {this.renderEdit({
            defaultValue: this.props.birthday,
            placeholder: 'Birthday',
            image: require('../../assets/images/cancel.png'),
            active: this.state.editBirthdayInProgress,
            setActive: (value) =>
              this.setState({editBirthdayInProgress: value}),
            value: this.props.birthday,
            onChange: (value) => {
              this.props.setBirthday(value),
                this.props.updateProfileUser({
                  field: 'meta',
                });
            },
            save: () =>
              this.props.updateProfileUser({
                field: 'meta',
              }),
          })}
          {this.renderEdit({
            defaultValue: this.props.city,
            placeholder: 'City',
            image: require('../../assets/images/cancel.png'),
            active: this.state.editCityInProgress,
            setActive: (value) => this.setState({editCityInProgress: value}),
            value: this.props.city,
            setValue: (value) => this.props.setCity(value),
            save: () =>
              this.props.updateProfileUser({
                field: 'meta',
              }),
          })}
          {this.renderEdit({
            defaultValue: this.props.country,
            placeholder: 'Country',
            image: require('../../assets/images/cancel.png'),
            active: this.state.editCountryInProgress,
            setActive: (value) => this.setState({editCountryInProgress: value}),
            value: this.props.country,
            setValue: (value) => this.props.setCountry(value),
            save: () =>
              this.props.updateProfileUser({
                field: 'meta',
              }),
          })}
        </View>
        <Animated.View style={{height: this.state.keyboardHeight}} />
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => ({
  profile: state.profile.data,
  isLoading: state.profile.isLoading,
  userName: state.fields.userName,
  mobile: state.fields.mobile,
  birthday: state.fields.birthday,
  city: state.fields.city,
  country: state.fields.country,
  isUploadingPhoto: state.profile.isUploadingPhoto,
  Total: state.home.totalPoints,
});

const mapDispatchToProps = (dispatch) => {
  const setName = (value) => setField({name: 'userName', value});
  const setMobile = (value) => setField({name: 'mobile', value});
  const setBirthday = (value) => setField({name: 'birthday', value});
  const setCity = (value) => setField({name: 'city', value});
  const setCountry = (value) => setField({name: 'country', value});

  return bindActionCreators(
    {
      logOut,
      getProfile,
      setName,
      setMobile,
      setBirthday,
      setCity,
      setCountry,
      updateProfileUser,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    height: 140 * theme.consts.BW,
    backgroundColor: '#F2F2F2',
  },

  headercontainercontent: {
    width: 110 * theme.consts.BW,
    height: 30 * theme.consts.BW,
    backgroundColor: '#B2B3B3',
    borderRadius: 25 * theme.consts.BW,
    padding: 7 * theme.consts.BW,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 15 * theme.consts.BW,
    opacity: 0.8,
  },
  imageContainer: {
    width: 125 * theme.consts.BW,
    height: 125 * theme.consts.BW,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: (130 / 2) * theme.consts.BW,
    borderWidth: 1,
    borderColor: '#FFF',
    alignSelf: 'center',
    bottom: 60 * theme.consts.BW,
    backgroundColor: '#ccc',
  },
  title: {
    color: '#000',
    fontSize: 16 * theme.consts.BW,
    marginEnd: 5 * theme.consts.BW,
  },
  placeholderTitle: {
    fontSize: 16 * theme.consts.BW,
    opacity: 0.25,
  },
  inputProfileStyle: {
    color: '#000000',
    fontSize: 16 * theme.consts.BW,
  },
  inputItemContainerStyle: {
    width: 200 * theme.consts.BW,
    height: 38 * theme.consts.BW,
  },
  item: {
    marginHorizontal: 5 * theme.consts.BW,
    paddingVertical: 10 * theme.consts.BW,
    flexDirection: 'row',
  },
  imageHeaderUser: {
    width: 125 * theme.consts.BW,
    height: 125 * theme.consts.BW,
    borderRadius: 200 * theme.consts.BW,
  },
  headerCenterName: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  userName: {
    fontSize: 18 * theme.consts.BW,
    color: '#000',
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14 * theme.consts.BW,
    color: '#000',
  },
  inputStyle: {
    color: '#7D7D7D',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  imageHeaderCancel: {
    height: 15 * theme.consts.BW,
    width: 15 * theme.consts.BW,
    tintColor: '#7D7D7D',
  },
  imageContainerEdit: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  inputContainerStyle: {
    // borderBottomWidth: 1 * theme.consts.BW,
    // borderBottomColor: '#FFF',
  },
});
