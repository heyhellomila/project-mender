import React from 'react';
import { View, Modal, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { ButtonComponent } from '../components/ButtonComponent';

class WorkOrderModal extends React.Component {
    static navigationOptions = {
        title: 'Create Work Order',
    };

    state={
        isVisible: true
    };
    render() {
        return (
            <Modal transparent={true}
            visible={this.state.isVisible}
            onRequestClose={this.closeModal}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                    <View style={{
                        width: 300,
                        height: 150}}>
                        <ButtonComponent
                            buttonColor='#f56942'
                            buttonName='Close Modal'
                            buttonFunction={() => this.props.navigation.goBack(null)}
                            />   
                        <View>
                          <Text>Corrective Preventive</Text>
                          <Text>Sector<TextInput 
                                                style={{ width:100, height: 40, borderColor: 'gray', borderWidth: 1 }}
                                                />
                                                </Text>
                          <Text>C</Text>
                          <Text>D</Text>
                          <Text>E</Text>
                        </View>

                    </View>
                </View>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps, null)(WorkOrderModal);