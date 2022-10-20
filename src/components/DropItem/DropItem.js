import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

import { IMAGES } from '../../common/Images'
import { COLORS } from '../../common/colors'
import { shadow } from '../../utils/global'
import { useSelector } from 'react-redux'

const DropItem = (props) => {
    const {title, subTitle, setShowModal} = props

    const theme = useSelector(
        state => state.themeReducer.mode
    )

    return(
        <View style={[styles.arrowDownContainer, shadow, theme === 'dark' ? {backgroundColor : COLORS.darkHeader, borderColor : COLORS.darkBorder, borderWidth : wp('0.25%')} : null]}>
            <Text style={styles.viewText}>{`${title} : `}</Text>
            <TouchableOpacity 
                onPress={() => setShowModal(true)}
                style={styles.butContainer}>
                <Text style={[styles.viewText, styles.top, theme === 'dark' ? {color : COLORS.white} : null]}>{subTitle}</Text>
                <Image 
                source={theme === 'dark' ? IMAGES.darkArrowDown : IMAGES.arrowDown}
                resizeMode='contain'
                style={styles.arrowDown} 
                />
            </TouchableOpacity> 
        </View>
        
    )
}

export default DropItem

const styles = StyleSheet.create({
    arrowDownContainer : {
        borderRadius : 8,
        flexDirection : 'row',
        backgroundColor : COLORS.white,
        marginTop : hp('3%'),
        paddingVertical : hp('1%'),
        width : wp('42.5%'),
        paddingHorizontal : wp('2.5%'),
        justifyContent : 'space-evenly',
        alignItems : 'center',
        marginHorizontal : wp('1%'),
        marginBottom : hp('0.5%')
    },
    viewText : {
        color : COLORS.deactiveColor,
        fontSize : 14,
        fontWeight : '500'
    },
    butContainer : {
        flexDirection : 'row',
        alignItems : 'center',
    },
    arrowDown : {
        height : wp('2.5%'),
        width : wp('2.5%')
    },
    top : {
        color : COLORS.black,
        fontWeight : 'bold',
        fontSize : 16,
        marginRight : wp('1.5%')
    },
})