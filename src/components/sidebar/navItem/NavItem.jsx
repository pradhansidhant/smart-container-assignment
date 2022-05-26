import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './navItem.module.css';
import NavItemHeader from './NavItemHeader.jsx';

const NavItem = props => {
  const { label, Icon, to, children } = props.item;

  if (children) {
    return <NavItemHeader item={props.item} />;
  }

  return (
    <NavLink
      exact="true"
      to={"/"+to}
      className={style.navItem}
      style={({ isActive }) => ({
        color: isActive ? '#22E3A7' : '#d1d5db',
        background: isActive ? '#1e3a8a' : '#1e40af',
      })}
    >
      <Icon className={style.navIcon} />
      <span className={style.navLabel}>{label}</span>
    </NavLink>
  );
};

export default NavItem;