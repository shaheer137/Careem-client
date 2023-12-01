import { useEffect, useState } from 'react'
import { View, Text, Button, ActivityIndicator } from 'react-native'
import { addARide, doc, onSnapshot, db } from '../config/firebase'

export default function CarSelection({ route }) {
  const { pickupLocation, destinationLocation } = route.params
  const [ distance, setDistance ] = useState(0)
  const [ fare, setFare ] = useState(0)
  const [ carType, setCarType ] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const { latitude: pickupLatitude, longitude: pickupLongitude } = pickupLocation.geocodes.main
    const { latitude: destinationLatitude, longitude: destinationLongitude } = destinationLocation.coords
    const distance = calcCrow(pickupLatitude, pickupLongitude, destinationLatitude, destinationLongitude)
    setDistance(distance)
  }, [])

  function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6317;
    var dLat = toRad(lat2 - lat1)
    var dLon = toRad(lon2 - lon1)
    var lat1 = toRad(lat1)
    var lat2 = toRad(lat2)

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) *
      Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    var d = R * c
    return d
  }

  function toRad(Value) {
    return Value * Math.PI / 180
  }

  console.log('p', pickupLocation)
  console.log('d', destinationLocation)

  async function requestRide() {
    const { latitude: pickupLatitude, longitude: pickupLongitude } = pickupLocation.geocodes.main
    const { latitude: destinationLatitude, longitude: destinationLongitude } = destinationLocation.coords

    const request = {
      pickup: {
        latitude: pickupLatitude,
        longitude: pickupLongitude,
        name: pickupLocation.name,
        address: pickupLocation.location.address
      },
      destination: {
        latitude: destinationLatitude,
        longitude: destinationLongitude,
        name: destinationLocation.coords.location.name,
        address: destinationLocation.coords.location.location.address
      },
      carType,
      fare,
      status: 'pending'
    }
    const docId = await addARide(request)

    const unsub = onSnapshot(doc(db, "rides", docId ), (doc) => {
      console.log("Current data: ", doc.data());
      const data = {id:doc.id,...doc.data()}
      if(data.status === 'accepted'){
        navigation.navigate('Ride',data)
        unsub() 
    }})
    alert('Ride requested successfully')
  }

  return <View>
    <Text>CarSelection</Text>
    <Text> Pickup Location: {pickupLocation.name}</Text>
    <Text> Destination Location: {destinationLocation.coords.location.name}</Text>
    <Text> Distance: {distance.toFixed(2)} KM</Text>
    <Text> Fare: Rs. {Math.round(fare)} </Text>

    <Button title='Bike' onPress={() => {
      setCarType('bike')
      setFare(70 * distance)
    }} />
    <Button title='Car' onPress={() => {
      setCarType('car')
      setFare(150 * distance)
    }} />
    <Button title='Ac Car' onPress={() => {
      setCarType('ac car')
      setFare(250 * distance)
    }} />
    <Button title='Ship' onPress={() => {
      setCarType('ship')
      setFare(700 * distance)
    }} />

    <Button title="LET'S Go!" onPress={() => requestRide()} />
    {loading && <ActivityIndicator size='large' />}
  </View>
}