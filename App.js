import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { VictoryLabel, VictoryAxis } from 'victory';
const {
  VictoryBar, VictoryChart, VictoryTheme
} = require('victory')// Platform.OS === 'web' ? require('victory') : require('victory-native');


const offseasonFetch = fetch('https://blaseball.com/database/offseasonSetup')
  .then(response => response.json());

export default function App() {
  const [request, setRequest] = useState({ loading: true, data: [] });
  useEffect(
    () => {
      offseasonFetch
        .then(jsonData => {
          setRequest({
            loading: false,
            data: jsonData
          })
        })
    }
    , []);

  return (
    <View style={styles.container}>
      {request.loading
        ? <Text>Loading...</Text>
        : <VictoryChart theme={VictoryTheme.grayscale} horizontal={true} domainPadding={10}>
          <VictoryAxis 
            dependentAxis={true} 
            axisComponent={<View />} 
            style={{
              grid: { stroke: "grey", strokeWidth: 0.5 },
            }}
            label="Votes"
          />
          <VictoryBar
            barRatio={0.95}
            alignment="start"
            data={request.data.bonuses.reverse()}
            labels={({ datum }) => `${datum.title} (${datum.votes})`}
            y="votes"
            style={{
              labels: { fontSize: 5, fill: 'lightgrey' },
            }}
            labelComponent={<VictoryLabel verticalAnchor={'end'} textAnchor={'end'} dx={-3} dy={-3} />}
          />
        </VictoryChart>
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
  },
});
