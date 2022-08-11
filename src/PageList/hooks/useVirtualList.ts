import { useEffect, useMemo, useRef, useState } from "react";

/**
 * 利用 数据驱动 去实现虚拟滚动
 */
const useVirtualList = <T>(list: T[], options: {
    totalHeight: number;
    screenHeight: number;
    showNumber: number;
    offset: number;
}) => {
    const [offset, setOffset] = useState(1);

    const index = useRef(1);

    const dataSource = useMemo(() => {
        const start = index.current > 1 ? +(index.current * options.showNumber).toFixed(0) : 0;
        const end = start + options.showNumber;
        console.log(start, end);

        return list.slice(start, end);
    }, [offset, list])

    useEffect(() => {


        console.log('---asdasd',+options.offset+options.screenHeight , options.totalHeight);

        if (+options.offset+options.screenHeight >= options.totalHeight-1) {
            index.current += 1;
            setOffset(options.offset);
        }

    }, [options.offset])


    
    return { position: offset, dataSource }

}

export default useVirtualList;