import React, { useState } from 'react';
import { Text, View, ScrollView, Pressable, Platform, TextInput, Switch } from 'react-native';
import { FontAwesome5} from '@expo/vector-icons'; //iconit käyttöön!
import styles from './styles/styles';


import {Picker} from '@react-native-picker/picker'; //Lisätty dropdown https://reactnative.dev/docs/picker on deprecated, joten käytetään ohjeistuksen mukaista pickeriä

interface INWProductsResponse {
    //Typescript -interface käytetään productItems -muuttujassa json
    productId: number;
    productName: string;
    supplierId: number;
    categoryId: number;
    quantityPerUnit: string;
    unitPrice: number;
    unitsInStock: number;
    unitsOnOrder: number;
    reorderLevel: number;
    discontinued: boolean;
    imageLink: string;
    category: string;
    supplier: string;
    checked: any;
}               
const CreateProduct = (props: { closeModal: any, refreshAfterEdit: any }) => {
    // let ProductId = props.passProductId; //Propsi, jonka kutsuva ohjelma asettaa tälle komponentille
    const [ProductName, setProductName] = useState('...');
    const [SupplierId, setSupplierId] = useState('0');
    const [CategoryId, setCategoryId] = useState('0');
    const [QuantityPerUnit, setQuantityPerUnit] = useState('0');
    const [UnitPrice, setUnitPrice] = useState('0');
    const [UnitsInStock, setUnitsInStock] = useState('0');
    const [UnitsOnOrder, setUnitsOnOrder] = useState('0');
    const [ReorderLevel, setReorderLevel] = useState('0');
    const [Discontinued, setDiscontinued] = useState(false);
    const [ImageLink, setImageLink] = useState('...');
    //HOX Validation - jos ei mene läpi, ei tallennapainike ole aktiivinen
    let validaatio = false;

   //Funktio jossa lähetetään uudet syötetyt tiedot tietokantaan
   function PostToDB() {
    const product =
    {
        ProductName: ProductName,
        SupplierID: Number(SupplierId),
        CategoryID: Number(CategoryId),
        QuantityPerUnit: QuantityPerUnit,
        UnitPrice: parseFloat(Number(UnitPrice).toFixed(2)),
        UnitsInStock: Number(UnitsInStock),
        UnitsOnOrder: Number(UnitsOnOrder),
        ReorderLevel: Number(ReorderLevel),
        Discontinued: Boolean(Discontinued),
        ImageLink: ImageLink,
    };

    //konvertoidaan muuttuja JSON-string -tyyppiseksi
    const prodeditJson = JSON.stringify(product);
    //console.log(prodeditJson);

    const apiUrl = "https://webapivscareeria.azurewebsites.net/nw/products/";
    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json; charset=utf-8"
        },
        body: prodeditJson //lähetetään convertoitu data...
        })
            .then((response) => response.json())
            .then((json) => {
                const success = json;
                if (success) {
                    console.log(success);
                }
                else {
                    console.log('Error creating' + ProductName)
                }
            });
}

    //Tuotteen lisäys
    async function createProductOnPress() {
        if (Platform.OS === 'web') {
            await PostToDB();
            alert('Tuote ' + ProductName + ' lisätty onnistuneesti');
            closeModalAndRefresh();
        }
        else {
            await PostToDB();
            alert('Tuote ' + ProductName + ' lisätty onnistuneesti!');
            closeModalAndRefresh();
        }
    }

   
    //Sulje details -button
    function closeModal() {
        props.closeModal(true);
    }
    //Suljetaan ikkuna ja päivitetään lista
    function closeModalAndRefresh() {
        props.closeModal();
        props.refreshAfterEdit();
    }

    //2-vaihe Validointi
    function priceValidation(price: string, field: string) {
        //alert(price) ;
        // alert(typeof(price));
        if ((price == '') || (price === null ) || ( price.indexOf(',') > 0 )) {
            validaatio = false;
            return false;
        }
        else {
            validaatio = true;
            return true;
        }
    }

    //Tulostetaan sivu
    return (
        <View style={styles.inputContainer}>
            <ScrollView>
                <View>
                    <Pressable onPress={() => closeModal()}>
                        <View 
                            style={{ alignSelf: 'flex-end', marginRight: 15, }}><FontAwesome5 name="window-close" size={24} color="black" />
                        </View>
                    </Pressable>

                    <Text style={styles.inputHeaderTitle}>Tuotteen muokkaus:</Text>
                    <Text style={styles.inputTitle}>ID:</Text>
                    <TextInput style={styles.inputTitle}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        editable={false}
                    />

                    <Text style={styles.inputTitle}>Nimi:</Text>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setProductName(val)}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        selectTextOnFocus={true}
                    />
                     { ProductName ? null : ( <Text style={styles.validationError}>Anna tuotteen nimi!</Text> )}  
        
                    <Text style={styles.inputTitle}>Hinta:</Text>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setUnitPrice(val)}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        keyboardType='numeric'
                        selectTextOnFocus={true}
                    />
                    { priceValidation(UnitPrice, 'UnitPrice') == true ? null : ( <Text style={styles.validationError}>Anna hinta muodossa n.zz!</Text> )}

                    <Text style={styles.inputTitle}>Varastossa:</Text>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setUnitsInStock((val))}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        keyboardType='numeric'
                        selectTextOnFocus={true}
                    />

                    <Text style={styles.inputTitle}>Hälytysraja:</Text>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setReorderLevel(val)}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        keyboardType='numeric'
                        selectTextOnFocus={true}
                    />

                    <Text style={styles.inputTitle}>Tilauksessa:</Text>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setUnitsOnOrder(val)}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        keyboardType='numeric'
                        selectTextOnFocus={true}
                    />

                    <Text style={styles.inputTitle}>Kategoria:</Text>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setCategoryId(val)}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        keyboardType='numeric'
                        selectTextOnFocus={true}
                    />

                    <Text style={styles.inputTitle}>Pakkauksen koko:</Text>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setQuantityPerUnit(val)}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        keyboardType='numeric'
                        selectTextOnFocus={true}
                    />

                    <Text style={styles.inputTitle}>Tavarantoimittaja:</Text>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setSupplierId(val)}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        keyboardType='numeric'
                        selectTextOnFocus={true}
                    />

                    <Text style={styles.inputTitle}>Tuote poistunut:</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 15, }}>
                        <Text style={{ marginRight: 4, }}>Ei</Text>
                        <Switch
                            value={Discontinued}
                            onValueChange={val => setDiscontinued(val)}
                        />
                        <Text style={{ marginLeft: 4, }}>Kyllä</Text>
                    </View>

                    <Text style={styles.inputTitle}>Kuvan linkki:</Text>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setImageLink(val)}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        selectTextOnFocus={true}
                    />
                    <Pressable
                        style={styles.submitButton}
                        onPress={
                            () => createProductOnPress()
                        }
                    >
                        <Text style={styles.submitButtonText}>{' Lisää tuote '}</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}

export default CreateProduct;