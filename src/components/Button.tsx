import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';


interface ButtonProps {
    label: string;
    variant: 'default' | 'primary';
    onPress?: () => void;
}

const Button = ({ label, variant, onPress } : ButtonProps) => {
    const backgroundColor = variant === 'primary' ? '#2CB9B0' : 'rgba(12, 13, 52, 0.05)';
    const color = variant === 'primary' ? 'white' : '#0C0D34';

    return (
        <RectButton onPress={onPress} style={[styles.container, { backgroundColor }]}>
            <View>
                <Text style={[styles.label, { color }]}>{label}</Text>
            </View>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 25,
        height: 50,
        width: 245,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 15,
        fontFamily: 'SFProText-Regular',
        textAlign: 'center',
    }
})

Button.defaultProps = {
    variant: 'default',
}

export default Button;