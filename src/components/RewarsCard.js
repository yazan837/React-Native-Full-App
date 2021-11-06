import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  BackHandler,
} from 'react-native';
import theme from '../theme';
import {withNavigation} from 'react-navigation';
import Modal from 'react-native-modal';
import reacttotron from '../redux/Reactotron';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Dropdown} from 'react-native-material-dropdown-v2';
import actions from '../redux/actions';
const {sendDocument, takeAward, setField} = actions;
import Spon from '../../assets/images/RewardsCategoryImage.svg';
import Spoon from '../../assets/images/spoon1.svg';
import {NavigationActions} from 'react-navigation';
import Filter from '../../assets/images/Filter.svg';
import RewardAgree from '../../assets/images/RewardsAgree.svg';
import CloseImage from '../../assets/images/close.svg';
class RewardsCard extends React.Component {
  state = {
    isModalVisible: false,
    isPhotoVisible: false,
    fileData: null,
    RewardsId: null,
    RewardValue: null,
  };

  componentDidMount() {
    this.props.setAgreeModal(false);
    this.props.setSubmitModal(false);
    this.setState({isModalVisible: false});
  }
  componentDidUpdate() {
    BackHandler.addEventListener('backPressss', () => {
      this.setState({isModalVisible: false});
      return true;
    });
  }
  // componentWillUnmount() {
  //   BackHandler.removeEventListener('backPressss');
  // }
  SubmitModal() {
    return (
      <Modal
        coverScreen={true}
        style={{
          backgroundColor: '#fff',
          margin: 0,
          opacity: 0.9,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        animationType="slide"
        transparent={true}
        isVisible={this.props.submitModal}
        onRequestClose={() => {}}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#00A650',
            width: '90%',
            justifyContent: 'center',
            borderRadius: 25 * theme.consts.BW,
            height: 40 * theme.consts.BW,
            alignItems: 'center',
            marginTop: 80 * theme.consts.BW,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 22 * theme.consts.BW,
              color: '#fff',
              fontWeight: 'bold',
            }}>
            {this.props.total}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18 * theme.consts.BW,
              color: '#fff',
              marginTop: 4 * theme.consts.BW,
              paddingHorizontal: 5 * theme.consts.BW,
            }}>
            total points
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            marginTop: 50 * theme.consts.BW,
          }}>
          {this.state.RewardValue ? (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 24 * theme.consts.BW,
                color: '#8DC965',
                fontWeight: 'bold',
              }}>
              REWARDS VALUE IS {this.state.RewardValue.totalPoints} POINTS
            </Text>
          ) : null}

          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18 * theme.consts.BW,
                color: '#808080',
                marginHorizontal: 5 * theme.consts.BW,
              }}>
              Redeem now and enjoy your well-deserved reward. Then go back and
              take more environmetally conscious actions!
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={
            () =>
              this.props.takeAward({
                data: {
                  points: this.state.RewardValue.totalPoints,
                  _id: this.state.RewardValue._id,
                  user_name:
                    this.props.profile.firstName +
                    '' +
                    this.props.profile.lastName,
                },
              })
            // this.setState({
            //   agreeModal: true,
            //   SubmitModal: false,
            //   RewardValue: null,
            // })
          }
          style={{
            borderRadius: 40 * theme.consts.BW,
            backgroundColor: '#107ae3',
            width: '40%',
            height: 80 * theme.consts.BW,
            justifyContent: 'center',
            margin: 20 * theme.consts.BW,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 26 * theme.consts.BW,
              color: '#fff',
            }}>
            REEDEM
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.setSubmitModal(false)}
          style={{marginBottom: 50 * theme.consts.BW}}>
          <CloseImage height={50} width={50} />
        </TouchableOpacity>
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
          opacity: 1,
          justifyContent: 'space-between',
        }}
        animationType="slide"
        transparent={true}
        isVisible={this.props.agreeModal}
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
          <View style={{marginTop: 20 * theme.consts.BW}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 22 * theme.consts.BW,
                color: '#8DC965',
                fontWeight: 'bold',
              }}>
              I HOPE YOU HAVE ENJOYED
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 22 * theme.consts.BW,
                color: '#8DC965',
                fontWeight: 'bold',
              }}>
              Use this coupon {''}
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 22 * theme.consts.BW,
                  color: 'red',
                  fontWeight: 'bold',
                }}>
                {this.props.couponCode}
              </Text>
              {''} to get your reward!!
            </Text>
          </View>
          <View style={{marginTop: 25 * theme.consts.BW}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16 * theme.consts.BW,
                color: '#808080',
              }}>
              Keep up the good work, take more actions!
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => (
            this.props.setAgreeModal(false), this.props.setSubmitModal(false)
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
  renderItem = ({item}) => {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={[styles.containerStyle, {backgroundColor: item.bg_color}]}
          onPress={() =>
            this.setState({isModalVisible: true, RewardsId: item.id})
          }>
          <View style={styles.battelcontainer}>
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
        <Filter style={styles.filterimage} />
        <Text style={{color: '#fff', fontSize: 20 * theme.consts.BW}}>ALL</Text>
      </View>
    );
  };
  render() {
    const {data} = this.props;
    const {rewards} = this.props;
    const {total} = this.props;

    return (
      <>
        {!this.state.isModalVisible ? (
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
                CHOOSE A REWARD YOU
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
                WOULD LIKE TO GET
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
                Select from one of the below categories,
              </Text>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 14 * theme.consts.BW,
                  textAlign: 'center',
                  color: '#808080',
                }}>
                and pick the reward
              </Text>
            </View>
            <FlatList
              data={data}
              renderItem={this.renderItem}
              keyExtractor={(_, index) => index.toString()}
              numColumns={2}
            />
          </View>
        ) : (
          <>
            {this.RewardModal()}
            {this.SubmitModal()}
            <View style={{alignItems: 'center'}}>
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
                      onChangeText={(val) =>
                        this.setState({isModalVisible: false})
                      }
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      isModalVisible: false,
                    })
                  }>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 12 * theme.consts.BW,
                      textAlign: 'center',
                    }}>
                    Rewards Gategory
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
                showsVerticalScrollIndicator={false}
                style={{marginBottom: 75 * theme.consts.BW}}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: 10 * theme.consts.BW,
                  }}>
                  {rewards
                    .filter((item) => item.categories === this.state.RewardsId)
                    .map((item) => (
                      <>
                        {total > item.totalPoints ||
                        total == item.totalPoints ? (
                          <TouchableOpacity
                            onPress={() => (
                              this.props.setSubmitModal(true),
                              this.setState({
                                RewardValue: item,
                              })
                            )}
                            style={[styles.containerStyle2]}>
                            <View style={styles.battelcontainer}>
                              <Image
                                source={{
                                  uri:
                                    'http://services.larsa.io/files/file/' +
                                    item.image,
                                }}
                                resizeMode="contain"
                                style={styles.icon}
                              />
                            </View>
                            <View
                              style={{
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  color: '#004987',
                                  width: 120 * theme.consts.BW,
                                }}
                                numberOfLines={2}>
                                {item.title}
                              </Text>
                            </View>
                            <View
                              style={{
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                width: 110 * theme.consts.BW,
                                backgroundColor: '#107ae3',
                                flexDirection: 'row',
                                paddingHorizontal: 5 * theme.consts.BW,
                              }}>
                              <Text
                                style={{
                                  color: '#fff',
                                  fontWeight: 'bold',
                                  fontSize: 22 * theme.consts.BW,
                                }}>
                                {item.totalPoints}
                              </Text>
                              <Text
                                style={{
                                  color: '#fff',
                                  fontSize: 14 * theme.consts.BW,
                                  marginTop: 5 * theme.consts.BW,
                                }}>
                                Points
                              </Text>
                            </View>
                          </TouchableOpacity>
                        ) : (
                          <View style={[styles.containerStyle2]}>
                            <View style={styles.battelcontainer}>
                              <Image
                                source={{
                                  uri:
                                    'http://services.larsa.io/files/file/' +
                                    item.image,
                                }}
                                resizeMode="contain"
                                style={styles.icon}
                                tintColor="#808080"
                              />
                            </View>
                            <View
                              style={{
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  color: '#808080',

                                  width: 120 * theme.consts.BW,
                                }}
                                numberOfLines={2}>
                                {item.title}
                              </Text>
                            </View>
                            <View
                              style={{
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                width: 110 * theme.consts.BW,
                                backgroundColor: '#808080',
                                flexDirection: 'row',
                                paddingHorizontal: 5 * theme.consts.BW,
                              }}>
                              <Text
                                style={{
                                  color: '#fff',
                                  fontWeight: 'bold',
                                  fontSize: 22 * theme.consts.BW,
                                }}>
                                {item.totalPoints}
                              </Text>
                              <Text
                                style={{
                                  color: '#fff',
                                  fontSize: 14 * theme.consts.BW,
                                  marginTop: 5 * theme.consts.BW,
                                }}>
                                Points
                              </Text>
                            </View>
                          </View>
                        )}
                      </>
                    ))}
                </View>
              </ScrollView>
            </View>
          </>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  agreeModal: state.fields.agreeModal,
  submitModal: state.fields.submitModal,
  couponCode: state.fields.couponCode,
  profile: state.profile.data,
});

const mapDispatchToProps = (dispatch) => {
  const setAgreeModal = (value) => setField({name: 'agreeModal', value});
  const setSubmitModal = (value) => setField({name: 'submitModal', value});

  return bindActionCreators(
    {
      sendDocument,
      takeAward,
      setAgreeModal,
      setSubmitModal,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(RewardsCard));

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: '#808080',
  },
  image: {
    height: 30 * theme.consts.BW,
    tintColor: '#fff',
  },
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20 * theme.consts.BW,
    width: 175 * theme.consts.BW,
    height: 140 * theme.consts.BW,
    // backgroundColor: '#d9c755',
  },
  battelcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60 * theme.consts.BW,
    width: 60 * theme.consts.BW,
  },
  text: {
    fontSize: 20,
    color: '#808080',
  },

  containerStyle2: {
    borderWidth: 0.5 * theme.consts.BW,
    borderRadius: 2 * theme.consts.BW,
    borderColor: '#8CC6FF',

    marginTop: 10 * theme.consts.BW,
    flexDirection: 'row',
    width: 380 * theme.consts.BW,
    flex: 1,
    justifyContent: 'space-between',
    padding: 10 * theme.consts.BW,
  },

  filterborder: {
    flexDirection: 'row',
    borderRadius: 25 * theme.consts.BW,
    backgroundColor: '#3a91e7',
    width: 80 * theme.consts.BW,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterimage: {
    height: 15 * theme.consts.BW,
    width: 15 * theme.consts.BW,
  },
  rowfilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#107ae3',
    width: 400 * theme.consts.BW,
    height: 40 * theme.consts.BW,
    padding: 10 * theme.consts.BW,
    margin: 10 * theme.consts.BW,
    borderRadius: 25 * theme.consts.BW,
  },
  rowfilterList: {
    backgroundColor: '#107ae3',
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
  button: {
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#107AE3',
    width: 125 * theme.consts.BW,
    height: 50 * theme.consts.BW,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  icon: {height: 40 * theme.consts.BW, width: 40 * theme.consts.BW},
});
