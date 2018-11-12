export const getisLogin=({commit},data)=>{
	commit('getisLogin',data)
}

export const getusers=({commit},data)=>{
	commit('getusers',data)
}

export const cleardata=({commit},data)=>{
	commit('getusers',{})
	commit('getisLogin',false)
}
