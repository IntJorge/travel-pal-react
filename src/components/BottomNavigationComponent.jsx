import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import Icon from '@material-ui/core/Icon';

const styles = {
  root: {
    width: '100%',
    position: 'fixed',
    bottom: '0',
  },
};

class SimpleBottomNavigation extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        const { routes, history } = this.props;
        const keys = Object.keys(routes);

        this.setState({
            value
        }, () => {
            history.push(keys[value]);
        });
    }

    renderRoutes = () => {
        const { routes } = this.props;

        return Object.keys(routes).map(key => {
            const route = routes[key];

            return (
                <BottomNavigationAction label={route.title} icon={<route.icon />} />
            )
        });
    }

    render() {
    const { classes, routes } = this.props;
    const { value } = this.state;

    return (
        <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
        >
        {
            this.renderRoutes()
        }
        {/* <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} /> */}
        </BottomNavigation>
    );
    }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SimpleBottomNavigation));