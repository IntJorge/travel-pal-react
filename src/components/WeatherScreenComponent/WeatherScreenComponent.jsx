import React from 'react';
import {
    Page,
    Navbar,
    NavLeft,
    NavTitle,
    NavRight,
    Link,
    Toolbar,
    Block,
} from 'framework7-react';

import BaseScreenComponent from '../BaseScreenComponent';

import TextField from '@material-ui/core/TextField';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});


const TextCMP = withStyles(styles)((props) => {
  const { classes } = props;

  return (
    <div>
      <TextField
        id="standard-name"
        label="Name"
        fullWidth
        // className={classes.textField}
        // value={this.state.name}
        // onChange={this.handleChange('name')}
        margin="normal"
      />
    </div>
  );
})

class WeatherScreenComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <TextCMP />
    );
    // return (
    //   <BaseScreenComponent title="Weather">
    //     <Block strong>
    //       <p>Weather HERE</p>
    //     </Block>
    //   </BaseScreenComponent>
    // );
  }
}

export default WeatherScreenComponent;