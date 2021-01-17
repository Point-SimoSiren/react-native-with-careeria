import React,{useState} from 'react';
import {StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';

export default function HelloWorldInput() {
    //HOOKS -muuttujia:
    const [counter, setCounter] = useState(0);
    const [name, setName] = useState('');
    const [outputName, changeOutputName] = useState('');
    //Esitellään array, johon nimet tallennetaan
    const [array, setArray] = useState<string[]>([]);
    //Funktio, jota buttoni kutsuu:
    const showName = (name: string) => {
        changeOutputName(name);
        setArray(array => [...array, '\n' + name]);
    }

    setTimeout(
        () => setCounter(counter + 1),
        1000
    )

    return (
        <View style={styles.container2}>
            <View>
                <Text>Terve Maailma!</Text>
            </View>
            <View>
                <Text style={styles.bigCentered}>{counter}</Text>
            </View>
            <View>
                <Text>Anna nimi:</Text>
                <TextInput 
                    style = {{ height: 40, borderColor: 'gray', backgroundColor: 'white', padding: 4, borderWidth: 1, margin: 2,}}
                    onChangeText={text => setName(text)}
                    value={name}
                />
                <Button 
                    title="Lisää henkilö"
                    onPress={() => showName(name)}
                />
                <ScrollView style={styles.scrollView} fadingEdgeLength={180}>
                    {/* <Text>{outputName}</Text> */}
                    <Text style={{fontSize: 24}}>{array}</Text>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container2: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 44,
    },
    bigCentered: {
        color: 'blue',
        fontSize: 48,
        textAlign: 'center',
    },
    scrollView: {
        width: '100%',
        marginVertical: 10,
    },
  });
