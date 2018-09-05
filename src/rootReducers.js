import {combineReducers} from 'redux';
import Login from './app/login/index.reducer';
import Fetch from './middleware/fetch/index.reducer';
import Home from './app/home/index.reducer';
import MemberList from './app/member/member/list/index.reducer';
import MemberDetail from './app/member/member/detail/index.reducer';

export default combineReducers({
  Login,
  Fetch,
  Home,
  MemberList,
  MemberDetail
});