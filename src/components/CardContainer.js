import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import theme from '../theme';
import Page from './Page';
import {requestPermissionCamera} from '../services/files';
import ImagePicker from 'react-native-image-crop-picker';
import FileSystem from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import Share from 'react-native-share';
import uuid from 'uuid';
import {Icon} from 'react-native-elements';
import Modal from 'react-native-modal';
import reacttotron from '../redux/Reactotron';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withNavigation} from 'react-navigation';
import actions from '../redux/actions';
const {uploadPhoto, fetchDashbord, sendDocument, fetchActivity} = actions;
import CloseImage from '../../assets/images/close.svg';
import Camera from '../../assets/images/Camera.svg';
import Callary from '../../assets/images/callary.svg';
import RewardAgree from '../../assets/images/RewardsAgree.svg';
import profile from '../redux/actions/groups/profile';
class CardContainer extends React.Component {
  state = {
    isModalVisible: false,
    isPhotoVisible: false,
    fileData: null,
    agreeModal: false,
    PointsEarn: null,
    TitleSelected: null,
    ActivityType: null,
    imageIcon: null,
  };
  componentDidMount() {
    this.props.fetchDashbord();
    this.props.fetchActivity({userId: this.props.profile._id});
  }
  renderPhoto() {
    return (
      <Modal
        coverScreen={true}
        style={{
          backgroundColor: '#fff',
          margin: 0,
          opacity: 0.8,
        }}
        animationType="slide"
        transparent={true}
        isVisible={this.state.isPhotoVisible}
        onRequestClose={() => {}}>
        <View style={{flex: 1}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{
                uri: 'data:image/jpeg;base64,' + this.state.fileData,
              }}
              style={{
                width: '80%',
                height: '80%',
                marginHorizontal: 3 * theme.consts.BW,
              }}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                this.setState({
                  fileData: null,
                  file: null,
                  isPhotoVisible: false,
                });
              }}>
              <Icon
                type="font-awesome"
                name="times"
                color="#107AE3"
                size={30}
                reverseColor="#fff"
                reverse={true}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                this.setState({agreeModal: true, isPhotoVisible: false});
                this.props.uploadPhoto({
                  field: 'photo',
                  data: this.state.file,
                });
              }}>
              <Icon
                type="material-community"
                name="send"
                color="#107AE3"
                size={30}
                reverseColor="#fff"
                reverse={true}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
  RewardModal() {
    return (
      <Modal
        coverScreen={true}
        style={{
          backgroundColor: '#fff',
          margin: 0,
          opacity: 0.9,
          justifyContent: 'space-between',
        }}
        animationType="slide"
        transparent={true}
        isVisible={this.state.agreeModal}
        onRequestClose={() => {}}>
        <View style={{alignItems: 'center', marginTop: 100 * theme.consts.BW}}>
          <View
            style={{
              marginBottom: 20 * theme.consts.BW,
              borderWidth: 2 * theme.consts.BW,
              borderRadius: 100 * theme.consts.BW,
              borderColor: '#8DC965',
            }}>
            <Image
              resizeMode="center"
              style={{
                width: 160 * theme.consts.BW,
                height: 160 * theme.consts.BW,
              }}
              source={require('../../assets/images/agreemodalimage.png')}
            />
          </View>
          <View style={{marginTop: 40 * theme.consts.BW}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 24 * theme.consts.BW,
                color: '#808080',
                fontWeight: 'bold',
              }}>
              GREAT WORK
            </Text>
          </View>
          <View style={{marginTop: 40 * theme.consts.BW}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 22 * theme.consts.BW,
                color: '#8DC965',
                fontWeight: 'bold',
              }}>
              THANK YOU FOR BEING ENVIRONMENTALLY CONSCIOUS!
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => (
            this.props.sendDocument({
              formData: {
                title: this.state.TitleSelected,
                earnPoints: this.state.PointsEarn,
                name: this.state.ActivityType,
                image: this.state.imageIcon,
                createdBy: this.props.profile._id,
                camera: this.props.ImageID.path,
                doneby: this.props.profile.firstName +'' + this.props.profile.lastName,
              },
            }),
            this.setState({
              agreeModal: false,
              title: null,
              earnPoints: null,
              name: null,
              imageIcon: null,
            })
          )}
          style={{
            backgroundColor: '#107ae3',
            width: '100%',
            height: 80 * theme.consts.BW,
            justifyContent: 'center',
            alignContent: 'flex-end',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 26 * theme.consts.BW,
              color: '#fff',
            }}>
            CONTINUE
          </Text>
        </TouchableOpacity>
      </Modal>
    );
  }
  renderDocumentFile() {
    return (
      <Modal
        coverScreen={true}
        style={{
          backgroundColor: '#fff',
          margin: 0,
          opacity: 0.9,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 50 * theme.consts.BW,
        }}
        animationType="slide"
        transparent={true}
        isVisible={this.state.isModalVisible}
        onRequestClose={() => {}}>
        {this.props.profile.meta.length == 4 ? (
          <View style={{}}>
            <View style={{opacity: 1}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 26 * theme.consts.BW,
                  color: '#8DC965',
                  fontWeight: 'bold',
                }}>
                {this.state.TitleSelected}
              </Text>
            </View>
            <View style={{}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16 * theme.consts.BW,
                  color: '#808080',
                }}>
                {this.state.ActivityType}
              </Text>
            </View>

            <View style={{marginTop: 100 * theme.consts.BW}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{alignItems: 'center'}}
                  onPress={() => {
                    this.handleCamer(), this.setState({isModalVisible: false});
                  }}>
                  <Camera height={75} width={75} />
                  <Text style={{color: '#107AE3'}}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{alignItems: 'center'}}
                  onPress={() => {
                    this.handleCallary(),
                      this.setState({isModalVisible: false});
                  }}>
                  <Callary height={75} width={75} />
                  <Text style={{color: '#107AE3'}}>Attachment</Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  alignItems: 'center',
                  marginTop: 100 * theme.consts.BW,
                }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    this.setState({
                      isModalVisible: false,
                      ActivityType: null,
                      TitleSelected: null,
                    });
                  }}>
                  <CloseImage height={50} width={50} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{top: 50 * theme.consts.BW}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14 * theme.consts.BW,
                  color: '#808080',
                }}>
                Note : We have the authority of using all images added with your
                consent
              </Text>
            </View>
          </View>
        ) : (
          <View style={{}}>
            <View style={{opacity: 1}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 30 * theme.consts.BW,
                  color: 'red',
                  fontWeight: 'bold',
                }}>
                Please Complete Your
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 28 * theme.consts.BW,
                  color: 'red',
                  fontWeight: 'bold',
                }}>
                Profile Information To Take Actions
              </Text>
            </View>

            <View style={{marginTop: 100 * theme.consts.BW}}>
              <View
                style={{
                  alignItems: 'center',
                  marginTop: 100 * theme.consts.BW,
                }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    this.props.navigation.navigate('Profile');
                    this.setState({
                      isModalVisible: false,
                      ActivityType: null,
                      TitleSelected: null,
                    });
                  }}>
                  <CloseImage height={50} width={50} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Modal>
    );
  }
  handleCallary = async () => {
    try {
      let res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      if (res) {
        await FileSystem.readFile(res.uri, 'base64').then((data) => {
          this.setState({fileData: data, file: res, isPhotoVisible: true});
        });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };
  handleCamer = async () => {
    const granted = await requestPermissionCamera();
    if (!granted) {
      return;
    }
    let res = await ImagePicker.openCamera({
      width: 200,
      height: 300,
      cropping: true,
    });
    if (res) {
      await FileSystem.readFile(res.path, 'base64').then((data) => {
        this.setState({
          fileData: data,
          file: res,
          isPhotoVisible: true,
        });
      });
    }
  };
  share = ({tit}) => {
    
    const url = 'https://play.google.com/store/apps/details?id=com.badr';
    const title =
      'Hello everyone! I am using BAADR App by Environment Agency Abu Dhabi - I help to protect the Environment and I get free vouchers for coffees and restaurants. I just completed this action  ' +
      tit +
      ' and gained points. It’s totally free and many exciting vendors are supporting the App. Check it out';
    const message = 'Please check this out.';
    const options = Platform.select({
      default: {
        title,
        subject: message,
        message: `${title} ${url}`,
      },
    });
    Share.open(options)
      .then((res) => {})
      .catch((err) => {
        err && console.log(err);
      });
  };
  render() {
    const data = this.props.dashbord;
    const id = this.props.id;

    return (
      <>
        {this.renderDocumentFile()}
        {this.renderPhoto()}
        {this.RewardModal()}
        <Page
          isLoading={this.props.isFethingDashbord}
          isError={this.props.isFethingDashbordError}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            {data
              .filter((item) => item.filter === id)
              .map((item) => {
                return (
                  <ScrollView style={{flex: 1}}>
                    <View style={[styles.containerStyle]}>
                      <View style={styles.battelcontainer}>
                        <Image
                          source={{
                            uri:
                              'http://services.larsa.io/files/file/' + item.img,
                          }}
                          resizeMode="center"
                          style={styles.imagebattel}
                        />
                      </View>
                      <View style={styles.textcontainer}>
                        <View>
                          <Text style={styles.titlestyle}>{item.title}</Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <TouchableOpacity>
                              <Image
                                source={require('../../assets/images/type.png')}
                                resizeMode="contain"
                                style={{
                                  height: 13 * theme.consts.BW,
                                  width: 15 * theme.consts.BW,
                                }}
                              />
                            </TouchableOpacity>
                            <Text
                              numberOfLines={2}
                              style={{
                                fontSize: 12 * theme.consts.BW,
                                color: '#808080',
                                width: 120 * theme.consts.BW,
                              }}>
                              {item.type}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                paddingHorizontal: 3 * theme.consts.BW,
                              }}>
                              <Text
                                style={{
                                  fontSize: 20 * theme.consts.BW,
                                  fontWeight: 'bold',
                                  color: '#DF6324',
                                }}>
                                {item.points}
                              </Text>
                            </View>
                            <View style={{flexDirection: 'column'}}>
                              <Text
                                style={{
                                  fontSize: 10 * theme.consts.BW,
                                  color: '#808080',
                                }}>
                                Earn
                              </Text>
                              <Text
                                style={{
                                  fontSize: 10 * theme.consts.BW,
                                  color: '#808080',
                                }}>
                                {item.points == 1 ? 'Point' : 'Points'}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={() => (
                            this.setState({
                              TitleSelected: item.title,
                            }),
                            this.share({tit: item.title})
                          )}>
                          <Image
                            source={require('../../assets/images/share.png')}
                            resizeMode="center"
                            tintColor="grey"
                            style={{
                              height: 40 * theme.consts.BW,
                              width: 40 * theme.consts.BW,
                            }}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({
                              isModalVisible: true,
                              PointsEarn: item.points,
                              TitleSelected: item.title,
                              ActivityType: item.type,
                              imageIcon:
                                'http://services.larsa.io/files/file/' +
                                item.img,
                            })
                          }>
                          <Image
                            source={require('../../assets/images/agree.png')}
                            resizeMode="center"
                            style={{
                              height: 40 * theme.consts.BW,
                              width: 40 * theme.consts.BW,
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ScrollView>
                );
              })}
          </View>
        </Page>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isFethingDashbord: state.home.isFethingDashbord,
  isFethingDashbordError: state.home.isFethingDashbordError,
  dashbord: state.home.dashbord,
  ImageID: state.home.data,
  profile: state.profile.data,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {uploadPhoto, fetchDashbord, sendDocument, fetchActivity},
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(CardContainer));

const styles = StyleSheet.create({
  text: {
    fontSize: 18 * theme.consts.BW,
    color: '#808080',
    fontFamily: Platform.OS == 'android' ? 'GothamLight' : 'Feather',
    padding: 10 * theme.consts.BW,
    fontWeight: 'bold',
  },
  textcontainer: {
    justifyContent: 'space-around',
    height: 100 * theme.consts.BW,
    width: 225 * theme.consts.BW,
  },
  image: {
    height: 30 * theme.consts.BW,
    tintColor: '#fff',
  },
  titlestyle: {
    fontSize: 16 * theme.consts.BW,
    fontFamily: Platform.OS == 'android' ? 'GothamLight' : 'Feather',
    color: '#00A650',
  },
  containerStyle: {
    borderWidth: 0.5 * theme.consts.BW,
    borderRadius: 2 * theme.consts.BW,
    borderColor: '#8DC965',
    elevation: 0.4 * theme.consts.BW,
    marginTop: 10 * theme.consts.BW,
    flexDirection: 'row',
    width: 380 * theme.consts.BW,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10 * theme.consts.BW,
  },
  battelcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8DC965',
    borderRadius: 50 * theme.consts.BW,
    height: 70 * theme.consts.BW,
    width: 70 * theme.consts.BW,
  },
  imagebattel: {height: 50 * theme.consts.BW, width: 30 * theme.consts.BW},
});
