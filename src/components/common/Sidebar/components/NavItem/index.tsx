import { useSwitchValue } from '@appello/common';
import clsx from 'clsx';
import React, { useLayoutEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { Icon } from '~/components/common/Icon';

import { SidebarItem } from '../..';

interface Props {
  item: SidebarItem;
  className?: string;
}

export const NavItem: React.FC<Props> = ({ item, className }) => {
  const location = useLocation();
  const {
    value: isSubItemsOpen,
    toggle: toggleSubItems,
    set: setSubItemsOpen,
  } = useSwitchValue(false);

  useLayoutEffect(() => {
    setSubItemsOpen(location.pathname.startsWith(item.link));
  }, [item.link, location.pathname, setSubItemsOpen]);

  return (
    <li className={className}>
      {item.items && (
        <>
          <button
            className={clsx('sidebar__item', { 'sidebar__item--expanded': isSubItemsOpen })}
            type="button"
            onClick={toggleSubItems}
          >
            <Icon className="sidebar__nav-icon" name={item.icon} />
            <span className="sidebar__item-title">{item.title}</span>
            <Icon className="sidebar__chevron" name="down-arrow" />
          </button>
          <ul className="sidebar__submenu">
            {item.items.map((subItem, index) => (
              <li key={index}>
                <NavLink
                  end
                  className={({ isActive }) =>
                    clsx('sidebar__item', { 'sidebar__item--active': isActive })
                  }
                  to={subItem.link}
                >
                  <span className="sidebar__item-title">{subItem.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </>
      )}
      {!item.items && (
        <NavLink
          className={({ isActive }) => clsx('sidebar__item', { 'sidebar__item--active': isActive })}
          to={item.link}
        >
          <Icon className="sidebar__nav-icon" name={item.icon} />
          <span className="sidebar__item-title">{item.title}</span>
        </NavLink>
      )}
    </li>
  );
};
