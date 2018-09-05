export default function(state={}, action) {
	switch(action.type) {
		case 'USER_LOGOUT':
			return {
				...state,
				logoutStatus: true,
				logoutCode: action.playload.code,
				logoutMessage: action.playload.message
			}
			break;
		case 'USER_LOGOUT_FAIL':
			return {
				...state,
				logoutStatus: true,
				logoutCode: action.playload.code,
				logoutMessage: action.playload.message
			}	
			break;
		case 'USER_LOGOUT_STATUS':
			return {
				...state,
				logoutStatus: false
			}
			break;
		case 'UPDATE_PASSWORD':
			return {
				...state,
				updatePasswordStatus: true,
				updatePasswordCode: action.playload.code,
				updatePasswordMessage: action.playload.message
			}
			break;
		case 'UPDATE_PASSWORD_FAIL':
			return {
				...state,
				updatePasswordStatus: true,
				updatePasswordCode: action.playload.code,
				updatePasswordMessage: action.playload.message
			}	
			break;
		case 'UPDATE_PASSWORD_STATUS':
			return {
				...state,
				updatePasswordStatus: false
			}
			break;
		default:
			return state;
	}
}