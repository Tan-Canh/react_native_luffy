import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SLIDE_HEIGHT = 0.61 * height;

interface SliderProps {
    title?: string;
    right?: boolean;
    picture: number;
}

const Slide = ({ title, right, picture }: SliderProps) => {
    const transform = [
        {translateY: (SLIDE_HEIGHT - 100) / 2},
        {translateX: right ? (width / 2) - 50: (-width / 2) + 50 },
        {rotate: right ? '-90deg' : '90deg'}
    ]

    return (
        <View style={styles.container}>
            <View style={styles.underlay}>
                <Image source={picture} resizeMode={'contain'} style={styles.picture} />
            </View>
            <View style={[styles.titleContainer, { transform }]}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width
    },
    titleContainer: {
        // backgroundColor: 'red',
        height: 100,
        justifyContent: 'center',
    },
    title: {
        fontSize: 80,
        lineHeight: 80,
        fontFamily: 'SFProText-Bold',
        color: 'white',
        textAlign: 'center',
    },
    underlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
    },
    picture: {
        ...StyleSheet.absoluteFillObject,
        width: undefined,
        height: undefined,
        borderBottomRightRadius: 75
    }
})

export default Slide;