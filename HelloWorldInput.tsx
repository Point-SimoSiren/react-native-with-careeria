import React,{useState} from 'react';
import {StyleSheet, Text, TextInput, View, Button, ScrollView, TouchableOpacity } from 'react-native';

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
        setArray(array => [...array, name + '\n']);
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
            <View style={styles.container3}>
                <Text>Anna nimi:</Text>
                <TextInput 
                    style = {{ height: 40,  width: 120, borderColor: 'gray', backgroundColor: 'white', padding: 4, borderWidth: 1, margin: 2,}}
                    onChangeText={text => setName(text)}
                    value={name}
                />
                <View style = {{ width: 120,}}>
                    <Button 
                        title="Lisää henkilö"
                        onPress={() => showName(name)}
                    />
                </View>
                <TouchableOpacity style={{ marginTop: 1, backgroundColor: 'gray' }} onPress={() => setArray([])}>
                    <Text style={{ height: 40, width: 120, textAlign: 'center', fontSize: 18, textAlignVertical: 'center', 
                    padding: 1, borderWidth: 1, borderColor: 'gray'}}>Tyhjennä</Text>
                </TouchableOpacity>    
                <ScrollView style={styles.scrollView} fadingEdgeLength={180}>
                    {/* <Text>{outputName}</Text> */}
                    <Text style={{ textAlign: 'center', fontSize: 24}}>{array}</Text>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container2: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        padding: 1,
    },
    container3: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        padding: 1,
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
