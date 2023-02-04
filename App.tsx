/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {Alert, SafeAreaView, View} from 'react-native';

import ReadMore from './ReadMore';

function App(): JSX.Element {
  return (
    <SafeAreaView
      style={{
        display: 'flex',
        flex: 1,
        marginTop: 300,
      }}>
      <ReadMore
        readLessText={'less less'}
        readMoreText="see all"
        readMoreStyle={{color: 'blue'}}
        style={{textAlign: 'justify'}}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
        repudiandae similique, vero dolore asperiores suscipit nobis, quo illo,
        ratione impedit minima dolores consequuntur incidunt voluptatibus sint
        corrupti itaque a? Maxime.
      </ReadMore>
      <View style={{height: 50}} />
      <ReadMore readLessText={'less less'} readMoreText="see all more total">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
        repudiandae similique, vero dolore asperiores suscipit nobis, quo illo,
        ratione impedit minima dolores consequuntur incidunt voluptatibus sint
        corrupti itaque a? Maxime.
      </ReadMore>
      <View style={{height: 50}} />
      <ReadMore
        onReadMore={() => {
          Alert.alert('ok');
        }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
        perspiciatis officiis eum culpa debitis nesciunt necessitatibus ducimus,
        fugiat cupiditate ab pariatur, provident nobis maiores aliquam porro
        ipsa repudiandae. Fuga, suscipit.
      </ReadMore>
      <View style={{height: 50}} />
      <ReadMore>Lorem ipsum dolor sit</ReadMore>
    </SafeAreaView>
  );
}

export default App;
