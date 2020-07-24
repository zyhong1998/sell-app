/**
 * 发送ajax封装函数
 * create giao 2020--7-20
 */

// 引入axios 和qs
import axios from 'axios'
import qs from 'qs';

// 服务器地址 写上以后 所有的请求 会自动在前面拼接这个地址
axios.defaults.baseURL = "http://127.0.0.1:5000";
axios.defaults.timeout = 5000; // 超时

// 通用的get和post请求
export default {
    // get
    get(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios
                .get(url, { params })
                .then((response) => {
                    resolve(response.data)//成功
                }).catch((err) => {
                    reject(err)//失败
                })
        })
    },
    // post
    post(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios
                .post(url, qs.stringify(params))
                .then((response) => {
                    resolve(response.data)//成功
                }).catch((err) => {
                    reject(err)//失败
                })
        })
    }
}