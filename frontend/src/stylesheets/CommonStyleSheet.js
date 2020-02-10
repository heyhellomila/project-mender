import {StyleSheet} from "react-native";

const circleStyles = StyleSheet.create({
    redCircle: {
        width: 10,
        height: 10,
        borderRadius: 10/2,
        backgroundColor: 'red'
    },
    yellowCircle: {
        width: 10,
        height: 10,
        borderRadius: 10/2,
        backgroundColor: 'yellow'
    },
    greenCircle: {
        width: 10,
        height: 10,
        borderRadius: 10/2,
        backgroundColor: 'green'
    },
    selected: {
        padding: '1%',
        borderWidth: 1
    }
});

export { circleStyles };
