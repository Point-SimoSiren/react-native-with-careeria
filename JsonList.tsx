import React from 'react';
import { Text, View, FlatList, Button } from 'react-native'; //Tänne importteihin kaikki komponentit mitä käytetään.
import styles from './styles'; //Tuotu erillinen tyylitiedosto

export default function JsonList() {
    //Muuttuja johon haettava JSONdata tallennetaan
    const [jsonData, setJsonData] = React.useState();
    //Haetaan JSONdata jsonplaceholderista ja kirjoitetaan se jsonData -muuttujaan
    const getData = () => {
        fetch("https://jsonplaceholder.typicode.com/todos")
        .then((response) => response.json())
            .then((responseData) => {
                setJsonData(responseData);
        })
    }
    return (
        <View>
            <Button
                onPress={() => getData()}
                title="Lataa TODO"
                color="#556B2F"
            />
            <FlatList
                data={jsonData} //FlatListille kerrotaan mitä dataa käytetään
                keyExtractor={(item) => item.id.toString()} //käyttää JSONista tulevaa avainta
                renderItem={({item}) => ( //Otetaan objekti item jsonData objektiesiintymästä
                <View>
                    <View style={styles.separatorLine}/>
                    <Text style={styles.itemItalic}>UserId: {item.userId.toString()}</Text>
                    <Text style={styles.itemBolded}>Title: {item.title}</Text>
                    <Text>Status: {item.completed.toString()}</Text>
                </View>
                )}
            />
        </View>
    );
}