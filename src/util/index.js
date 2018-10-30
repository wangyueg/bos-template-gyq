/* jshint esversion: 6 */
import moment from 'moment';
import Toast from '../components/prompt/toast';
import Dialog from '../components/dialog/';
import * as __URL__ from '../../config/index';

const createUrl = (request) => {
  let url = request.url;
  let param = request.param;

  if (param) {
    url = !url.includes('?') && url + '?';
    for (let key of Object.keys(param)) {
      url = url + key + '=' + encodeURI(param[key]) + '&';
    }
    if (url.endsWith('&')) {
      url = url.substring(0, url.length - 1);
    }
  }
  return url;
};

const getUrlArg = (name, isSearchFromCookies) => {
  let search = window.location.search;
  //IE9(通过window.history.replaceState来判断IE9和其他浏览器，不考虑IE8及以下浏览器)时，search的值从cookie中获取
  if(isSearchFromCookies && !window.history.replaceState) {
    search = unescape(getCookie('CURRENT_SEARCH'));
  }
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let arg = search.substr(1).match(reg);
  return arg ? arg[2] : '';
};

//判断字符串/数组/对象/不为空时返回true
const isNotNull = (obj) => {
  if (obj instanceof Object) {
    for (var a in obj) {
      return true;
    }
    return false;
  }
  return typeof(obj) != 'undefined' && obj !== null && ($.isArray(obj) ? obj.length !== 0 : obj !== "");
};

//时间转换函数
const fmtDate=(obj) =>{
  var date = new Date(obj);
  var y = 1900 + date.getYear();
  var m = "0" + (date.getMonth() + 1);
  var d = "0" + date.getDate();
  return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
};

//向data里面添加初始化（initalValue）值
const setInitialValue = (items, values) => {
  items && items.forEach((item) => {
    if (item.type === 'cascader') {
      setInitialValue(item.linkage, values);
    }
    let value = values && values[item.id];
    if (value === 0 || value) {
      if (item.type === 'datepicker') {
        value = moment(fmtDate(value), 'YYYY-MM-DD');
      } else if (item.type === 'switch') {
        value === 0 ? value = false : value = true;
      }
      item.initialValue = value;
    } else {
      item.initialValue = '';
    }
  });
};

const getAuthUrl = () => {
  const ENV = process.env.CURRENT_ENV ;
  let authUrl = __URL__[ENV]['authUrl'];
  let apiUrl = __URL__[ENV]['apiUrl'];
  return authUrl + '?originUrl=' + apiUrl;
}
/*
 *argus: object，里面包含参数
 *status
 *code
 *message
 *params: 当前列表搜索的参数值，fetch成功之后，无刷新更改浏览器URL
 *isShowDialog: 控制当code不等于-1、0的时候，是否显示Dialog，还是Toast
*/
const fetchCallback = (argus) => {
  const { status, code, message, params, updateStatus, successCallback, isShowToastSuccess, successText, isShowDialog } = argus;
  if(status) {
    updateStatus();

    if(code && code !== 0) {
      if(code >= 500) {
        Toast.show('服务器异常');
      }else if(code >= 400) {
        if(code == 404) {
          Toast.show('服务器找不到请求地址');
        }else if(code == 414) {
          Toast.show('请求的 URI（通常为网址）过长，服务器无法处理');
        }else {
          Toast.show('错误请求');
        }
      }else if(code >= 300) {
        Toast.show('网络异常');
      }else if(code == -1) {
        window.location.href = getAuthUrl();
      }else {
        !isShowDialog ? Toast.show(message) : Dialog.open({
          message: message,
          dialogButton: [
            {
              text: '确定',
              type: 'primary',
              clickHandle: () => {
                Dialog.close();
              }
            }
          ]
        });
      }
    }else if(code === 0) {
      isShowToastSuccess ? Toast.show(successText || message) : null;

      if(params) {
        //获取列表数据成功之后，无刷新更新URL
        let url = createUrl({
          url: window.location.origin + window.location.pathname,
          param: params        
        });
        //IE9中history对象不支持replaceState，IE9中不支持HTML5模式
        if(window.history.replaceState) {
          window.history.replaceState({}, 0, url);
        }else {
          //当IE9中使用cookie保存当前URL
          let search = createUrl({
            url: '',
            param: params        
          });
          setCookie('CURRENT_SEARCH', search);
        }  
        
      }

      successCallback && successCallback();
    }
  }
};

const getCookie = (cookieName) => {
  let cookieStr = decodeURI(document.cookie);  
  let arr = cookieStr.split("; ");
  let cookieValue = ''; 
  for(let i=0;i<arr.length;i++){  
    let temp = arr[i].split("=");  
    if(temp[0]==cookieName){  
      cookieValue = temp[1];  
      break;  
    }  
  }  
  return decodeURI(cookieValue);
};

const setCookie = (name, value) => {
  let days = 30;
  let exp = new Date();
  exp.setTime(exp.getTime() + days*24*60*60*1000);
  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()
}

export {
  createUrl,
  getUrlArg,
  isNotNull,
  fmtDate,
  setInitialValue,
  fetchCallback,
  getCookie,
  getAuthUrl
}