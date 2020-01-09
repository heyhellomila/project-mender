import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import PropertySectorComponent from '../../components/propertyForms/propertySectors/PropertySectorComponent';
import { getPropertySectorsByPropertyId } from '../../apis/properties/sectors/GetPropertySectors';

class PropertySectorsPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedSectorKinds: [],
            activePropertySectorKinds: [],
            inactivePropertySectorKinds: [],
            sectorType: ''
        }
    };

    async componentDidMount() {
        await getPropertySectorsByPropertyId(this.props.property.id).then((res) => {
            this.sortPropertySectors(res.data);
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.selectedSectorKinds !== this.state.selectedSectorKinds) {
            return true;
        }
    }

    handleSectorType = (value) => {
        this.setState({
            sectorType: value
        })
    };

    handleSelectedSectorKinds = (value) => {
        const { selectedSectorKinds } = this.state;
        const index = selectedSectorKinds.indexOf(value);
        if (index >= 0) {
            selectedSectorKinds.splice(index, 1);
            this.setState({
                selectedSectorKinds: selectedSectorKinds
            })
        } else {
            this.setState({
                selectedSectorKinds: [...selectedSectorKinds, value]
            })
        }
        console.log(this.state.selectedSectorKinds);
    };

    isActiveAndSelected = (sectorKind) => {
        const {selectedSectorKinds, activePropertySectorKinds} = this.state;
        return selectedSectorKinds.indexOf(sectorKind) > -1
            && activePropertySectorKinds.indexOf(sectorKind) > -1;
    };

    isSelected = (sectorKind) => {
        const { selectedSectorKinds } = this.state;
        return selectedSectorKinds.indexOf(sectorKind) > -1;
    };

    isActive = (sectorKind) => {
        return this.state.activePropertySectorKinds.indexOf(sectorKind) > -1;
    };

    sortPropertySectors = (propertySectors) => {
        propertySectors.forEach((propertySector) => {
            if (propertySector.status === 'ACTIVE') {
                this.setState({
                    activePropertySectorKinds: [...this.state.activePropertySectorKinds, propertySector.sector.kind]
                })
            } else {
                this.setState({
                    inactivePropertySectorKinds: [...this.state.inactivePropertySectorKinds, propertySector.sector.kind]
                })
            }
        });
    };

    canSubmit = () => {
        return true;
    };

    submit = () => {
        console.log('ok');
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <PropertySectorComponent {...this.state} {...this.props}
                    handleSectorType={this.handleSectorType} canSubmit={this.canSubmit}
                    submit={this.submit} handleSelectedSectorKinds={this.handleSelectedSectorKinds}
                    isActiveAndSelected={this.isActiveAndSelected} isActive={this.isActive}
                    isSelected={this.isSelected}/>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    property: state.property.property
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertySectorsPage);
