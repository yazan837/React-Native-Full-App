import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  FlatList,
  Platform,
  BackHandler,
} from 'react-native';
import theme from '../theme';
import reacttotron from '../redux/Reactotron';
import Share from 'react-native-share';
import {Icon} from 'react-native-elements';
import Modal from 'react-native-modal';
import {requestPermissionCamera} from '../services/files';
import ImagePicker from 'react-native-image-crop-picker';
import FileSystem from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import CloseImage from '../../assets/images/close.svg';
import Camera from '../../assets/images/Camera.svg';
import Callary from '../../assets/images/callary.svg';
import Filter from '../../assets/images/Filter.svg';
import {Dropdown} from 'react-native-material-dropdown-v2';
import {withNavigation} from 'react-navigation';
import RewardAgree from '../../assets/images/RewardsAgree.svg';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import actions from '../redux/actions';
const {uploadPhoto, fetchAllactivity, sendDocument, fetchActivity} = actions;
class ActivitesCard extends React.Component {
  state = {
    isModalVisible: false,
    isPhotoVisible: false,
    fileData: null,
    agreeModal: false,
    PointsEarn: null,
    TitleSelected: null,
    ActivityType: null,
    imageIcon: null,
    refreshing: false,
    ShowFilter: false,
    activityID: null,
    congratulation: false,
  };

  componentDidMount() {
    this.props.fetchActivity({userId: this.props.profile._id});
    this.setState({ShowFilter: false});
  }
  componentDidUpdate() {
    BackHandler.addEventListener('backPress', () => {
      this.setState({ShowFilter: false});
      return true;
    });
  }
  // componentWillUnmount() {
  //   BackHandler.removeEventListener('backPress');
  // }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.props.fetchAllactivity();
    this.setState({refreshing: false});
  };
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
                doneby:
                  this.props.profile.firstName +
                  '' +
                  this.props.profile.lastName,
              },
            }),
            this.setState({
              agreeModal: false,
              title: null,
              earnPoints: null,
              name: null,
              imageIcon: null,
              congratulation: this.props.total >= 1000000 ? true : false,
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
  CongratModal() {
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
        isVisible={this.state.congratulation}
        onRequestClose={() => {}}>
        <View style={{alignItems: 'center', marginTop: 100 * theme.consts.BW}}>
          <Image
            resizeMode="center"
            style={{
              width: 300 * theme.consts.BW,
              height: 300 * theme.consts.BW,
            }}
            resizeMode="stretch"
            source={require('../../assets/images/congratulations.jpg')}
          />

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
          onPress={() =>
            this.setState({
              congratulation: false,
            })
          }
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
                    this.setState({isModalVisible: false});
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
    const url =
      'https://play.google.com/store/apps/https://www.larsa.org?id=com.badr';
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
  renderItem = ({item}) => {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={[styles.containerStyleitem, {backgroundColor: item.bg_color}]}
          onPress={() =>
            this.setState({
              ShowFilter: true,
              activityID: item.id,
            })
          }>
          <View style={styles.cat_container}>
            <Image
              source={{
                uri: 'http://services.larsa.io/files/file/' + item.image,
              }}
              style={{
                height: 60 * theme.consts.BW,
                width: 60 * theme.consts.BW,
              }}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 25 * theme.consts.BW,
            }}>
            <Text style={{color: '#fff', fontSize: 16 * theme.consts.BW}}>
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  fitertext = () => {
    return (
      <View style={styles.content}>
        <Filter style={styles.filterimage2} />
        <Text style={{color: '#fff', fontSize: 20 * theme.consts.BW}}>ALL</Text>
      </View>
    );
  };
  render() {
    const {data} = this.props;
    const {total} = this.props;
    const {cat} = this.props;

    return (
      <>
        {!this.state.ShowFilter ? (
          <View style={{flex: 1}}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 15 * theme.consts.BW,
              }}>
              <Text
                style={{
                  fontSize: 22 * theme.consts.BW,
                  color: '#8DC965',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                CHOOSE AN ACTION YOU
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                margin: 0 * theme.consts.BW,
              }}>
              <Text
                style={{
                  fontSize: 22 * theme.consts.BW,
                  color: '#8DC965',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                WOULD TO PERFORM
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20 * theme.consts.BW,
              }}>
              <Text
                style={{
                  fontSize: 14 * theme.consts.BW,
                  textAlign: 'center',
                  color: '#808080',
                }}>
                Select from one of the below categories, and pick the
              </Text>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 14 * theme.consts.BW,
                  textAlign: 'center',
                  color: '#808080',
                }}>
                action you would like to perform
              </Text>
            </View>
            <FlatList
              data={cat}
              renderItem={this.renderItem}
              keyExtractor={(_, index) => index.toString()}
              numColumns={2}
            />
          </View>
        ) : (
          <>
            {this.renderDocumentFile()}
            {this.renderPhoto()}
            {this.RewardModal()}
            {total >= 10 && this.CongratModal()}
            <View style={styles.rowfilter}>
              <TouchableOpacity style={styles.filterborder}>
                <Filter style={styles.filterimage} />
                <Text style={{color: '#fff', fontSize: 12 * theme.consts.BW}}>
                  FILTER
                </Text>
                <View
                  style={{
                    position: 'absolute',
                  }}>
                  <Dropdown
                    pickerStyle={styles.rowfilterList}
                    data={[{value: 'ALL'}]}
                    width={50}
                    labelExtractor={(label) => this.fitertext({label})}
                    value={this.state.UserId}
                    onChangeText={(val) => this.setState({ShowFilter: false})}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.filterbordermain}
                onPress={() =>
                  this.setState({
                    ShowFilter: false,
                  })
                }>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 20 * theme.consts.BW,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    width: 150 * theme.consts.BW,
                  }}>
                  Main Actions
                </Text>
                <View
                  style={{
                    position: 'absolute',
                  }}></View>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 14 * theme.consts.BW,
                    fontWeight: 'bold',
                    marginHorizontal: 3 * theme.consts.BW,
                  }}>
                  {total == 0 ? 0 : total}
                </Text>
                <Text style={{color: '#fff', fontSize: 14 * theme.consts.BW}}>
                  total Points
                </Text>
              </View>
            </View>
            <ScrollView
              style={{backgroundColor: '#FFFFFF'}}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => this._onRefresh()}
                />
              }>
              <View style={{alignItems: 'center'}}>
                {data
                  .filter(
                    (item) => item.category_activity === this.state.activityID,
                  )
                  .map((item) => {
                    return (
                      <TouchableOpacity
                        style={styles.containerStyle}
                        onPress={() =>
                          this.setState({
                            isModalVisible: true,
                            PointsEarn: item.points,
                            TitleSelected: item.title,
                            ActivityType: item.type,
                            imageIcon:
                              'http://services.larsa.io/files/file/' +
                              item.image,
                          })
                        }>
                        <View style={{flexDirection: 'column'}}>
                          <View style={styles.battelcontainer}>
                            <Image
                              source={{
                                uri:
                                  'http://services.larsa.io/files/file/' +
                                  item.image,
                              }}
                              resizeMode="center"
                              style={{
                                height: 40 * theme.consts.BW,
                                width: 25 * theme.consts.BW,
                                tintColor: 'white',
                              }}
                            />
                          </View>
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
                              {/* <TouchableOpacity>
                                <Image
                                  // source={require('../../assets/images/type.png')}
                                  resizeMode='contain'
                                  style={{
                                    height: 13 * theme.consts.BW,
                                    width: 15 * theme.consts.BW,
                                  }}
                                />
                              </TouchableOpacity> */}
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
                                    fontSize: 18 * theme.consts.BW,
                                    fontWeight: 'bold',
                                    color: '#DF6324',
                                  }}>
                                  {item.points}
                                </Text>
                              </View>
                              <View style={{flexDirection: 'column'}}>
                                <Text
                                  style={{
                                    fontSize: 14 * theme.consts.BW,
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
                                  item.image,
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
                      </TouchableOpacity>
                    );
                  })}
              </View>
            </ScrollView>
          </>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  profile: state.profile.data,
  ImageID: state.home.data,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {uploadPhoto, fetchAllactivity, sendDocument, fetchActivity},
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(ActivitesCard));

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: '#808080',
    fontFamily: Platform.OS == 'android' ? 'GothamLight' : 'Feather',
    padding: 10,
  },
  image: {
    height: 30 * theme.consts.BW,
    tintColor: '#fff',
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
  textcontainer: {
    justifyContent: 'space-around',
    height: 100 * theme.consts.BW,
    width: 225 * theme.consts.BW,
  },
  titlestyle: {
    fontSize: 16 * theme.consts.BW,
    fontFamily: Platform.OS == 'android' ? 'GothamLight' : 'Feather',
    color: '#00A650',
  },
  rowfilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#00a650',
    width: 400 * theme.consts.BW,
    height: 40 * theme.consts.BW,
    padding: 10 * theme.consts.BW,
    margin: 10 * theme.consts.BW,
    borderRadius: 25 * theme.consts.BW,
  },
  rowfilterList: {
    backgroundColor: '#00a650',
    alignSelf: 'center',
    width: 405 * theme.consts.BW,
    height: 120 * theme.consts.BW,
    borderRadius: 25 * theme.consts.BW,
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterborder: {
    flexDirection: 'row',
    borderRadius: 25 * theme.consts.BW,
    backgroundColor: '#00a670',
    width: 80 * theme.consts.BW,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterbordermain: {
    flexDirection: 'row',
    borderRadius: 25 * theme.consts.BW,
    backgroundColor: '#00a670',
    width: 150 * theme.consts.BW,
    alignItems: 'center',
    justifyContent: 'center',
    marginStart: 15 * theme.consts.BW,
  },
  filterimage: {
    height: 15 * theme.consts.BW,
    width: 15 * theme.consts.BW,
  },
  filterimage2: {
    height: 20 * theme.consts.BW,
    width: 20 * theme.consts.BW,
  },
  containerStyleitem: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20 * theme.consts.BW,
    width: 175 * theme.consts.BW,
    height: 140 * theme.consts.BW,
  },
  cat_container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60 * theme.consts.BW,
    width: 60 * theme.consts.BW,
  },
});
