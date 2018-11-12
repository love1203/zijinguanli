import axios from 'axios';
import { Loading,Message } from 'element-ui';

let load;

function startloading(){
	load=Loading.service({
		lock:true,
		text:'拼命加载中...',
		background:'rabg(0,0,0,0.7)'
	})
}

function endloading(){
	load.close()
}


axios.interceptors.request.use(
config=>{
	startloading()
	if(localStorage.jwToken){
		config.headers.Authorization=localStorage.jwToken
	}
	return config;
},
error => {
    return Promise.reject(error);
}
);


axios.interceptors.response.use(
	response => {
		endloading()
		return response;
	},
	error => {
		endloading()
		return Promise.reject(error);
	}
);


export default axios