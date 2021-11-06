import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ListItem,
} from 'react-native';
import theme from '../theme';
import Modal from 'react-native-modal';
import {Icon} from 'react-native-elements';
import ImageModal from 'react-native-image-modal';
import Coffe from '../../assets/images/Coffee.svg';
import Spoon from '../../assets/images/Coffee.svg';
import Filter from '../../assets/images/Filter.svg';
import ShareImg from '../../assets/images/ShareImage.svg';
import Share from 'react-native-share';
import ExtendImage from '../../assets/images/ExtendImage.svg';
import Mug from '../../assets/images/mug.svg';
import CloseImage from '../../assets/images/close.svg';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import actions from '../redux/actions';
import reactotron from 'reactotron-react-native';
const {fetchActivity} = actions;
const {width, height} = Dimensions.get('window');
class PastActivites extends React.Component {
  state = {
    showModal: false,
    FullImage: false,
    imagePath: null,
    TitleSelected: null,
  };
  componentDidMount() {
    this.props.fetchActivity({userId: this.props.profile._id});
  }
  _renderImage = () => {
    return (
      <Modal
        coverScreen={true}
        style={{
          backgroundColor: '#fff',
          margin: 0,
        }}
        animationType="slide"
        transparent={true}
        isVisible={this.state.FullImage}
        onRequestClose={() => this.setState({FullImage: false})}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <ImageModal
            swipeToDismiss={true}
            resizeMode={'contain'}
            closeButton={'#000'}
            imageBackgroundColor="#fff"
            source={{uri: this.state.imagePath}}
            style={{
              height: height - 50 * theme.consts.BW,
              width,
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => this.setState({FullImage: false})}
          style={{alignItems: 'center', marginBottom: 20 * theme.consts.BW}}>
          <CloseImage height={50} width={50} />
        </TouchableOpacity>
      </Modal>
    );
  };
  share = ({tit}) => {
    const url = '********';
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
  renderModal = () => {
    return (
      <Modal
        coverScreen={true}
        style={{
          backgroundColor: '#fff',
          margin: 0,
        }}
        animationType="slide"
        transparent={true}
        isVisible={this.state.showModal}
        onRequestClose={() => {}}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 20, textAlign: 'center'}}>
            Please Select kind of filters
          </Text>
        </View>
        <View style={{padding: 20 * theme.consts.BW}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 20 * theme.consts.BW,
            }}>
            <View>
              <TouchableOpacity>
                <Icon
                  type="font-awesome"
                  name="circle"
                  size={30 * theme.consts.BW}
                  color={'grey'}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16 * theme.consts.BW,
                  color: '#808080',
                }}>
                Points
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 20 * theme.consts.BW,
            }}>
            <View>
              <TouchableOpacity>
                <Icon
                  type="font-awesome"
                  name="circle"
                  size={30 * theme.consts.BW}
                  color={'grey'}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16 * theme.consts.BW,
                  color: '#808080',
                }}>
                Matirials
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.setState({showModal: false})}
          style={styles.button}>
          <Text
            style={{
              fontSize: 20 * theme.consts.BW,
              alignItems: 'center',
              color: '#fff',
            }}>
            Accept
          </Text>
        </TouchableOpacity>
      </Modal>
    );
  };
  render() {
    const data = this.props.activities;
    return (
      <>
        {this.renderModal()}
        {this._renderImage()}
        <View style={{alignItems: 'center'}}>
          <View style={styles.rowfilter}>
            <Text
              style={{
                color: '#fff',
                fontSize: 22 * theme.consts.BW,
                fontWeight: 'bold',
                marginHorizontal: 3 * theme.consts.BW,
              }}>
              {this.props.Total == 0 ? 0 : this.props.Total}
            </Text>
            <Text style={{color: '#fff', fontSize: 14 * theme.consts.BW}}>
              total Points
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginBottom: 70 * theme.consts.BW}}>
            <View style={{alignItems: 'center'}}>
              {data.map((item) => (
                <View style={[styles.containerStyle, theme.shadow]}>
                  <View style={styles.battelcontainer}>
                    <Image style={styles.icon} source={{uri: item.camera}} />
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: 185 * theme.consts.BW,
                      justifyContent: 'space-between',
                      padding: 10 * theme.consts.BW,
                    }}>
                    <View>
                      <Text
                        style={{
                          color: '#004987',
                          fontSize: 12 * theme.consts.BW,
                        }}>
                        {item.title}
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Mug height={15} width={15} />
                        <Text
                          numberOfLines={2}
                          style={{
                            fontSize: 10 * theme.consts.BW,
                            width: 90 * theme.consts.BW,
                          }}>
                          {item.name}
                        </Text>
                      </View>

                      <TouchableOpacity
                        onPress={() =>
                          this.setState({
                            FullImage: true,
                            imagePath: item.camera,
                          })
                        }>
                        <ExtendImage height={20} width={20} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => (
                          this.setState({
                            TitleSelected: item.title,
                          }),
                          this.share({tit: item.title})
                        )}
                        style={{}}>
                        <ShareImg height={20} width={20} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 80 * theme.consts.BW,
                      height: 80 * theme.consts.BW,
                      margin: 10 * theme.consts.BW,
                      backgroundColor: '#107ae3',
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: '#fff',
                        fontSize: 20 * theme.consts.BW,
                      }}>
                      {item.earnPoints}
                    </Text>
                    <Text
                      style={{color: '#fff', fontSize: 10 * theme.consts.BW}}>
                      {item.earnPoints == 1 ? 'Point' : 'Points'} Earned
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  activities: state.home.activities,
  profile: state.profile.data,
  Total: state.home.totalPoints,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({fetchActivity}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PastActivites);

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
    borderWidth: 0.5 * theme.consts.BW,
    borderRadius: 2 * theme.consts.BW,
    borderColor: '#8CC6FF',
    shadowColor: '#000',
    shadowOpacity: 1 * theme.consts.BW,
    shadowRadius: 2 * theme.consts.BW,
    elevation: 1 * theme.consts.BW,
    marginTop: 10 * theme.consts.BW,
    flexDirection: 'row',
    width: 380 * theme.consts.BW,
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 10 * theme.consts.BW,
  },
  battelcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10 * theme.consts.BW,
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#107ae3',
    width: 380 * theme.consts.BW,
    height: 40 * theme.consts.BW,
    padding: 10 * theme.consts.BW,
    marginTop: 10 * theme.consts.BW,
    borderRadius: 25 * theme.consts.BW,
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
  icon: {
    height: 80 * theme.consts.BW,
    width: 80 * theme.consts.BW,
    flex: 2,
    resizeMode: 'contain',
  },
});
