import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useSelector} from 'react-redux'
import { COLORS } from '../../common/colors'
import { IMAGES } from '../../common/Images'
import { shadow } from '../../utils/global'
import Card from '../../components/Card/Card'
import Title from '../../components/Title/Title'

const Explore = () => {   
    const [itemToShow, setitemToShow] = useState(10)
    const [showMenu, setshowMenu] = useState(false)

    const fetchDataSelector = useSelector(
        state => state.getDataReducer
    )

    const theme = useSelector(
        state => state.themeReducer.mode
    )

    const DropItem = (props) => {
        return(
            <TouchableOpacity 
                onPress={() => {
                    setitemToShow(props.num)
                    setshowMenu(false)
                }}
                style={styles.butContainer}>
                <Text style={[styles.viewText, styles.top, theme === 'dark' ? {color : COLORS.white} : null]}>{`Top ${props.num}`}</Text>
                
            </TouchableOpacity>
        )
    }

    const ListHeader = () => {
        return(
            <View>
                <Title title='Explore popular'/>
                <View style={[styles.arrowDownContainer, shadow, theme === 'dark' ? {backgroundColor : COLORS.darkHeader, borderColor : COLORS.darkBorder, borderWidth : wp('0.25%')} : null]}>
                    <Text style={styles.viewText}>{'View : '}</Text>
                    {showMenu ? 
                       <View>
                            <DropItem num={10}/>
                            <DropItem num={50}/>
                            <DropItem num={100}/>
                       </View> : 
                    <TouchableOpacity 
                        onPress={() => setshowMenu(true)}
                        style={styles.butContainer}>
                        <Text style={[styles.viewText, styles.top, theme === 'dark' ? {color : COLORS.white} : null]}>{`Top ${itemToShow}`}</Text>
                        <Image 
                            source={theme === 'dark' ? IMAGES.darkArrowDown : IMAGES.arrowDown}
                            resizeMode='contain'
                            style={styles.arrowDown} 
                        />
                    </TouchableOpacity> }
                </View>
            </View>
        )
    }

    return (
        <View style={styles.main}>
        
        {fetchDataSelector.isLoading ? 
            <ActivityIndicator /> :
            <FlatList 
                ListHeaderComponent={<ListHeader />}
                data={fetchDataSelector.repoData.slice(0, itemToShow)}
                initialNumToRender={itemToShow}
                renderItem={itemData => {
                    return <Card item={itemData.item}/>
                }}
                keyExtractor={(item, index) => item.id}
            />
        }
        </View>
    )
}

export default Explore

const styles = StyleSheet.create({
    main : {
        flex : 1,
        paddingHorizontal : wp('5%'),
        paddingTop : hp('3%')
    },
    arrowDownContainer : {
        borderRadius : 8,
        flexDirection : 'row',
        backgroundColor : COLORS.white,
        marginTop : hp('3%'),
        paddingVertical : hp('1.25%'),
        width : wp('35%'),
        paddingHorizontal : wp('2.5%'),
        justifyContent : 'space-evenly',
        alignItems : 'center',
        marginLeft : wp('1%'),
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