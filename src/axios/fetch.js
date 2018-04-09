import axios from 'axios';//引入axios
import { Message } from "element-ui";

export default function fetch(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({  //instance创建一个axios实例，可以自定义配置，可在 axios文档中查看详情
      //所有的请求都会带上这些配置，比如全局都要用的身份信息等。
      baseURL: "/",
      timeout: 5 * 1000, // 5秒超时
      // responseType: "json",
      // withCredentials: true,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        // 'token_in_header': global_.token,//token从全局变量那里传过来
      }
    });

    //POST传参序列化(添加请求拦截器)
    instance.interceptors.request.use(
      config => {
        // 在发送请求之前做某件事
        return config;
      },
      error => {
        console.log(error);
        Message({
          //  饿了么的消息弹窗组件,类似toast
          showClose: true,
          message: "error.data.error.message",
          type: 'error'
        });
        return Promise.reject(error);
      }
    );

    //返回状态判断(添加响应拦截器)
    instance.interceptors.response.use(
      res => {
        //对响应数据做些事
        if (res.data) {
          //success with message
          if (res.data.code === 2) {
            Message({
              message: res.data.msg,
              type: 'success'
            });
            //success with html message
          } else if (res.data.code == 3) {
            Message({
              message: res.data.msg,
              type: 'success',
              dangerouslyUseHTMLString: true
            })
            //warning with message
          } else if (res.data.code == 4) {
            Message({
              message: res.data.msg,
              type: 'warning'
            });
            //warning with html message
          } else if (res.data.code === 5) {
            Message({
              message: error.response.data.msg,
              type: 'warning',
              dangerouslyUseHTMLString: true
            });
          }
        }
        return res;
      },
      error => {
        if (error.response.data) {
          //error with message
          if (error.response.data.code === 6) {
            Message({
              message: error.response.data.msg,
              type: 'error'
            });
            //error with html message
          } else if (error.response.data.code === 7) {
            Message({
              message: error.response.data.msg,
              type: 'error',
              dangerouslyUseHTMLString: true
            });
          } else if (error.response.data.code === 9) {
            Message({
              message: error.response.data.msg,
              type: 'error'
            });
          }
        }
        return Promise.reject(error);
      }
    );

    instance(options)
      .then(response => { //then 请求成功之后进行什么操作
        resolve(response);//把请求到的数据发到引用请求的地方
      })
      .catch(error => {
        console.log('请求异常信息：' + error);
        reject(error);
      });
  });
}