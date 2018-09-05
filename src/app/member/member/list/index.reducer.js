export default function(state={}, action) {
	switch(action.type) {
		case 'GET_MEMBER_LIST':
			console.log(action)
			return {
				...state,
				memberListStatus: true,
				memberListCode: action.playload.code,
				memberListData: action.playload.data,
				memberListPage: action.playload.page
			}
			break;
		case 'GET_MEMBER_LIST_FAIL':
			return {
				...state,
				memberListStatus: true,
				memberListCode: action.playload.code,
				memberListMessage: action.playload.message
			}	
			break;
		case 'UPDATE_GET_MEMBER_LIST_STATUS':
			return {
				...state,
				memberListStatus: false
			}
			break;
		case 'GET_MEMBER_SELECT':
			return {
				...state,
				memberSelectStatus: true,
				memberSelectCode: action.playload.code,
				memberSelectData: action.playload.data
			}
			break;
		case 'GET_MEMBER_SELECT_FAIL':
			return {
				...state,
				memberSelectStatus: true,
				memberSelectCode: action.playload.code,
				memberSelectMessage: action.playload.message
			}	
			break;
		case 'UPDATE_GET_MEMBER_SELECT_STATUS':
			return {
				...state,
				memberSelectStatus: false
			}
			break;
		case 'GET_PROVINCE':
			return {
				...state,
				getProvinceStatus: true,
				getProvinceCode: action.playload.code,
				getProvinceMessage: action.playload.message,
				getProvinceData: action.playload.data
			}
			break;
		case 'GET_PROVINCE_FAIL':
			return {
				...state,
				getProvinceStatus: true,
				getProvinceCode: action.playload.code,
				getProvinceMessage: action.playload.message
			}
			break;
		case 'UPDATE_GET_PROVINCE_STATUS':
			return {
				...state,
				getProvinceStatus: false
			}
			break;
		case 'GET_CITY':
			return {
				...state,
				getCityStatus: true,
				getCityCode: action.playload.code,
				getCityMessage: action.playload.message,
				getCityData: action.playload.data
			}
			break;
		case 'GET_CITY_FAIL':
			return {
				...state,
				getCityStatus: true,
				getCityCode: action.playload.code,
				getCityMessage: action.playload.message
			}
			break;
		case 'UPDATE_GET_CITY_STATUS':
			return {
				...state,
				getCityStatus: false
			}
			break;
		case 'GET_DISTRICT':
			return {
				...state,
				getDistrictStatus: true,
				getDistrictCode: action.playload.code,
				getDistrictMessage: action.playload.message,
				getDistrictData: action.playload.data
			}
			break;
		case 'GET_DISTRICT_FAIL':
			return {
				...state,
				getDistrictStatus: true,
				getDistrictCode: action.playload.code,
				getDistrictMessage: action.playload.message
			}
			break;
		case 'UPDATE_GET_DISTRICT_STATUS':
			return {
				...state,
				getDistrictStatus: false
			}
			break;
		default:
			return state;
	}
}