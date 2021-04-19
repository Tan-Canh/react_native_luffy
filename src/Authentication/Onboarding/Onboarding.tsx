import React, { useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import { divide } from 'react-native-reanimated';
import Dot from './Dot';

import Slide, { SLIDE_HEIGHT } from './Slide';
import SubSlide from './SubSlide';

const { width } = Dimensions.get('window');

const BORDER_RADIUS = 75;
const WIDTH_HEIGHT_INDICATOR_DOT = 8;

const slides = [
    {
        title: 'Luffy',
        color: '#BFEAF5',
        subTitle: 'Find Your OutFits',
        description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
        picture: require('../../../assets/images/luffy.png'),
    },
    {
        title: 'Ace',
        color: '#BEECC4',
        subTitle: 'Hear it First, Wear it First',
        description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
        picture: require('../../../assets/images/ace.png'),
    },
    {
        title: 'Zoro',
        color: '#FFE4D9',
        subTitle: 'Your Style, Your Way',
        description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
        picture: require('../../../assets/images/zoro.png'),
    },
    {
        title: 'Mihawk',
        color: '#FFDDDD',
        subTitle: 'Good Luck, Feel Luck',
        description: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
        picture: require('../../../assets/images/mihawk.png'),
    },
]

const Onboarding = () => {
    const scroll: any = useRef(null);
    const x = useRef(new Animated.Value(0)).current;
    const onScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x, }, }, },],
        { useNativeDriver: false }
    )

    const backgroundColor = x.interpolate({
        inputRange: slides.map((_, index) => index * width),
        outputRange: slides.map((slide) => slide.color)
    })

    const subSlide = x.interpolate({
        inputRange: slides.map((_, index) => index * width),
        outputRange: slides.map((_, index) => -(index * width)),
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.slider, { backgroundColor }]}>
                <Animated.ScrollView
                    ref={scroll}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    scrollEventThrottle={1}
                    {...{ onScroll }}
                >
                    {
                        slides.map(({ title, picture }, index) => (
                            <Slide
                                key={index}
                                right={index % 2 !== 0}
                                {...{ title, picture }}
                            />
                        ))
                    }
                </Animated.ScrollView>
            </Animated.View>
            <View style={styles.footer}>
                <Animated.View style={{ ...StyleSheet.absoluteFillObject, backgroundColor }} />
                <View style={[styles.footerDot]}>
                    {
                        slides.map((_,index) => {
                            const widthIndicator = x.interpolate({
                                inputRange: [
                                    width * (index - 1),
                                    width * index,
                                    width * (index + 1)
                                ],
                                outputRange: [8, 16, 8],
                                extrapolate: 'clamp',
                            });

                            return (
                                <Animated.View
                                    key={index}
                                    style={[styles.indicatorDot, { width: widthIndicator, backgroundColor }]}
                                />
                            )
                        })
                    }
                </View>
                <View style={[
                    styles.footerContent,
                    { width: width * slides.length,  }
                ]}>
                    <Animated.View style={{ flex: 1, flexDirection: 'row', transform: [{ translateX: subSlide }] }}>
                        {
                            slides.map(({ subTitle, description }, index) => (
                                <SubSlide
                                    key={index}
                                    onPress={() => {
                                        if (scroll.current) {
                                            scroll.current.scrollTo({ x: width * (index + 1), animated: true })
                                        }
                                    }}
                                    last={index === slides.length - 1}
                                    {...{ subTitle, description }}
                                />
                            ))
                        }
                    </Animated.View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    slider: {
        height: SLIDE_HEIGHT,
        borderBottomRightRadius: BORDER_RADIUS,
    },
    footer: {
        flex: 1,
    },
    footerContent: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderTopLeftRadius: BORDER_RADIUS,
    },
    footerDot: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        width: width,
        height: BORDER_RADIUS,
        flexDirection: 'row',
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicatorDot: {
        width: WIDTH_HEIGHT_INDICATOR_DOT,
        height: WIDTH_HEIGHT_INDICATOR_DOT,
        borderRadius: WIDTH_HEIGHT_INDICATOR_DOT / 2,
        backgroundColor: '#2CB9B0',
        marginHorizontal: 2,
    }
});

export default Onboarding;
