import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { getSideBarContents } from "../utils/appUtils";
import { connect } from "react-redux";

const SidebarContent= ({invoice}) => {
  const [collapsed, setCollapsed] = useState(true);
  const [activeSubMenu, setActiveSubMenu] = useState();
  const [hoveredMenu, setHoveredMenu] = useState();
  const menuItems = getSideBarContents();
  const {leftSideBarType} = invoice 
  const toggleSubMenu = (label) => {
    setActiveSubMenu(activeSubMenu === label ? null : label);
  };
  
  useEffect(() => {
    if (leftSideBarType === 'default') {
      setCollapsed(false);
    } else {
      setCollapsed(true);
    }
  }, [leftSideBarType]);

  return (
    <div
      className={`sidebar ${collapsed ? "collapsed" : ""}`}
      style={styles.sidebar(collapsed) }
    >
      <ul style={styles.menuList} className="menu-list">
        {menuItems.map((item) => (
          <li
            key={item.label}
            className={`menu-item ${collapsed ? 'mb-3' : ''}`}
            style={styles.menuItem }
            onMouseEnter={() =>
              collapsed && item.hasSubMenu && setHoveredMenu(item.label)
            }
            onMouseLeave={() => collapsed && setHoveredMenu(null)}
          >
            <div
              className="menu-link"
              style={styles.menuLink}
              onClick={() =>
                !collapsed && item.hasSubMenu && toggleSubMenu(item.label)
              }
            >
              <Link to={item.to} style={styles.menuLink} className="menu-link">
                <FontAwesomeIcon icon={item.icon} className="fs-13" />
                {!collapsed && (
                  <span className="menu-title" style={styles.menuTitle}>{item.label}</span>
                )}
              </Link>

              {/* Right arrow icon only when sidebar is NOT collapsed */}
              {!collapsed && item.hasSubMenu && (
                <FontAwesomeIcon
                  icon={
                    activeSubMenu === item.label
                      ? faChevronDown
                      : faChevronRight
                  }
                  style={styles.submenuToggle}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSubMenu(item.label);
                  }}
                />
              )}
            </div>

            {/* Floating submenu when sidebar is collapsed */}
            {collapsed && item.hasSubMenu && hoveredMenu === item.label && item.subMenu && (
              <ul className="floating-submenu" style={styles.floatingSubmenu }>
                <li className="collapsed-parent-menu pt-3 pl-2 pb-2 mt-0 text-white">{item.label}</li>
                {item.subMenu.map((subItem) => (
                  <li className="submenu-item" key={subItem.label} style={{...styles.submenuItem}}>
                    <Link to={subItem.to} style={styles.menuLink} className="menu-link">
                      <FontAwesomeIcon icon={subItem.icon} className="fs-13" />
                      <span className="submenu-title" style={styles.submenuTitle}>{subItem.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {/* Inline submenu when sidebar is NOT collapsed */}
            {!collapsed && item.hasSubMenu && activeSubMenu === item.label && item.subMenu && (
              <ul style={styles.expandedSubmenu} className="floating-submenu">
                {item.subMenu.map((subItem) => (
                  <li key={subItem.label} style={styles.submenuItem} className="submenu-item">
                    <Link to={subItem.to} style={styles.menuLink} className="menu-link">
                      <FontAwesomeIcon icon={subItem.icon} className="fs-13" />
                      <span style={styles.submenuTitle} className="submenu-title">{subItem.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  sidebar: (collapsed) => ({
    width: collapsed ? "70px" : "250px",
    backgroundColor: "#2a3042",
    color: "#a3abc4",
    // transition: "width 0.3s ease",
    position: "relative",
    height: "100vh",
    zIndex: 100
  }),
  toggleBtn: {
    backgroundColor: "transparent",
    color: "#a3abc4",
    border: "none",
    cursor: "pointer",
    padding: "10px",
  },
  menuList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  menuItem: {
    position: "relative",
    paddingLeft: "10px",
  },
  menuLink: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    padding: "5px",
    transition: "color 0.3s ease",
  },
  menuTitle: {
    marginLeft: "7px",
    transition: "color 0.3s ease",
    fontSize: "11px"
  },
  submenuToggle: {
    marginLeft: "auto",
    cursor: "pointer",
    fontSize: "11px"
  },
  floatingSubmenu: {
    minWidth: '200px',
    position: "absolute",
    left: "100%",
    top: -5,
    backgroundColor: "#2a3042",
    listStyle: "none",
    padding: "5px",
    paddingLeft: '0px',
    margin: 0,
    borderRadius: "4px",
    // boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    zIndex: 9999,
  },
  expandedSubmenu: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    backgroundColor: "#2a3042",
  },
  submenuItem: {
    padding: "5px 15px",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
  submenuTitle: {
    marginLeft: "7px",
    transition: "color 0.3s ease",
    fontSize: "11px"
  },
};

function mapStateToProps(state) {
  const { invoice } = state;
  return {
    invoice
  };
}
export default connect(mapStateToProps)(SidebarContent);
