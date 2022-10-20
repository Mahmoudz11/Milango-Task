import { View, Text, TouchableOpacity, Image, TextInput, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal';
import { IMAGES } from '../../common/Images';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredLangAction, setProgLangAction } from '../../redux/actions/filterDataAction';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { COLORS } from '../../common/colors';

const FilterProgLangModal = (props) => {
    const {showLangFilter, setshowLangFilter, search, setSearch} = props

    const progLanguages = useSelector(
        state => state.getDataReducer.progLang
    )

    const filteredLangData = useSelector(
        state => state.filterReucer.filteredLangData
    )

    const dispatch = useDispatch()

    const searchFilterFunc = (text) => {
        if (text) {
            setSearch(text)
            const newData = progLanguages.filter(item => {
                const itemData = item.langName ? item.langName.toUpperCase() : ''.toUpperCase()
                const textData = text.toUpperCase()
                return itemData.indexOf(textData) > -1
            })
            dispatch(setFilteredLangAction(newData))
        } else {
            dispatch(setFilteredLangAction(progLanguages))
        }
    }

    const LangHeader = () => {
        return(
        <TouchableOpacity
            onPress={() => {
            dispatch(setProgLangAction('Any'))
            setshowLangFilter(false)
            }}
            style={styles.langContainer}
            >
            <Text style={styles.langText}>{'Any'}</Text>
        </TouchableOpacity>
        )
    }

    const Border = () => {
        return <View style={styles.border}/>
    }

  return (
    <Modal
        isVisible={showLangFilter}
        onBackdropPress={() => setshowLangFilter(false)}
        >
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text>{'Select Language'}</Text>
              <TouchableOpacity
                onPress={() => setshowLangFilter(false)}
                >
                <Image 
                  source={IMAGES.closeImg}
                  resizeMode='contain'
                  style={styles.closeImg}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.searchContainer}>
              <TextInput
                placeholder='Filter Languages'
                onChangeText={text => searchFilterFunc(text)}
                style={styles.textInput}
                />
              <Image 
                source={IMAGES.search}
                resizeMode='contain'
                style={styles.search}
              />
            </View>
            {search === '' ?
            <FlatList
              data={progLanguages}
              ListHeaderComponent={<LangHeader />}
              renderItem={itemData => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(setProgLangAction(itemData.item.langName))
                      setshowLangFilter(false)
                    }}
                    style={styles.langContainer}
                    >
                    <Text style={styles.langText}>{itemData.item.langName}</Text>
                  </TouchableOpacity>
                )
              }}
              ItemSeparatorComponent={<Border />}
              style={styles.list}
              /> 
            :
            <FlatList 
                data={filteredLangData}
                renderItem={itemData => {
                  return (
                    <TouchableOpacity
                      onPress={ () => {
                        dispatch(setProgLangAction(itemData.item.langName))
                        setSearch('')
                        setshowLangFilter(false)
                      }}
                      style={styles.langContainer}
                      >
                      <Text style={styles.langText}>{itemData.item.langName}</Text>
                    </TouchableOpacity>
                  )
                }}
                ItemSeparatorComponent={<Border />}
                style={styles.list}/> }
          </View>
      </Modal>
  )
}

export default FilterProgLangModal

const styles = StyleSheet.create({
    modal : {
        // flex : 1,
        backgroundColor : COLORS.white,
        borderRadius : 8,
        paddingHorizontal : wp('5%'),
      },
      closeImg : {
        height : wp('5%'),
        width : wp('5%')
      },
      modalHeader : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingVertical : hp('2.5%')
      },
      searchContainer : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        borderWidth : wp('0.25%'),
        borderRadius : 10,
        borderColor : COLORS.deactiveColor,
        paddingHorizontal : wp('2.5%'),
        marginBottom : hp('2.5%'),
        height : hp('5%')
      },
      search : {
        height : wp('4%'),
        width : wp('4%')
      },
      langContainer : {
        paddingHorizontal : wp('3.5%'),
        paddingVertical : hp('1.25%')
      },
      langText : {
        fontSize : 16,
        fontWeight : '400',
        color : COLORS.black,
        
      },
      border : {
        borderBottomWidth : wp('0.1%'),
      },
      list : {
        height : hp('37.5%')
      },
      textInput : {
        flexGrow : 1
      }
})