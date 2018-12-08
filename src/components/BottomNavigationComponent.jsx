import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

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
                <BottomNavigationAction key={`Nav__${route.title}`} label={route.title} icon={<route.icon />} />
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
        </BottomNavigation>
    );
    }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SimpleBottomNavigation));