import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, Platform, ScrollView, TextInput, Button } from 'react-native';
import { API_id, API_key } from './APIKeys';
import { Octicons } from '@expo/vector-icons'; //vector-icons tuodaan näin

export default function YLETekstiTV100() {
    const [imageUrl, setUrl] = useState<string>();
    const [inputPage, changeInputPage] = useState(100);
    var url = 'https://external.api.yle.fi/v1/teletext/images/' + inputPage + '/1.png?app_id=' + API_id + '&app_key=' + API_key + "&date=" + Date.now.toString();
    return (
        <View style={styles.mainContainer}>
            <ScrollView contentContainerStyle={styles.scrollViewPage}>
                <Text style={styles.title}>Ylen tekstitv:n pääsivu</Text>
                <View style={styles.separatorLine} />
                <View style={styles.searchSection}>
                    <Octicons name="triangle-left" size={45} color="black" onPress={() => changeInputPage(inputPage + 1)} />
                    {/* <Button title="<<" onPress={() => changeInputPage(inputPage-1)} />   */}
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white', fontSize: 22, textAlign: 'center', margin: 2, width: 240 }}
                        onChangeText={(text) => changeInputPage(Number(text))}
                        value={inputPage.toString()}
                    />
                    <Octicons name="triangle-right" size={45} color="black" onPress={() => changeInputPage(inputPage + 1)} />
                    {/* <Button title=">>" onPress={() => changeInputPage(inputPage+1)} /> */}
                </View>
                <View style={styles.imageSection}>
                    <Image
                        style={styles.yleTextTV}
                        resizeMode={'contain'}
                        source={{
                            uri: url,
                        }}
                    />
                </View>
            </ScrollView>
        </View>
    );
}


//***********************************
//Tyylimäärittelyt
//***********************************
const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
    },

    scrollViewPage: {
        alignItems: 'center',
        paddingTop: 0,
    },

    searchSection: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
    },

    imageSection: {
        flex: 2,
    },

    yleTextTV: {
        width: '100%',
        height: Platform.OS === 'android' ? '100%' : 240,
        aspectRatio: 1.5,
        marginTop: 1,
    },

    title: {
        fontSize: 26,
        fontWeight: '300',
        letterSpacing: 7,
        textShadowOffset: { width: 1, height: 1 },
        textShadowColor: '#D1D1D1',
        textAlign: 'center',
    },

    separatorLine: {
        marginVertical: 5,
        height: 1,
        width: '100%',
        backgroundColor: '#eee',
    },

});
