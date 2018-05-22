const state = {  // 设置属性
   menuItems:{}
}

const getters = {  // 获取属性的状态  使用(getters)
   getItems:state => state.menuItems
}

const mutations = {  // 改变属性的状态 使用(commit)
   setItems(state,data){
      state.menuItems = data
   },
   //将匹配对象,在 menuitems 数组中删除
   removeItems(state,data){
      state.menuItems.forEach((item,index) => {
         if(item == data){
            state.menuItems.splice(index,1)
         }
      })
   },
   //将新添加的pizza push到menuitems属性中
   pushItems(state,data){
      state.menuItems.push(data)
   }
}

const actions = {  // 应用 mutations  使用(dispatch)

}

export default {state,getters,mutations,actions}
