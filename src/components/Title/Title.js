import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../../common/colors'
import { useSelector } from 'react-redux'

const Title = (props) => {
  const theme = useSelector(
    state => state.themeReducer.mode
  )

  return (
    <View>
      <Text style={[styles.title, theme === 'dark' ? {color : COLORS.white} : null]}>{props.title}</Text>
    </View>
  )
}

export default Title

const styles = StyleSheet.create({
    title : {
        color : COLORS.black,
        fontSize : 20,
        fontWeight : '700'
    },
})