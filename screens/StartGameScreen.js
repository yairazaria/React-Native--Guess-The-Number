import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";

import Card from "../components/Card";
import Colors from "../constants/Color";
import Input from "../components/Input";
import NumberContainer from '../components/NumberContainer';

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = textInput =>{
        setEnteredValue(textInput.replace(/[^0-9]/g,''));
    };


    const resetInputHandler = () =>{
        setConfirmed(false);
        setEnteredValue('');
    };


    const confrimInputHandler = () =>{
        const chooseNumber = parseInt(enteredValue);
        if (isNaN(chooseNumber) || chooseNumber <= 0 || chooseNumber > 99) {
            Alert.alert('Invalid Number', 'Number has to be number between 1 and 99',[{
                text:'Okay',
                style:"destructive",
                onPress: resetInputHandler
            }]);
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chooseNumber);
        setEnteredValue('');
    };

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput =(
        <Card style={styles.summeryContainer}>
                <Text>You Selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title="START GMAE" onPress={() => props.onStartGame(selectedNumber)}/>
        </Card>) 
    };

  return (
    <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
    }}>
    <View style={styles.screen}>
      <Text style={styles.title}>The a New Game!</Text>
      <Card style={styles.inputContainer}>
        <Text>Select a Number</Text>
        <Input
          style={styles.input}
          blurOnSubmit
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="numeric"
          maxLength={2}
          onChangeText={numberInputHandler}
          value={enteredValue}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button color={Colors.accent} title="Reset" onPress={resetInputHandler} />
          </View>
          <View style={styles.button}>
            <Button color={Colors.primary} title="Confirm" onPress={confrimInputHandler} />
          </View>
        </View>
      </Card>
      {confirmedOutput}
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  title: {
    fontSize: 10,
    marginVertical: 10
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15
  },
  button: {
    width: 100
  },
  input: {
    width: 50,
    textAlign: 'center'
  },
  summeryContainer: {
      marginTop: 20,
      alignItems: 'center'
  }
});

export default StartGameScreen;
