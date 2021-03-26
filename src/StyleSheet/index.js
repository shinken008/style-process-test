function StyleSheet () {}
function StyleSheetValidation () {}

StyleSheet.create = function create(obj) {
  // 在开发环境会校验
  for (const key in obj) {
    StyleSheetValidation.validateStyle(key, obj)
    if (obj[key]) {
      Object.freeze(obj[key])
    }
  }
  return obj
}

StyleSheetValidation.validateStyle = function validateStyle(key, obj) {
  if (!obj[key]) {
    return
  }
  // 只能解析一层
  const styleProps = Object.keys(obj[key])
  for (const prop of styleProps) {
    StyleSheetValidation.validateStyleProp(
      prop,
      obj[key],
      'StyleSheet ' + key,
    )
  }
}