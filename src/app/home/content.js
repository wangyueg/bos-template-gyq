import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Layout} from 'antd';
import MemberList from '../member/member/list/index';
import MemberDetail from '../member/member/detail/index';

const {Content} = Layout;

let Contents = ({style}) => {
  return (
    <Content style={style}>
      <Switch>
        <Route path="/member/member/list" component={MemberList}/>
        <Route path="/member/member/detail" component={MemberDetail}/>

        <Redirect to='/member/member/list'/>
      </Switch>
    </Content>
  );
}

export default Contents;