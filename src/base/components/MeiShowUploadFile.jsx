import React from 'react';
import { Modal, Message, Upload, Icon} from 'antd';
import BaseConfig from '../utils/BaseConfig';
import Storage from '../utils/Storage';

var MeiShowUploadFile = React.createClass({
	render() {
		const dataSource = this.props.dataSource || [];
	    return (
	      	<div>
	      	{dataSource.map(function(item, i){
                return  <a rel="noopener noreferrer" key={i} className="mei-show-upload"><img src={item.url} style={{display: item.url ? "block": "none"}} alt="" /></a>
            })}
		    </div>

	    );
	},
});

export default MeiShowUploadFile;