import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class AboutUsPage extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.instructions}>About Us</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	}
});