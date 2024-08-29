import React, {useRef, useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Modalize} from 'react-native-modalize';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const TestModal = () => {
  const modalizeRef = useRef(null);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 모달을 자동으로 엽니다.
    modalizeRef.current?.open();
  }, []);

  const handlePositionChange = position => {
    // 최소 높이보다 작으면 위치를 조정
    console.log(position);
    const minHeight = SCREEN_HEIGHT * 0.4;
    if (position < minHeight) {
      modalizeRef.current?.snapTo(minHeight);
    }
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <Modalize
          ref={modalizeRef}
          snapPoint={SCREEN_HEIGHT * 0.4} // 모달의 최소 높이
          modalHeight={SCREEN_HEIGHT * 0.7} // 모달의 최대 높이
          withHandle={true} // 위로 드래그할 수 있도록 핸들 표시
          adjustToContentHeight={false} // 컨텐츠 높이에 맞추지 않고 고정된 높이 사용
          disableScrollIfPossible={true} // 스크롤 비활성화
          panGestureEnabled={true} // 아래로 드래그하여 모달 닫기 활성화
          overlayStyle={{backgroundColor: 'transparent'}} // 오버레이 투명하게 설정
          onOverlayPress={() => {}} // 모달 외부 클릭 시 아무 동작도 하지 않음
          onPositionChange={handlePositionChange} // 위치 변경 시 호출되는 함수
        >
          <View style={styles.modalContent}>
            <Text>모달 내용이 여기에 들어갑니다.</Text>
          </View>
        </Modalize>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TestModal;
