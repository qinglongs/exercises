import { useState } from 'react';
import { isEqual, cloneDeep } from 'lodash';



/**
 * @method 深比较变量，监听变化并返回新的变量
 * @returns  返回的深比较处理过后的数据
 */
function useDeepComparison<T>(val: T, defaultValue?: any): T {
  const [value, setValue] = useState(val || defaultValue);
  
  if (val && !isEqual(val, value)) {
    setValue(cloneDeep(val));
  }
  return value;
};

export default useDeepComparison;
