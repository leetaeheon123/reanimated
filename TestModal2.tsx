import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const TestModal2 = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleModalLayout = event => {
    const {height} = event.nativeEvent.layout;
    // 모달이 최소 높이 이하로 내려가지 않도록 설정
    if (height < SCREEN_HEIGHT * 0.4) {
      // 현재 높이보다 작은 값을 제한
      modalRef.current.setState({height: SCREEN_HEIGHT * 0.4});
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isVisible}
        // onBackdropPress={toggleModal} // 모달 외부 클릭 시 아무 동작도 하지 않음
        backdropColor="transparent" // 배경 투명하게 설정
        style={styles.modal}
        avoidKeyboard={true} // 키보드가 모달에 영향을 미치지 않도록 설정
        hasBackdrop={false}
        coverScreen={false}
        animationIn={'slideInUp'}
        swipeDirection={['up', 'down']}>
        <View style={styles.modalContent}>
          <Text>모달 내용이 여기에 들어갑니다.</Text>
          {/* <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text>Close Modal</Text>
          </TouchableOpacity> */}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'flex-end', // 모달을 화면 하단에 위치시킵니다.
    margin: 0, // 모달의 기본 여백을 제거합니다.
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: SCREEN_HEIGHT * 0.4, // 모달의 초기 높이를 40%로 설정
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default TestModal2;
