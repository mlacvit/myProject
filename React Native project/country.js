import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, Vibration, TouchableOpacity} from "react-native";
import axios from "axios";
import {random} from "./verbo";

const Country = ({dark}) => {
    const [loading, setLoading] = useState(false);
    const [country, setCountry] = useState(null);

    const getCountries = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios('https://restcountries.com/v3.1/lang/spanish');
            setLoading(false);
            const randomNumbers = random(0, 23);
            if (randomNumbers !== 4 && randomNumbers !== 14 && randomNumbers !== 15 && randomNumbers !== 16) {
                setCountry(response.data[randomNumbers]);
                console.log(response.data[randomNumbers])
            }
        }catch (e) {
            setLoading(false);
            console.log(e);
        }
    }, []);

    useEffect(() => {
        getCountries().catch(e => console.error(e.message));
    }, [getCountries]);


    return (
        <>
            {loading
                ? <>
                    <Image style={styles.hechoIcon} source={require('./assets/iconverbo.png')}/>
                </>

                : <>
                    {country
                    ? <View style={styles.container}>
                        <Image
                            style={styles.flag}
                            source={{
                                uri: `${country.flags.svg}`,
                            }}
                        />
                        <Text style={styles.country(dark)}>
                            {country.altSpellings.length > 1 ? country.altSpellings[2] : country.name.common}
                        </Text>
                        <View style={styles.titleBlock}>
                            <Text style={styles.subTitle(dark)}>capital:</Text>
                            <Text style={styles.title(dark)}>{country.capital}</Text>
                        </View>
                        <View style={styles.titleBlock}>
                            <Text style={styles.subTitle(dark)}>region:</Text>
                            <Text style={styles.title(dark)}>{country.region}</Text>
                        </View>
                        <View style={styles.titleBlock}>
                            <Text style={styles.subTitle(dark)}>subregion:</Text>
                            <Text style={styles.title(dark)}>{country.subregion}</Text>
                        </View>
                        <View style={styles.titleBlock}>
                            <Text style={styles.subTitle(dark)}>population:</Text>
                            <Text style={styles.title(dark)}>{country.population}</Text>
                        </View>
                        <View style={styles.titleBlock}>
                            <Text style={styles.subTitle(dark)}>timezones:</Text>
                            <Text style={styles.title(dark)}>{country.timezones}</Text>
                        </View>
                            <TouchableOpacity onPress={getCountries} style={styles.next(dark)}>
                                <Text>>>></Text>
                            </TouchableOpacity>
                        </View>
                    : null
                  }
                </>
            }
        </>
    );
};


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
    },
    flag: {
        width: '50%',
        height: '100%'
    },
    country:(theme)=> ({
        fontSize: 30,
        color: !theme ? '#000' : '#fff'
    }),
    titleBlock: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    title:(theme)=> ({
        fontSize: 22,
        color: !theme ? '#000' : '#fff'
    }),
    subTitle:(theme)=> ({
        fontSize: 22,
        fontWeight: 'bold',
        color: !theme ? '#000' : '#fff'
    }),
    hechoIcon: {
        position: 'absolute',
        bottom: '45%',
        left: '38%',
        width: 100,
        height: 100,
        zIndex: 105,
    },
    next:(theme)=> ({
        fontSize: 22,
        fontWeight: 'bold',

        padding: 10,
        backgroundColor: !theme ? '#b45151' : '#6db964',
        color: !theme ? '#000' : '#fff'
    }),
});
export default Country;