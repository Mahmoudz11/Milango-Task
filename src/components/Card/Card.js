import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { IMAGES } from '../../common/Images'
import { COLORS } from '../../common/colors'
import { shadow } from '../../utils/global'
import { useSelector } from 'react-redux'
import moment from 'moment'

const Card = (props) => {
    const {item, repo} = props

    const theme = useSelector(
        state => state.themeReducer.mode
    )

  return (
    <View style={[styles.cardContainer, shadow, theme === 'dark' ? {backgroundColor : COLORS.darkHeader, borderColor : COLORS.darkBorder, borderWidth : wp('0.25%')} : null]}>
        {!repo ?
        <View style={styles.cardHeader}>
            <Text style={styles.tedingText}>{'Trending repository'}</Text>
            <View style={styles.rightHeader}>
                <Image 
                    source={theme === 'dark' ? IMAGES.darkStar : IMAGES.star}
                    resizeMode='contain'
                    style={styles.arrowDown}
                />
                <Text style={[styles.starText, theme === 'dark' ? {color : COLORS.white} : null]}>{'Star'}</Text>
                <View style={[styles.starContainer, theme === 'dark' ? {backgroundColor : COLORS.darkStarBackground} : null]}>
                    <Text style={[styles.starNumber, theme === 'dark' ? {color : COLORS.darkStar} : null]}>{item.stargazers_count}</Text>
                </View>
            </View>
        </View> : null }
        <View style={styles.CardTitle}>
            <Image 
                source={theme === 'dark' ? IMAGES.darkFile : IMAGES.file}
                resizeMode='contain'
                style={styles.file}
            />
            <Text style={[styles.cardTitleText, theme === 'dark' ? {color : COLORS.white} : null]}>{item.name}</Text>
        </View>
        <Text 
            numberOfLines={3}
            style={[styles.content, theme === 'dark' ? {color : COLORS.white} : null]}>{item.description}</Text>
        {!repo ? 
        <View style={styles.cardFooter}>
            <Text style={[styles.updateText, theme === 'dark' ? {color : COLORS.white} : null]}>{`Updated ${moment(item.updated_at).fromNow()}`}</Text>
            <Text style={[styles.updateText, theme === 'dark' ? {color : COLORS.white} : null]}>{item.language}</Text>
        </View> : 
        <View  style={styles.cardFooter}>
            <Text style={[styles.updateText, theme === 'dark' ? {color : COLORS.white} : null]}>{item.language}</Text>
            <View style={styles.rightHeader}>
                <Image 
                    source={theme === 'dark' ? IMAGES.darkStar : IMAGES.star}
                    resizeMode='contain'
                    style={styles.arrowDown}
                />
                <Text style={[styles.updateText, {marginLeft : wp('2.5%')}, theme === 'dark' ? {color : COLORS.white} : null]}>{item.stargazers_count}</Text>
            </View>
            <View style={styles.rightHeader}>
                <Image 
                    source={theme === 'dark' ? IMAGES.darkFork : IMAGES.fork}
                    resizeMode='contain'
                    style={styles.arrowDown}
                />
                <Text style={[styles.updateText, {marginLeft : wp('2.5%')}, theme === 'dark' ? {color : COLORS.white} : null]}>{item.forks_count}</Text>
            </View>
        </View>}
      </View>
  )
}

export default Card

const styles = StyleSheet.create({
    cardContainer : {
        backgroundColor : COLORS.white,
        marginVertical : hp('2%'),
        borderRadius : 8,
        paddingHorizontal : wp('5%'),
        marginHorizontal : wp('1%')
    },
    cardHeader : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingHorizontal : wp('2.5%'),
        paddingTop : hp('2.5%')
    },
    tedingText : {
        fontSize : 12,
        color : COLORS.deactiveColor,
        fontWeight : '700'
    },
    rightHeader : {
        flexDirection : 'row',
        alignItems : 'center'
    },
    arrowDown : {
        height : wp('2.5%'),
        width : wp('2.5%')
    },
    starText : {
        fontSize : 12,
        fontWeight : '500',
        color : COLORS.black,
        marginLeft : wp('1%')
    },
    starContainer : {
        backgroundColor : COLORS.starBackground,
        paddingVertical : hp('0.5%'),
        borderRadius : 10,
        paddingHorizontal : wp('1%'),
        marginLeft : wp('1.5%')
    },
    starNumber : {
        fontSize : 14,
        fontWeight : '600',
        color : COLORS.primary
    },
    CardTitle : {
        flexDirection : 'row',
        alignItems : 'center',
        marginTop : hp('1.5%'),
        marginBottom : hp('1%')
    },
    file : {
        height : wp('4%'),
        width : wp('4%'),
        marginRight : wp('2.5%')
    },
    cardTitleText : {
        fontSize : 18,
        fontWeight : '700',
        color : COLORS.primary
    },
    content : {
        fontSize : 15,
        fontWeight : '700',
        width : wp('75'),
        borderBottomWidth : wp('0.20%'),
        borderColor : COLORS.deactiveColor,
        paddingBottom : hp('1.5%')
    },
    cardFooter : {
        flexDirection : 'row',
        paddingVertical : hp('2.5%'),
        alignItems : 'center'
    },
    updateText : {
        fontSize : 14,
        fontWeight : '700',
        marginRight : wp('12.5%')
    }
})