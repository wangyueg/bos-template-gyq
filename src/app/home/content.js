import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Layout} from 'antd';
import MemberList from '../member/member/list/index';
import MemberDetail from '../member/member/detail/index';
import Welcome from '../welcome/index';
import Permission from '../permission/index';

const {Content} = Layout;

let Contents = ({style}) => {
  return (
    <Content style={style}>
      <Switch>
        <Route path="/member/member/list" component={MemberList}/>
        <Route path="/member/member/detail" component={MemberDetail}/>
        <Route path="/welcome" component={Welcome}/>
        <Route path="/permission" component={Permission}/>

        <Redirect to='/welcome'/>
      </Switch>
    </Content>
  );
}

export default Contents;