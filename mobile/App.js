import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { YellowBox} from 'react-native';

YellowBox.ignoreWarnings([
  'Unrecognazed Websocket',
  'YellowBox has'
])

import Routes from './src/routes'

export default function App() {
  return <Routes />
}
