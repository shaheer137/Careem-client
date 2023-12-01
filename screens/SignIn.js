import { View, Button } from 'react-native'

export default function SignIn({navigation}) {
  return <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
    {/* <Text>Signup</Text> */}
    <Button title='SignIp' onPress={()=>navigation.navigate('Dashboard')} />
  </View>
}