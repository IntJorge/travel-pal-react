import React from 'react';
import {
    Page,
    PageContent,
    Navbar,
    NavLeft,
    NavTitle,
    NavRight,
    Link,
    Toolbar,
    Block,
} from 'framework7-react';

export default ({
    title,
    navLeft,
    navRight,
    children,
    customNavbar,
}) => (
  <Page>
    {
      !customNavbar ? (
        <Navbar>
        {/* <NavLeft>
          <Link iconIos="f7:menu" iconMd="material:menu" link onClick={onOpenLeftPanel}></Link>
        </NavLeft> */}
        { 
            !navLeft ? null : navLeft
        }
        <NavTitle>{ title }</NavTitle>
        { 
            !navRight ? null : navRight
        }
        {/* <NavRight>
          <Link iconIos="f7:menu" iconMd="material:menu" link onClick={onOpenRightPanel}></Link>
        </NavRight> */}
      </Navbar>
      ) : customNavbar
    }
    {/* children */}
    <PageContent>
      { children}
    </PageContent>
  </Page>
);