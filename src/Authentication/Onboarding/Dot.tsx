import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { Extrapolate, interpolateNode } from 'react-native-reanimated';

const WIDTH_HEIGHT = 8;

interface DotProps {
    index: number;
    currentIndex: Animated.Node<number>;
}

const Dot = ({ index, currentIndex } : DotProps) => {
    const opacity = interpolateNode(currentIndex, {
        inputRange: [index - 1, index, index + 1],
        outputRange: [0.5, 1, 0.5],
        extrapolate: Extrapolate.CLAMP
    })

    const scale = interpolateNode(currentIndex, {
        inputRange: [index - 1, index, index + 1],
        outputRange: [1, 1.25, 1],
        extrapolate: Extrapolate.CLAMP
    })

    return (
        <Animated.View
            style={[styles.container, { opacity, transform: [{scale}] }]}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        width: WIDTH_HEIGHT,
        height: WIDTH_HEIGHT,
        borderRadius: WIDTH_HEIGHT / 2,
        backgroundColor: '#2CB9B0',
        marginHorizontal: 2,
    }
});

export default Dot;