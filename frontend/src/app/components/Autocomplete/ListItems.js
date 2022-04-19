import React from 'react'

const ListItems = ({ items, onSelect }) => {
  return (
    <ul className='dropdown-menu dropdown-menu-autocomplete show'>
      {items.map((item, index) => (
        <li
          key={item + index}
          className='dropdown-item'
          onClick={() => onSelect(item)}
        >
          {item.firstName} {item.lastName}
        </li>
      ))}
    </ul>
  )
}

export default ListItems
