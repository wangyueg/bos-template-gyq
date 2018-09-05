export default function(state={}, action) {
	switch(action.type) {
		case 'GET_MEMBER_DETAIL':
			return {
				...state,
				memberDetailStatus: true,
				memberDetailCode: action.playload.code,
				memberDetailData: action.playload.data
			}
			break;
		case 'GET_MEMBER_DETAIL_FAIL':
			return {
				...state,
				memberDetailStatus: true,
				memberDetailCode: action.playload.code,
				memberDetailMessage: action.playload.message
			}	
			break;
        case 'UPDATE_MEMBER_DETAIL_STATUS':
            return {
                ...state,
                memberDetailStatus: false

            }
            break;
        default:
			return state;
	}
}