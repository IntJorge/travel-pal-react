import React from 'react';
import { Link } from 'react-router-dom';
// import {
//     Page,
//     Navbar,
//     NavLeft,
//     NavTitle,
//     NavRight,
//     Link,
//     Toolbar,
//     Tabs,
//     Tab,
//     Searchbar,
//     Subnavbar,
//     List,
//     ListItem
// } from 'framework7-react';

// class HomeScreenComponent extends React.Component {
//     constructor(props) {
//         super(props);
//     }

//     componentDidMount() {
//         const { }
//     }
// }

const HomeScreenComponent = ({
    onNavigateTo,
    onGoBack,
    onExternalsRequest,
    children,
}) => (
    <main>
        { children }
        <ul>
            <li>
            <Link to="/">Map</Link>
            </li>
            <li>
            <Link to="/currency">Currency</Link>
            </li>
            <li>
            <Link to="/weather">Weather</Link>
            </li>
        </ul>
    </main>
);

export default HomeScreenComponent;