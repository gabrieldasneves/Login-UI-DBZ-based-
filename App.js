import { StatusBar } from 'expo-status-bar';
import {useState, useEffect} from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Animated, Keyboard } from 'react-native';

export default function App() {

  const [offset] = useState(new Animated.ValueXY({x:0,y:80}))
  const [logo] = useState(new Animated.ValueXY({x:290,y:385}))
  useEffect(() => {
    keyboardShowlistener = Keyboard.addListener('keyboardshow',keyboardshow);
    keyboardHidelistener = Keyboard.addListener('keyboardhide',keyboardhide);

    Animated.spring(offset.y,{
      toValue: 0,
      speed:4,
      bounciness:20
    }).start();
  },[]);

  function keyboardshow(){
    Animated.parallel([
      Animated.timing(logo.x,{
        toValue: 190,
        duration:100
      }),
      Animated.parallel([
        Animated.timing(logo.y,{
          toValue: 285,
          duration:100
        }),
      ])
    ]).start();
  }

  function keyboardhide(){
    Animated.parallel([
      Animated.timing(logo.x,{
        toValue: 290,
        duration:100
      }),
      Animated.parallel([
        Animated.timing(logo.y,{
          toValue: 385,
          duration:100
        }),
      ])
    ]).start();
  }

  return (
    <KeyboardAvoidingView style={styles.background}>

      <View style={styles.containerLogo}>
        <Animated.Image 
        style = {{
          width:logo.x,
          height: logo.y
        }}
        source={require('./assets/logo.png')} 
        />
      </View>

      <Animated.View style={[
        styles.container,
        {
          transform: [
            {translateY: offset.y }
          ]
        }
        ]}
      >
        <TextInput style={styles.input} placeholder="Email" autoCorrect={false}  onChangeText={() => {}}/>

        <TextInput style={styles.input} placeholder="Senha" autoCorrect={false}  onChangeText={() => {}}/>

        <TouchableOpacity style={styles.btnSubmit}>
          <Text style={styles.submitText}>Desejo entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnCreate}>
          <Text style={styles.createText}>Desejo criar conta</Text>
        </TouchableOpacity>
      </Animated.View >

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#a6643d'
  },
  containerLogo: {
    marginTop:100,
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    paddingBottom:30,
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    width:'90%'
  },
  input: {
    
    backgroundColor: '#dcd9c9',
    width:'90%',
    marginBottom: 10,
    color:'#222',
    fontSize:17,
    borderRadius: 7,
    padding:10
  },
  btnSubmit: {
    backgroundColor: '#d58500',
    width:'90%',
    height:45,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 7
  },
  submitText:{
    color:'#fff',
    fontSize:18
  },
  btnCreate: {
    marginTop: 10,
    backgroundColor: '#53382f',
    width:'90%',
    height:45,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 7
  },
  createText:{
    color:'#fff',
    fontSize:18
  }

});
