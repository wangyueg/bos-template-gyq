import React, { Component } from 'react';
import { filterData } from './filterData';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Divider } from 'antd';
import { columns } from './columns';
import CommonList from '../../../components/list/index';
import Toast from '../../../../components/prompt/toast';
import * as actions from './index.action';
import * as Util from '../../../../util/';
import config from '../../../../../config/index'
import './index.less';

class Member extends Component {
	constructor(props) {
		super(props);

		this._getMemberList = this._getMemberList.bind(this);
		this._getMemberSelect = this._getMemberSelect.bind(this);
		this._clickExport = this._clickExport.bind(this);

		this.state = {
			searchParams: {},
			exportExcel: 'javascript:void(0);'
		}
	}

	_getMemberList(params) {
		this.setState({searchParams: params});
		this.props.getMemberList(params);
	}

	_getMemberSelect(params) {
		this.props.getMemberSelect(params);
		this.props.getProvince(); //获取省
	}

	componentWillUpdate (nextProps, nextState) {
		Util.fetchCallback({
			status: nextProps.MemberList.memberListStatus,
			code: nextProps.MemberList.memberListCode,
			message: nextProps.MemberList.memberListMessage,
			params: this.state.searchParams,
			updateStatus: nextProps.updateMemberListStatus
		});

		//获取下拉表，并push到对应的filterData中
		Util.fetchCallback({
			status: nextProps.MemberList.memberSelectStatus,
			code: nextProps.MemberList.memberSelectCode,
			message: nextProps.MemberList.memberSelectMessage,
			updateStatus: nextProps.updateMemberSelectStatus,
			successCallback: () => {
				let items = nextProps.MemberList.memberSelectData;
				filterData && filterData.forEach((item) => {
					if(item.type === 'select') {
						for(let i in items) {
							if(item.enumName === i) {
								item['data'] = items[i];
							}
						}
					}
				});
			}
		});

		//获取省类型下拉表
	    Util.fetchCallback({
	      status: nextProps.MemberList.getProvinceStatus,
	      code: nextProps.MemberList.getProvinceCode,
	      message: nextProps.MemberList.getProvinceMessage,
	      updateStatus: nextProps.updateGetProvinceStatus,
	      successCallback: () => {
	        let data = nextProps.MemberList.getProvinceData;
	        filterData && filterData.map((item, index) => {
	          if(item.type === 'cascader') {
	            item.linkage && item.linkage.map((i) => {
	              let enumName = i['enumName'];
	              if(data[enumName]) {
	                i['data'] = data[enumName]
	              }
	            })
	          }
	        })
	      }
	    });

	    //获取市类型下拉表
	    Util.fetchCallback({
	      status: nextProps.MemberList.getCityStatus,
	      code: nextProps.MemberList.getCityCode,
	      message: nextProps.MemberList.getCityMessage,
	      updateStatus: nextProps.updateGetCityStatus,
	      successCallback: () => {
	        let data = nextProps.MemberList.getCityData;
	        filterData && filterData.map((item, index) => {
	          if(item.type === 'cascader') {
	            item.linkage && item.linkage.map((i) => {
	              let enumName = i['enumName'];
	              if(data[enumName]) {
	                i['data'] = data[enumName]
	              }
	            });
	          }
	        })
	      }
	    });

	    //获取区类型下拉表
	    Util.fetchCallback({
	      status: nextProps.MemberList.getDistrictStatus,
	      code: nextProps.MemberList.getDistrictCode,
	      message: nextProps.MemberList.getDistrictMessage,
	      updateStatus: nextProps.updateGetDistrictStatus,
	      successCallback: () => {
	        let data = nextProps.MemberList.getDistrictData;
	        filterData && filterData.map((item, index) => {
	          if(item.type === 'cascader') {
	            item.linkage && item.linkage.map((i) => {
	              let enumName = i['enumName'];
	              if(data[enumName]) {
	                i['data'] = data[enumName]
	              }
	            });
	          }
	        })
	      }
	    });
	}

	_clickExport() {
		let searchParams = this.state.searchParams;
		if(searchParams && searchParams.registerTimeStart && searchParams.registerTimeEnd) {
			let start = new Date(searchParams.registerTimeStart.replace(/-/g, '/'));
			let end = new Date(searchParams.registerTimeEnd.replace(/-/g, '/'));
			let dataDifferent = end.getTime() - start.getTime(); //时间差
			if(dataDifferent <= 31*24*60*60*1000) {
				const ENV = Util.getENV();
				let exportExcel = Util.createUrl({
					url: window.location.origin + `${config[ENV].apiUrlFilter}/customer/exportCustomer`,
					param: this.state.searchParams,
					isExport: true
				});
				this.setState({exportExcel});
			}else {
				Toast.show('注册时间范围最大值为31天')
				this.setState({exportExcel: 'javascript:void(0);'})
			}
		}else {
			Toast.show('请选择注册时间范围');
			return false;
		}		
	}

	render() {
		let tableDataSource = this.props.MemberList && this.props.MemberList.memberListData;
		let pagination = this.props.MemberList && this.props.MemberList.memberListPage;
		
		return (
			<div className="member">
				<CommonList
					getCommonList={this._getMemberList}
					getCommonSelect={this._getMemberSelect}
					filterData={filterData}
					columns={columns}
					tableDataSource={tableDataSource}
					tableLoading={this.props.Fetch.spinning}
					pagination={pagination}
					handleChange={this.props.cascaderHandleChange}
					isShowExport={true}
					exportUrl={this.state.exportExcel}
					clickExport={this._clickExport}
				/>
			</div>
		);
	}
}

export default connect(
	(state) => {
		return {MemberList: state.MemberList, Fetch: state.Fetch}
	},
	(dispatch) => bindActionCreators({...actions}, dispatch)
)(Member);