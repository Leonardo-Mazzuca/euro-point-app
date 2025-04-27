import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';



export default function NotFoundScreen() {

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View>
        <Text>
          Ops! Tela não encontrada!
        </Text>
      </View>
    </>
  );
}

