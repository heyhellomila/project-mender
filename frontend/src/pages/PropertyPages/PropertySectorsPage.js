import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import PropertySectorComponent from '../../components/propertyForms/propertySectors/PropertySectorComponent';
import { getPropertySectorsByPropertyId } from '../../apis/properties/sectors/GetPropertySectors';
import { updatePropertySectorsByPropertyId } from '../../apis/properties/sectors/UpdatePropertySectors';
import { createPropertySectorsByPropertyId } from '../../apis/properties/sectors/CreatePropertySectors';
import { ActivityStatus } from '../../constants/enums/ActivityStatus';

class PropertySectorsPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedSectorKinds: [],
            activePropertySectorKinds: [],
            inactivePropertySectorKinds: [],
            sectorType: '',
            loading: true,
            submitting: false,
            success: false,
            submitted: false
        }
    };

    async componentDidMount() {
        await getPropertySectorsByPropertyId(this.props.property.id).then((res) => {
            this.sortPropertySectors(res.data);
        }).catch((err) => {
            alert(err.message);
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
    };

    isActiveAndSelected = (sectorKind) => {
        const {selectedSectorKinds, activePropertySectorKinds} = this.state;
        return selectedSectorKinds.indexOf(sectorKind) > -1
            && activePropertySectorKinds.indexOf(sectorKind) > -1;
    };

    isSelected = (sectorKind) => {
        return this.state.selectedSectorKinds.indexOf(sectorKind) > -1;
    };

    isActive = (sectorKind) => {
        return this.state.activePropertySectorKinds.indexOf(sectorKind) > -1;
    };

    sortPropertySectors = (propertySectors) => {
        propertySectors.forEach((propertySector) => {
            if (propertySector.status === ActivityStatus.ACTIVE) {
                this.setState({
                    activePropertySectorKinds: [...this.state.activePropertySectorKinds, propertySector.sector.kind]
                })
            } else {
                this.setState({
                    inactivePropertySectorKinds: [...this.state.inactivePropertySectorKinds, propertySector.sector.kind]
                })
            }
        });
        this.setState({
            loading: false
        });
    };

    canSubmit = () => {
        return this.state.selectedSectorKinds.length > 0;
    };

    submit = async () => {
        this.setState({
            submitting: true
        });
        const {selectedSectorKinds, activePropertySectorKinds, inactivePropertySectorKinds} = this.state;
        const newSectorKinds = [];
        const updatedSectorKinds = [];
        selectedSectorKinds.forEach((sectorKind) => {
            if (activePropertySectorKinds.indexOf(sectorKind) > -1) {
                updatedSectorKinds.push({sectorKind, status: ActivityStatus.INACTIVE});
            }
            else if (inactivePropertySectorKinds.indexOf(sectorKind) > -1) {
                updatedSectorKinds.push({sectorKind, status: ActivityStatus.ACTIVE});
            } else {
                newSectorKinds.push({sectorKind});
            }
        });
        try {
            if (newSectorKinds.length > 0) {
                await createPropertySectorsByPropertyId(this.props.property.id, newSectorKinds)
                    .then(() => {this.setState({success: true})
                })
            }
            if (updatedSectorKinds.length > 0) {
                await updatePropertySectorsByPropertyId(this.props.property.id, updatedSectorKinds)
                    .then(() => {this.setState({success: true})
                })
            }
        } catch (err) {
            this.setState({success: false});
            alert(err.message);
        } finally {
            this.setState({
                submitting: false,
                submitted: true
            });
            setTimeout(() => {
                this.props.navigation.navigate('HomePage');
            }, 1500);
        }
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

export default connect(mapStateToProps, null)(PropertySectorsPage);
