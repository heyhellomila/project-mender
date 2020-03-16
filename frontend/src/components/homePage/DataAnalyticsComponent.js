import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { dataAnalyticsStyles } from '../../stylesheets/DataAnalyticsStyleSheet'
import { ProgressChart } from 'react-native-chart-kit';

const DataAnalyticsComponent = (props) => {
    return (
        <View style={dataAnalyticsStyles.container}>
            <View>
            {/* work order completion rate */}
            </View>

            <View style={dataAnalyticsStyles.completedContainer}>
                <ProgressChart
                    data={props.data}
                    width={100}
                    height={200}
                    hideLegend={true}
                    chartConfig={props.chartConfig}
                />
                <View style={dataAnalyticsStyles.legendContainer}>  
                    <View style={dataAnalyticsStyles.completedYouContainer}>
                        <View style={dataAnalyticsStyles.completedYouCircle} />
                        <Text style={dataAnalyticsStyles.text}>Completed by you ({props.data.data * 100}%)</Text>
                    </View>
                    <View style={dataAnalyticsStyles.completedContractorContainer}>
                        <View style={dataAnalyticsStyles.completedContractorCircle} />
                        <Text style={dataAnalyticsStyles.text}>Completed by contractor ({100 - props.data.data * 100}%)</Text>
                    </View>
                </View>
            </View>

            <View style={dataAnalyticsStyles.averageTimeContainer}>
                <Text style={dataAnalyticsStyles.text}>Average time to complete a work order</Text>
                <Text style={dataAnalyticsStyles.averageTimeText}>13 days</Text>
            </View>
        </View>
    );
};

export default DataAnalyticsComponent;