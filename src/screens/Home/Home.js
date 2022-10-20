import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IMAGES } from '../../common/Images'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { COLORS } from '../../common/colors';
import Explore from '../Explore/Explore';
import Repositories from '../Repositories/Repositories';
import { shadow } from '../../utils/global';
import { useDispatch, useSelector } from 'react-redux';
import { getProgLangAction } from '../../redux/actions/getDataAction'
import { fetchData } from '../../API/API'
import { switchMode } from '../../redux/actions/changeThemeAction';

const Home = () => {
    const [currentScreen, setcurrentScreen] = useState(0)
    const [mode, setMode] = useState(theme)

    const dispatch = useDispatch()

    const fetchDataSelector = useSelector(
        state => state.getDataReducer
    )

    useEffect(() => {
        fetchData(dispatch)
    }, [fetchDataSelector.isLoading])

    const theme = useSelector(
        state => state.themeReducer.mode
    )

    const handleThemeChange = () => { 
        dispatch(switchMode(theme === 'light' ? 'dark' : 'light'));
    }

    useEffect(() => { 
        setMode(theme);
    }, [theme]);

  return (
    <SafeAreaView style={[styles.main, theme === 'dark' ? {backgroundColor : COLORS.darkBackground} : null]}>
        <View style={[styles.header, shadow, , theme === 'dark' ? {backgroundColor : COLORS.darkHeader} : null]}>
            <View style={styles.topHeader}>
                <TouchableOpacity 
                    onPress={() => handleThemeChange()}
                    style={styles.subHeader}>
                    <Image 
                        source={IMAGES.title}
                        resizeMode='contain'
                        style={styles.headerImg} 
                    />
                    <Text style={[styles.titleText, , theme === 'dark' ? {color : COLORS.white} : null]}>{'milango'}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image 
                        source={theme === 'dark' ? IMAGES.darkSearch : IMAGES.search}
                        resizeMode='contain'
                        style={styles.headerImg} 
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.botHeader}>
                <TouchableOpacity
                    onPress={() => currentScreen === 1 ? setcurrentScreen(0) : setcurrentScreen(0)} 
                    style={[styles.headerBut, currentScreen !== 0 ? styles.deactive : null]}>
                    <Text style={[styles.butText, , currentScreen !== 0 && theme === 'dark' ? styles.deactiveText : theme === 'dark' ? {color : COLORS.white} : null]}>{'Explore'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => currentScreen === 0 ? setcurrentScreen(1) : setcurrentScreen(1)} 
                    style={[styles.headerBut, currentScreen !== 1 ? styles.deactive : null]}>
                    <Text style={[styles.butText, , currentScreen !== 1 && mode === 'dark' ? styles.deactiveText : mode === 'dark' ? {color : COLORS.white} : null]}>{'Repositories'}</Text>
                </TouchableOpacity>
            </View>
        </View>
        {currentScreen === 0 ? <Explore /> : <Repositories />}
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
    main : {
        flex : 1,
        backgroundColor : COLORS.homeColor
    },
    header : {
        backgroundColor : COLORS.white,
        paddingTop : hp('3%'),
        paddingHorizontal : wp('5%'),
    },
    topHeader : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between'
    },
    subHeader : {
        flexDirection : 'row',
        alignItems : 'center'
    },
    headerImg : {
        height : wp('6%'),
        width : wp('6%')
    },
    titleText : {
        color : COLORS.primary,
        fontSize : 26,
        fontWeight : 'bold'
    },
    botHeader : {
        flexDirection : 'row',
        marginTop : hp('5%')
    },
    headerBut : {
        borderBottomWidth : wp('0.6%'),
        paddingBottom : hp('2%'),
        borderColor : COLORS.borderColor,
        marginRight : wp('15%')
    },
    butText : {
        fontSize : 16,
        fontWeight : '600',
        color : COLORS.primary
    },
    deactive : {
        borderBottomWidth : 0
    },
    deactiveText : {
        color : COLORS.deactiveColor
    }
})