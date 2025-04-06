import React, {  useEffect} from 'react';

import SidebarContent from './SidebarContent';

const Sidebar = () => {

  useEffect(()=>{if (document.body) document.body.setAttribute('data-sidebar', 'dark')},[])

    return (
      <>
        <div className="vertical-menu">
          <div data-simplebar className="h-100">
            {/* {type !== 'condensed' ? (
              <SimpleBar className="sidebar-height">
                <SidebarContent />
              </SimpleBar>
            ) : ( */}
              <SidebarContent />
            {/* )} */}
          </div>
        </div>
      </>
    );
  
}

export default Sidebar;
