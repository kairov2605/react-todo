import React from "react";
import classNames from "classnames";

import "./List.scss";
import Badge from "../Badge";

import removeSvg from '../../assets/img/remove.svg'

const List = ({ items, isRemovable, onClick,onRemove }) => {

  const listRemove = item =>{
    if(window.confirm('Вы действительно хотите удалить этот список?')){
    onRemove(item)
    }
  }

  return (
    <ul onClick={onClick} className="list">
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames(item.className, { active: item.active })}
        >
          <i>{item.icon ? item.icon : <Badge color={item.color} />}</i>
          <span>{item.name}</span>
          {isRemovable && <img
            src={removeSvg}
            alt="Remove button"
            className="list__remove-icon"
            onClick = {() =>  listRemove(item)}
          />}
        </li>
      ))}
    </ul>
  );
};

export default List;
