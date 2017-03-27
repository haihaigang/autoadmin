import React from 'react'
import BaseApp from './BaseApp'
import MeiMenu from '../components/MeiMenu'

class HomeApp extends BaseApp {
	render(){
		return(
			<div>
				<MeiMenu/>
    			Hello Home
  			</div>
  		);
	}
}

export default HomeApp;