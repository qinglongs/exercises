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

    const index = useRef(0);

    const dataSource = useMemo(() => {
        const start = (index.current * options.showNumber);

        const end = start + options.showNumber;

        return list.slice(start, end,);
    }, [options.showNumber, list])

    useEffect(() => {
        if (!options.totalHeight) return;

        if (+options.offset + options.screenHeight >= options.totalHeight) {
            index.current += 1;
            setOffset(+options.offset + options.screenHeight);
        }

    }, [options.offset, list, options.totalHeight, options.screenHeight])



    return { position: offset, dataSource }

}

export default useVirtualList;