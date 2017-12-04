import React from 'react'
import { Text } from 'react-native'
import { purple } from '../utils/colors'
import {
  Header,
} from 'react-native-elements';



function CenterText (title){

	return(
		<Text style={{ color: '#fff', fontSize:14, fontFamily:'San Francisco'}}>
			{title}
		</Text>
	)
}

export default function ScreenHeader ({ title }) {
  return (
    <Header
    	backgroundColor='steelblue'
    	statusBarProps={{ barStyle: 'light-content' }}
  		centerComponent={<CenterText title={title}/>}
		/>
  )
}