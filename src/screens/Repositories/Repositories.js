import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Modal from 'react-native-modal';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import Title from '../../components/Title/Title'
import DropItem from '../../components/DropItem/DropItem'
import { COLORS } from '../../common/colors';
import { IMAGES } from '../../common/Images';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/Card/Card';
import FilterProgLangModal from '../../components/FilterProgLangModal/FilterProgLangModal';
import { setCurrentDateAction, setFilteredRepoAction } from '../../redux/actions/filterDataAction';

const Repositories = () => {
  const [showLangFilter, setshowLangFilter] = useState(false)
  const [showDateFilter, setshowDateFilter] = useState(false)
  const [search, setSearch] = useState('')

  const dispatch = useDispatch()

  const filterData = useSelector(
    state => state.filterReucer
  )

  const repoData = useSelector(
    state => state.getDataReducer.repoData
  )

  const handleFilterData = () => {
      const data = repoData.filter(item => item.language === filterData.currentProgLang)
      const dateRepoData = repoData.filter(item => moment(item.created_at) - moment(filterData.currentDate) < 0)
      const dateLangData = data.filter(item => moment(item.created_at) - moment(filterData.currentDate) < 0)
      if (filterData.currentProgLang === 'Any') {
        dispatch(setFilteredRepoAction(dateRepoData))
      } else {
        dispatch(setFilteredRepoAction(dateLangData))
      }
  }

  useEffect(() => {
    handleFilterData()
  }, [filterData.currentProgLang])

  const handleDateFilter = () => {
    const dateFilter = repoData.filter(item => moment(item.created_at) - moment(filterData.currentDate) < 0)
    if (filterData.currentProgLang === 'Any') {
      dispatch(setFilteredRepoAction(dateFilter))
    } else {
      const newData = dateFilter.filter(item => item.language === filterData.currentProgLang)
      dispatch(setFilteredRepoAction(newData))
    }
  }
  
  useEffect(() => {
    handleDateFilter()
  
  }, [filterData.currentDate])
  
  const handleConfirm = (date) => {
    const newData = new Date(date)
    dispatch(setCurrentDateAction(newData))
    setshowDateFilter(false)
  }  

  return (
    <View style={styles.main}>
      <Title title='Repositories'/>
      <View style={styles.headerContainer}>
        <DropItem 
          title='Language'
          subTitle={filterData.currentProgLang}
          setShowModal={setshowLangFilter}
          />
        <DropItem 
          title='Date'
          subTitle={moment(filterData.currentDate).format('DD MMM YY')}
          setShowModal={setshowDateFilter}
          />
      </View>
      <FlatList 
        data={ filterData.filteredRepoByLang}
        renderItem={itemData => {
          return <Card item={itemData.item} repo={true}/>
        }}
        keyExtractor={(item, index) => item.id}
      />
      <FilterProgLangModal 
        showLangFilter={showLangFilter} 
        setshowLangFilter={setshowLangFilter} 
        search={search} 
        setSearch={setSearch}/>

      <DateTimePickerModal
        isVisible={showDateFilter}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setshowDateFilter(false)}
        date={filterData.currentDate}
      /> 
    </View>
  )
}

export default Repositories

const styles = StyleSheet.create({
  main : {
    flex : 1,
    paddingHorizontal : wp('5%'),
    paddingTop : hp('3%')
  },
  headerContainer : {
    flexDirection : 'row',
    justifyContent : 'space-between'
  },
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
  }
})