import {StyleSheet, View, Text, Pressable, Image, Vibration, TouchableOpacity} from 'react-native';
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import { Audio } from 'expo-av';
import {nameRosto, nameTiempos, nameTiemposCorto, random} from "./verbo";
import Country from "./country";

const App = () => {

  const [next, setNext] = useState({
    randomVerbo: 0,
    randomTiempo: 0,
    randomRosto: 0,
  });

  const [verbo, setVerbo] = useState(null);
  const [menu, setMenu] = useState(false);
  const [info, setInfo] = useState(false);
  const [infoCountry, setInfoCountry] = useState(false);
  const [show, setShow] = useState(false);
  const [dark, setDark] = useState(false);
  const [sound, setSound] = useState();
  const [mute, setMute] = useState(true);
  const [loading, setLoading] = useState(false);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync( require('./assets/247e5c36a6415c8.mp3'));
    setSound(sound);
    await sound.playAsync();
  };

  const getVerboData = useCallback(async () => {
    try {
      setLoading(true);
     const response = await axios('https://verbos888-default-rtdb.firebaseio.com/verbo.json');
      setLoading(false);
     setVerbo(response.data)
    }catch (e) {
      setLoading(false);
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getVerboData().catch(e => console.error(e.message));
  }, [getVerboData]);

  useEffect(() => {
    return sound
        ? () => sound.unloadAsync()
        : undefined;
  }, [sound]);

  const nextVerboRandom = useCallback(() => {
    if (verbo !== null && verbo !== undefined) {
      const newVerbo = random(0, verbo.length - 1);
      const verbos = verbo[newVerbo]
      const newTiempo = random(0, verbos.tiempo.length - 1);
      const newRosto = random(0, verbos.tiempo[newTiempo].length - 1);

      setNext({
        randomVerbo: newVerbo,
        randomTiempo: newTiempo,
        randomRosto: newRosto,
      });
    }
    setShow(false);
  }, [verbo, setNext]);


  useEffect(() => {
    nextVerboRandom();
  }, [nextVerboRandom]);

  return (
      <>
        {loading
            ? <View style={styles.loading(dark)}>
                <Image style={styles.hechoIcon} source={require('./assets/iconverbo.png')}/>
              </View>

            :  <View style={styles.container(dark)}>
              {!menu
                 ? <Pressable style={styles.burger} onPress={() => setMenu(!menu)}>
                    <Text style={styles.line(dark)}></Text>
                    <Text style={styles.line(dark)}></Text>
                    <Text style={styles.line(dark)}></Text>
                   </Pressable>
                  : <Pressable style={styles.burger} onPress={() => setMenu(!menu)}>
                    <View style={styles.linesBlock}>
                      <Text style={styles.lineRight(dark)}></Text>
                      <Text style={styles.lineLeft(dark)}></Text>
                    </View>
                   </Pressable>
              }
                {menu
                    ? <Pressable style={styles.backDrop} onPress={() => setMenu(false)}>
                       <View style={styles.menu(dark)}>
                         <Pressable onPress={() => setDark(!dark)} style={styles.menuBlock}>
                           <Text style={styles.menuItem(dark)}>
                             <Text>{dark ? '🌝' : '🌚'}</Text> Сambiar el tema
                           </Text>
                         </Pressable>
                         <Pressable onPress={() => setInfo(true)} style={styles.menuBlock}>
                           <Text style={styles.menuItem(dark)}>
                             <Text>{dark ? '❔' : '❓'}</Text> información
                           </Text>
                         </Pressable>
                         <Pressable onPress={() => setMute(!mute)} style={styles.menuBlock}>
                           <Text style={styles.menuItem(dark)}>
                             <Text>{mute ? '🔊 sonido' : '🔇 sonido'}</Text>
                           </Text>
                         </Pressable>
                         <Pressable onPress={() => setInfoCountry(!infoCountry)} style={styles.menuBlock}>
                           <Text style={styles.menuItem(dark)}>
                             <Text>{dark ? '🌎 paises de habla hispana' : '🌍 paises de habla hispana'}</Text>
                           </Text>
                         </Pressable>

                       </View>
                     </Pressable>
                    : null
                }
                {info
                    ? <View style={styles.infoWin(dark)}>
                        <Pressable
                            style={styles.close}
                            onPress={() => {
                              setInfo(false);
                              setMenu(false);
                            }}
                        >
                          <Text>❌</Text>
                        </Pressable>
                        <Text style={styles.infoWinTitle(dark)}>
                          <Text>{dark ? '❔' : '❓'}</Text> información
                        </Text>
                        <View style={styles.infoBlock(dark)}>
                          <View style={styles.infoBox}>
                            <Text style={styles.infoText(dark)}>
                              el nombre del verbo
                            </Text>
                            <Image
                                style={styles.screenShot}
                                source={require('./assets/verbo.png')}
                            />
                          </View>
                          <View style={styles.infoBox}>
                            <Text style={styles.infoText(dark)}>
                              el nombre del tiempo
                            </Text>
                            <Image
                                style={styles.screenShot}
                                source={require('./assets/tiempo.png')}
                            />
                          </View>
                          <View style={styles.infoBox}>
                            <Text style={styles.infoText(dark)}>
                              el nombre general del tiempo
                            </Text>
                            <Image
                                style={styles.screenShot}
                                source={require('./assets/tiempodos.png')}
                            />
                          </View>
                          <View style={styles.infoBox}>
                            <Text style={styles.infoText(dark)}>
                              el pronombre del verbo
                            </Text>
                            <Image
                                style={styles.screenShot}
                                source={require('./assets/rosto.png')}
                            />

                          </View>
                          <View style={styles.infoBox}>
                            <Text style={styles.infoText(dark)}>
                              abrir la sugerencia
                            </Text>
                            <Image
                                style={styles.screenShotTwo}
                                source={require('./assets/monstrar.png')}
                            />

                          </View>
                          <View style={styles.infoBox}>
                            <Text style={styles.infoText(dark)}>
                              ir al siguiente verbo
                            </Text>
                            <Image
                                style={styles.screenShotTwo}
                                source={require('./assets/proximo.png')}
                            />
                          </View>
                        </View>
                      </View>
                    : null
                }
              {infoCountry
                  ? <View style={styles.infoWin(dark)}>
                    <Pressable
                        style={styles.close}
                        onPress={() => {
                          setInfoCountry(false);
                          setMenu(false);
                        }}
                    >
                      <Text>❌</Text>
                    </Pressable>
                    <Text style={styles.infoWinTitle(dark)}>
                      {dark ? '🌎' : '🌍'} país al azar
                    </Text>

                    <Country dark={dark}/>
                  </View>
                  : null
              }
              {verbo !== null && verbo !== undefined
                  ? <>
                      <Text style={styles.textName}>{verbo[next.randomVerbo].name}</Text>
                      <Text style={styles.textTiempoCorto}>{nameTiemposCorto(next.randomTiempo.toString())}</Text>
                      <Text style={styles.textTiempo(dark)}>{'(' + nameTiempos(next.randomTiempo.toString()) + ')'}</Text>
                      <Text style={styles.textRosto(dark)}>{nameRosto(next.randomRosto.toString())}</Text>

                      <View style={styles.blockItem}>
                        {show
                            ? <Pressable onPress={() => {
                              if (!show && mute) playSound().catch();
                              setShow(!show);
                              }}>
                                <Text
                                    style={styles.item(dark)}
                                >
                                  {Object.values(verbo[next.randomVerbo].tiempo[next.randomTiempo])[next.randomRosto]}
                                </Text>
                              </Pressable>
                            : <TouchableOpacity onPress={() => {
                                if (!show && mute) {
                                  playSound().catch();
                                  Vibration.vibrate();
                                }
                                setShow(!show);
                              }}>
                              <Text style={styles.item(dark)}>{dark ? '❔' : '❓'}</Text>
                            </TouchableOpacity>
                        }
                      </View>
                    </>
                  : null
              }

                <TouchableOpacity onPress={nextVerboRandom} style={styles.btnBlock}>
                  <Image source={dark ? require('./assets/proximodark.png') : require('./assets/proximo.png')}/>
                </TouchableOpacity>

            </View>
        }
      </>
  );
};

export default App;

const styles = StyleSheet.create({
  container:(theme) =>  ({
    flex: 1,
    backgroundColor: !theme ? 'rgb(231, 235, 240)' : '#4d4d4d',
    alignItems: 'center',
    paddingTop: 130,
    position: 'relative',
    margin: 0
  }),

  loading:(theme) => ({
    backgroundColor: !theme ? 'rgb(231, 235, 240)' : '#4d4d4d',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }),
  burger: {
    display: 'flex',
    width: 40,
    height: 13,
    position: 'absolute',
    top: '7%',
    right: '4%',
    zIndex: 102,
  },

  line:(theme) =>  ({
    borderBottomColor: !theme ? '#2e2e2e' : '#fff',
    borderBottomWidth: 8,
    borderRadius: 5,
  }),

  linesBlock: {
    position: 'relative',
  },

  lineRight:(theme) =>  ({
    paddingLeft: 20,
    borderBottomColor: !theme ? '#000' : '#fff',
    borderBottomWidth: 8,
    borderRadius: 5,
    transform: [{rotate: '45deg'}],
    width: 42,
    height: 13,
    position: 'absolute',
    top: 17,
    right: 0,
    zIndex: 102,
  }),

  lineLeft:(theme) =>  ({
    paddingRight: 20,
    borderBottomColor: !theme ? '#000' : '#fff',
    borderBottomWidth: 8,
    borderRadius: 5,
    transform: [{rotate: '-45deg'}],
    width: 42,
    height: 13,
    position: 'absolute',
    top: 17,
    right: '8%',
    zIndex: 102,
  }),

  backDrop: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 101,
    backgroundColor: 'rgba(0,0,0,0.43)',
    display: 'flex',
    flexDirection: 'column',
  },

  menu:(theme) => ({
    zIndex: 101,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: '20%',
    backgroundColor: !theme ? 'rgb(231, 235, 240)' : '#4d4d4d',
    paddingTop: 130,
    paddingLeft: 20,
  }),

  menuBlock: {
    display: 'flex',
    flexDirection: 'row',
  },
  menuItem:(theme) => ({
    color: !theme ? '#000' : '#fff',
    width: '100%',
    fontSize: 20,
    marginBottom: 50,
  }),

  infoWin:(theme) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 102,
    backgroundColor: !theme ? 'rgb(231, 235, 240)' : '#4d4d4d',
  }),

  infoWinTitle:(theme) => ({
    fontSize: 30,
    zIndex: 103,
    color: !theme ? '#4d4d4d' : '#fff',
    paddingTop: 80,
    paddingLeft: 70,
  }),

  infoBlock:(theme) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: !theme ? 'rgb(231, 235, 240)' : '#4d4d4d' ,
    zIndex: 102,
    gap: 30,
    paddingTop: 70,
    paddingLeft: 20
  }),

  infoBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  screenShot: {
    width: 130,
    height: 30,
    zIndex: 102,
  },

  screenShotTwo: {
    width: 130,
    height: 70,
    zIndex: 102,
  },

  infoText:(theme) => ({color: !theme ? '#4d4d4d' : '#fff'}),

  close: {
    position: 'absolute',
    top: 50,
    right: 15,
    zIndex: 104,
  },

  hechoIcon: {
    position: 'absolute',
    bottom: '45%',
    left: '38%',
    width: 100,
    height: 100,
    zIndex: 105,
  },

  textName: {
    position: 'absolute',
    top: '25%',
    color: '#fbac0e',
    fontSize: 80,
    textShadowColor: 'rgba(0,0,0,0.28)',
    textShadowOffset: {width: 1, height: 4},
    textShadowRadius: 3
  },

  textTiempo:(theme) => ({
    color: !theme ? 'black' : '#fff',
    fontSize: 20,
    position: 'absolute',
    top: '55%',
  }),

  textTiempoCorto: {
    color: 'red',
    fontSize: 40,
    position: 'absolute',
    top: '45%',
    textShadowColor: 'rgba(0,0,0,0.28)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 3
  },

  textRosto:(theme) => ({
    color: !theme ? '#000' : '#fff',
    fontSize: 35,
    position: 'absolute',
    top: '65%',
    textShadowColor: !theme ? 'rgba(0,0,0,0.28)' : 'rgba(255,255,255,0.28)',
    textShadowOffset: {width: 1, height: 4},
    textShadowRadius: 3,
  }),

  blockItem: {
    position: 'absolute',
    bottom: '30%',
  },

  item:(theme) => ({
    backgroundColor: !theme ? 'rgba(201,212,255,0.18)' : 'rgba(238,242,255,0.18)',
    color: !theme ? '#000' : '#fff',
    paddingLeft: 70,
    paddingRight: 70,
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 30,
    borderRadius: 10,
    textShadowColor: !theme ? 'rgba(0,0,0,0.28)' : 'rgba(255,255,255,0.28)',
    textShadowOffset: {width: 1, height: 4},
    textShadowRadius: 3,
    zIndex: 100,
  }),

  btnBlock: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 100,
    zIndex: 100,
    backgroundColor: 'rgba(0,0,0,0.03)',
    paddingBottom: 20,
  },
});
