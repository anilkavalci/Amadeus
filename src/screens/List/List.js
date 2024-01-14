import {ActivityIndicator, Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useQuery} from 'react-query';
import {airports} from '../../utils/queries';

const List = ({route}) => {
  const {searchData} = route.params;

  const {data = [], isLoading, error} = useQuery('airports', airports);
  const [filteredFlights, setFilteredFlights] = React.useState([]);

  React.useEffect(() => {
    const formatDate = dateString => {
      const date = new Date(dateString);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    };

    const matchingFlights = data.filter(flight => {
      const flightDepartureDate = formatDate(flight.departureTime);
      return (
        flightDepartureDate === searchData.departureDate &&
        flight.departureAirport === searchData.departureAirport &&
        flight.arrivalAirport === searchData.arrivalAirport
      );
    });

    setFilteredFlights(matchingFlights);
  }, [data, searchData]);

  const sortFlights = criteria => {
    let sortedFlights = [...filteredFlights];
    if (criteria === 'price') {
      sortedFlights.sort((a, b) => a.price - b.price);
    } else {
      sortedFlights.sort(
        (a, b) => new Date(a[criteria]) - new Date(b[criteria]),
      );
    }
    setFilteredFlights(sortedFlights);
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      '0',
    )}-${String(date.getDate()).padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  if (error) return <Text>An error occurred: {error.message}</Text>;

  if (filteredFlights.length === 0) {
    return <Text style={styles.centeredText}>No flights available.</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerMargin}>
        <View style={styles.sortingOptions}>
          <Button
            title="Sort by Departure"
            onPress={() => sortFlights('departureTime')}
          />
          <Button
            title="Sort by Return"
            onPress={() => sortFlights('arrivalTime')}
          />
          <Button title="Sort by Price" onPress={() => sortFlights('price')} />
        </View>
        {filteredFlights.map((flight, index) => (
          <View style={styles.listContainer}>
            <View style={styles.listBox}>
              <Text style={styles.textFirst}>
                Company:<Text style={styles.textSecond}> {flight.company}</Text>
              </Text>
              <Text style={styles.textFirst}>
                From:
                <Text style={styles.textSecond}>
                  {' '}
                  {flight.departureAirport}
                </Text>
              </Text>
              <Text style={styles.textFirst}>
                To:
                <Text style={styles.textSecond}> {flight.arrivalAirport}</Text>
              </Text>
              <View>
                <Text style={styles.textFirst}>
                  Departure:
                  <Text style={styles.textSecond}>
                    {' '}
                    {formatDate(flight.departureTime)}
                  </Text>
                </Text>
                {!searchData.isOneWayFlight && (
                  <Text style={styles.textFirst}>
                    Return:
                    <Text style={styles.textSecond}>
                      {' '}
                      {formatDate(flight.arrivalTime)}
                    </Text>
                  </Text>
                )}
              </View>
              <Text style={styles.textFirst}>
                Price: <Text style={styles.textSecond}>{flight.price}</Text>
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  containerMargin: {
    marginHorizontal: 10,
  },
  listContainer: {
    flexDirection: 'column',
    marginTop: 10,
  },
  listBox: {
    borderColor: '#F4F4F4',
    borderWidth: 2,
    borderRadius: 5,
    marginVertical: 5,
    padding: 5,
  },
  textFirst: {
    fontSize: 16,
    color: '#2B7250',
  },
  textSecond: {
    fontSize: 16,
    color: '#043874',
  },
  sortingOptions: {
    flexDirection: 'column',
    gap: 10,
    marginVertical: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  centeredText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    marginTop: 50,
  },
});
