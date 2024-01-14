import {
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import FromSvg from '../../components/FromSvg';
import ToSvg from '../../components/ToSvg';
import CalendarSvg from '../../components/CalendarSvg';
import DatePicker from '@react-native-community/datetimepicker';
import {useQuery} from 'react-query';
import {airports as getAirports} from '../../utils/queries';
import {Dropdown} from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';
import * as yup from 'yup';

const Flights = () => {
  const navigation = useNavigation();
  const [isOneWayFlight, setIsOneWayFlight] = React.useState(false);
  const [departureDate, setDepartureDate] = React.useState(new Date());
  const [returnDate, setReturnDate] = React.useState(new Date());
  const [openDepartureDate, setOpenDepartureDate] = React.useState(false);
  const [openReturnDate, setOpenReturnDate] = React.useState(false);
  const [departureValue, setDepartureValue] = React.useState(null);
  const [departureItems, setDepartureItems] = React.useState([]);

  // Varış havaalanı için dropdown ve arama
  const [arrivalValue, setArrivalValue] = React.useState(null);
  const [arrivalItems, setArrivalItems] = React.useState([]);
  const [filteredDepartureItems, setFilteredDepartureItems] = React.useState(
    [],
  );
  const [filteredArrivalItems, setFilteredArrivalItems] = React.useState([]);

  const validationSchema = yup.object().shape({
    departureAirport: yup.string().required('Departure airport is required'),
    arrivalAirport: yup.string().required('Arrival airport is required'),
    departureDate: yup.date().required('Departure date is required'),
    returnDate: yup
      .date()
      .when('isOneWayFlight', (isOneWayFlight, schema) =>
        isOneWayFlight
          ? schema.nullable()
          : schema.required('Return date is required'),
      ),
    isOneWayFlight: yup.bool(),
  });

  const {
    data: airportsData,
    isLoading,
    error,
  } = useQuery('airports', getAirports);

  React.useEffect(() => {
    if (airportsData) {
      setDepartureItems(
        airportsData.map(airport => ({
          label: airport.departureAirport,
          value: airport.departureAirport,
          key: airport.id,
        })),
      );
      setArrivalItems(
        airportsData.map(airport => ({
          label: airport.arrivalAirport,
          value: airport.arrivalAirport,
          key: airport.id,
        })),
      );
    }
  }, [airportsData]);

  const handleDepartureSearch = text => {
    if (!text) {
      setFilteredDepartureItems(departureItems);
    } else {
      const filtered = departureItems.filter(item =>
        item.label.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredDepartureItems(filtered);
    }
  };

  const handleArrivalSearch = text => {
    if (!text) {
      setFilteredArrivalItems(arrivalItems);
    } else {
      const filtered = arrivalItems.filter(item =>
        item.label.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredArrivalItems(filtered);
    }
  };

  const toggleOneWayFlight = () => {
    setIsOneWayFlight(!isOneWayFlight);
    if (!isOneWayFlight) {
      setOpenReturnDate(false);
    }
  };

  const openDepartureDatePicker = () => {
    setOpenDepartureDate(true);
  };

  const openReturnDatePicker = () => {
    setOpenReturnDate(true);
  };

  const formatDate = date => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const handleSearch = () => {
    const searchData = {
      isOneWayFlight,
      departureDate: formatDate(departureDate),
      returnDate: isOneWayFlight ? null : formatDate(returnDate),
      departureAirport: departureValue,
      arrivalAirport: arrivalValue,
    };

    validationSchema
      .validate(searchData)
      .then(validData => {
        navigation.navigate('List', {searchData: validData});
      })
      .catch(error => {
        alert(error.errors.join('\n'));
      });
  };
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>An error has occurred: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerMargin}>
        {/* Kalkış Havaalanı */}
        <View style={styles.fromContainerBox}>
          <View style={styles.fromContainer}>
            <FromSvg />
            <Dropdown
              style={styles.dropdown}
              data={departureItems}
              search
              searchPlaceholder="Search departure..."
              labelField="label"
              valueField="value"
              placeholder="Select a departure airport"
              value={departureValue}
              onChange={item => setDepartureValue(item.value)}
              onChangeText={handleDepartureSearch}
            />
          </View>
        </View>

        {/* Varış Havaalanı */}
        <View style={styles.toContainerBox}>
          <View style={styles.fromContainer}>
            <ToSvg />
            <Dropdown
              style={styles.dropdown}
              data={arrivalItems}
              search
              searchPlaceholder="Search arrival..."
              labelField="label"
              valueField="value"
              placeholder="Select an arrival airport"
              value={arrivalValue}
              onChange={item => setArrivalValue(item.value)}
              onChangeText={handleArrivalSearch}
            />
          </View>
        </View>

        {/* Gidiş Tarihi */}
        <TouchableOpacity
          style={styles.dateContainerBox}
          onPress={openDepartureDatePicker}>
          <View style={styles.dateInside}>
            <CalendarSvg />
            <Text style={styles.fromText}>
              Departure: {formatDate(departureDate)}
            </Text>
          </View>
        </TouchableOpacity>
        {openDepartureDate && (
          <DatePicker
            mode="date"
            value={departureDate}
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || departureDate;
              setOpenDepartureDate(false);
              setDepartureDate(currentDate);
            }}
          />
        )}

        {/* Dönüş Tarihi */}
        {!isOneWayFlight && (
          <TouchableOpacity
            style={styles.dateContainerToBox}
            onPress={openReturnDatePicker}>
            <View style={styles.dateInsideTo}>
              <CalendarSvg />
              <Text style={styles.fromText}>
                Return: {formatDate(returnDate)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {openReturnDate && !isOneWayFlight && (
          <DatePicker
            mode="date"
            value={returnDate}
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || returnDate;
              setOpenReturnDate(false);
              setReturnDate(currentDate);
            }}
          />
        )}

        {/* Tek Yön Uçuş Seçeneği */}
        <View style={styles.oneWayContainer}>
          <Text style={styles.oneWayText}>One Way Flight</Text>
          <Switch value={isOneWayFlight} onValueChange={toggleOneWayFlight} />
        </View>
      </View>
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Flights;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  containerMargin: {
    marginHorizontal: 10,
  },
  dropdown: {
    flex: 1,
  },
  fromContainerBox: {
    borderColor: '#F4F4F4',
    borderWidth: 2,
    borderRadius: 5,
    marginVertical: 5,
    padding: 5,
    marginTop: 20,
  },
  fromContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 5,
    alignItems: 'center',
  },
  toContainerBox: {
    borderColor: '#F4F4F4',
    borderWidth: 2,
    borderRadius: 5,
    marginVertical: 5,
    padding: 5,
  },
  from: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginHorizontal: 10,
  },
  to: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginHorizontal: 10,
  },
  fromText: {
    color: '#043874',
    fontSize: 12,
    marginVertical: 5,
  },
  fromText2: {
    color: '#043874',
    fontSize: 16,
    marginVertical: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateContainerBox: {
    borderColor: '#F4F4F4',
    borderWidth: 2,
    borderRadius: 5,
    marginVertical: 5,
  },
  dateContainerToBox: {
    borderColor: '#F4F4F4',
    borderWidth: 2,
    borderRadius: 5,
    marginVertical: 5,
  },
  dateInside: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 5,
    alignItems: 'center',
  },
  dateInsideTo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 5,
    alignItems: 'center',
  },
  oneWayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#F4F4F4',
    marginVertical: 10,
    borderRadius: 5,
  },
  oneWayText: {
    fontSize: 16,
    color: '#043874',
  },
  searchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#043874',
    marginHorizontal: 10,
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
  },
  searchText: {
    fontSize: 16,
    color: '#FFF',
  },
});
