/**
render() {
  return (
    <View className='app'>
      <View className='nav marginLeft10'>
        nav
      </View>
      <View className='box'>
        <View className='header'>
          header
      	</View>
      </View>
    </View>
  )
}
 */

const stylesheet = {
  app: {
    color: 'blue',
    nav: {
      height: 100,
    },
    box: {
      color: 'yellow',
      header: {
        color: 'red',
      }
    }
  },
  marginLeft10: {
    marginLeft: 10,
  }
}
                                                                                                                                                                                                                                                        
function extract(className, obj) {
  const style = {}
  const value = obj[className]
  if (typeof value === 'string' || typeof value === 'number') {
    style[className] = value
  }
  return style
}

/**
 * 返回 entries, 使用 new Map(entries) 去重
 * @param {*} node 
 * @param {*} tree 
 */
function deepTravel(node, tree) {
  Object.keys(tree).forEach((key) => {
    const props = []
    if (typeof tree[key] === 'string' || typeof tree[key] === 'number') {
      props.push([key, tree[key]])
    }
    if (node === key && typeof tree[key] === 'object') {
      
      // break;?
    }
  })
}

/**
 * 
 * 
 // .scss
 .grandParent {
   .parent {
      .self {

      }
   }
   .self {

   }
 }
 // 嵌套的越深，查找效率越低，与层级成指数增长
 // [0,1] 2   1, 01
 // [0,1,2] 4   2, 12, 02, 012
 // [0,1,2,3] 8   3, 23, 13, 03, 123, 013, 023, 0123
 // [0,1,2,3,4] 16   4, 34, 24, 14, 04, 234, 134, 034, 124, 024, 014, 1234, 0234, 0134, 0124, 01234
 // .html
 <View className="grandParent">
  <View className="grandParent.parent">
    <View className="grandParent.parent.self">

    </View>
  </View>
 </View>
 * 
 */

/**
 * className='...grandParent.parent.self' 处理
 */
