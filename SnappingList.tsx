import React, {useRef, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
// import {Navigation} from 'react-native-navigation';
import {Modalize} from 'react-native-modalize';
// import faker from 'faker';

// import {Button} from '../components/button/Button';
import {Dimensions} from 'react-native';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export const SnappingList = ({componentId}) => {
  const {width, height} = Dimensions.get('window');
  const ScreenHeight = height;
  const modalizeRef = useRef(null);
  const contentRef = useRef(null);

  const MinHeight = height * 0.4;
  const MaxHeight = height * 0.7;

  const [modalHeight, setModalHeight] = useState(0);

  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({window, screen}) => {
        setDimensions({window, screen});
        console.log(dimensions);
      },
    );
    return () => subscription?.remove();
  });

  const handleClosed = () => {
    // Navigation.dismissOverlay(componentId);
  };

  const handleOpen = () => {
    if (modalizeRef.current) {
      modalizeRef.current.open();
    }
  };
  const handlePositionChange = position => {
    // Calculate the modal's height using the position
    // const height = ScreenHeight - position;
    // setModalHeight(height);
    console.log('modalHeight:', modalHeight);
  };

  const handleLayoutChange = event => {
    const {height} = event.layout;
    console.log('height:', height);
    setModalHeight(height);
  };

  const renderHeader = () => (
    <View style={s.modal__header}>
      <Text style={s.modal__headerText}>50 users online</Text>
    </View>
  );

  const renderContent = () => (
    <View style={s.content}>
      {Array(50)
        .fill(0)
        .map((_, i) => (
          <View style={s.content__row} key={i}>
            <View style={s.content__avatar}>
              {/* <Image
                style={{width: '100%', height: '100%'}}
                source={{uri: faker.image.avatar()}}
              /> */}
            </View>

            <Text style={s.content__name}>{/* {faker.name.findName()} */}</Text>
          </View>
        ))}
    </View>
  );

  useEffect(() => {
    handleOpen();
  }, []);

  return (
    <>
      <View style={s.info}>
        <Text style={s.infoText}>
          Current modal height:{' '}
          {((modalHeight / ScreenHeight) * 100).toFixed(2)}%
        </Text>
      </View>
      <Modalize
        rootStyle={{
          backgroundColor: 'black',
        }}
        ref={modalizeRef}
        // contentRef={contentRef}
        // HeaderComponent={renderHeader}
        snapPoint={MinHeight}
        onClosed={handleClosed}
        closeOnOverlayTap={false}
        modalHeight={MaxHeight}
        // modalTopOffset={200}
        withHandle={false}
        alwaysOpen={MinHeight}
        adjustToContentHeight={false}
        // onPositionChange={position => {
        //   console.log(position);
        //   console.log(typeof position);
        // }}
        onPositionChange={handlePositionChange}
        // onLayout={e => {
        //   console.log(e.layout);
        // }}
        onLayout={handleLayoutChange} // Track layout changes
      >
        {/* {renderContent()} */}
      </Modalize>
    </>
  );
};

const s = StyleSheet.create({
  modal__header: {
    paddingVertical: 15,
    marginHorizontal: 15,

    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },

  modal__headerText: {
    fontSize: 15,
    fontWeight: '200',
  },

  content: {
    paddingHorizontal: 15,
  },

  content__row: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 15,

    borderBottomColor: '#f9f9f9',
    borderBottomWidth: 1,
  },

  content__avatar: {
    width: 38,
    height: 38,

    marginRight: 15,

    overflow: 'hidden',

    backgroundColor: '#eee',
    borderRadius: 19,
  },

  content__name: {
    fontSize: 16,
  },

  content__button: {
    alignItems: 'center',
    justifyContent: 'center',

    marginVertical: 20,
  },
  info: {
    position: 'absolute',
    bottom: 250,
    left: 100,
    backgroundColor: 'red',
  },
  infoText: {
    fontSize: 16,
    color: 'black',
  },
});
