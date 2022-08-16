import { useMemo, useState, useRef, useLayoutEffect } from "react";

import ArrowDownIcon from "../../../assets/svg/arrow-down.svg";
import CardContent from "../CardContent";

import type { GetListReponseItem } from "../../api";

import "./style.css";

type Props = {
  list: GetListReponseItem[];
  title: string;
  index: number;
  updateItemHeight: (params: { index: number; height: number }) => void;
};

const ExpandCard: React.FC<Props> = ({
  title,
  list,
  updateItemHeight,
  index,
}) => {
  const [expanded, setExpand] = useState(true);

  const cardNode = useRef<HTMLElement>();

  const containerNode = useRef<HTMLElement>();

  const onClickExpand = () => {
    setExpand(!expanded);
  };

  /**  控制 arrow-icon 的方向 */
  const iconClassName = useMemo(() => (expanded ? "" : "expanded"), [expanded]);

  const [containerHeight, setContainerHeight] = useState<string | number>("");

  /** 过渡完成处理 */
  const onTransitionEnd = () => {
    const height = cardNode.current!.clientHeight;
    updateItemHeight({ index, height });
  }

  // 设置容器高度
  useLayoutEffect(() => {
    const height = containerNode.current!.clientHeight;
    setContainerHeight(height);
  }, []);

  return (
    <div className="expand-card" ref={(node) => (cardNode.current = node!)}>
      <div className="card-head" onClick={onClickExpand}>
        <img
          className={`arrow-icon ${iconClassName}`}
          src={ArrowDownIcon}
          alt="arrow-icon"
        />
        <span className="card-title">{title}</span>
      </div>

      <div
        onTransitionEnd={onTransitionEnd}
        style={{ height: expanded ? containerHeight : 0 }}
        className={`expand-container ${iconClassName ? "container-" + iconClassName : ""
          }`}
        ref={(node) => (containerNode.current = node!)}
      >
        {list.map((item) => {
          return (
            <div className="container-item" key={item.id}>
              <CardContent data={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpandCard;
