import React from 'react';
import { Text, View } from 'react-native';
import { dataAnalyticsStyles } from '../../stylesheets/DataAnalyticsStyleSheet'
import { StackedBarChart, ProgressChart } from 'react-native-chart-kit';

const DataAnalyticsComponent = (props) => {
    return (
        <View style={dataAnalyticsStyles.container}>
            <View style={dataAnalyticsStyles.completionRateContainer}>
                <Text style={dataAnalyticsStyles.text}>Work order completion rate</Text>
                <StackedBarChart
                    data={props.selectedIndex === 0
                            ? props.completionRateWeekData
                            : props.selectedIndex === 1
                                ? props.completionRateMonthData
                                : props.completionRateYearData}
                    width={500}
                    height={200}
                    showLegend={false}
                    chartConfig={props.chartConfig}
                    decimalPlaces={0}
                    style={{marginTop: '5%'}}
                />
            </View>

            <View style={dataAnalyticsStyles.completedContainer}>
                <ProgressChart
                    data={props.completedData}
                    width={100}
                    height={200}
                    hideLegend={true}
                    chartConfig={props.chartConfig}
                />
                <View style={dataAnalyticsStyles.legendContainer}>  
                    <View style={dataAnalyticsStyles.completedYouContainer}>
                        <View style={dataAnalyticsStyles.completedYouCircle} />
                        <Text style={dataAnalyticsStyles.text}>Completed by you ({props.completedData.data * 100}%)</Text>
                    </View>
                    <View style={dataAnalyticsStyles.completedContractorContainer}>
                        <View style={dataAnalyticsStyles.completedContractorCircle} />
                        <Text style={dataAnalyticsStyles.text}>Completed by contractor ({100 - props.completedData.data * 100}%)</Text>
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