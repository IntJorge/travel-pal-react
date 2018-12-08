import React from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import NumberFormat from 'react-number-format';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import classNames from 'classnames';
import modStyles from './styles.module.scss';
import { withStyles } from '@material-ui/core/styles';
import numeral from 'numeral';

const format = '0.00a.00';

const styles = {
  root: {
    width: '100%',
  },
  loader: {
    position: 'fixed',
    top: '0px',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    paddingTop: '56px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

class CurrencyInputCmp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '0.00',
    };
  }

  handleOnChange = (values) => {
    const { value} = values;
    const { onChange } = this.props;

    this.setState({
      value,
    });

    onChange && onChange(value);
  }

  render() {
    const { isText, isSecondary, value } = this.props;

    const className = classNames(modStyles.CurrencyInput, {
      [modStyles.CurrencyInput__Secondary]: isSecondary,
    });

    return (
      <NumberFormat
        className={className}
        maxLength={10}
        placeholder={`0.00`}
        onValueChange={this.handleOnChange}
        value={value} 
        decimalScale={2}
        thousandSeparator={true}
        displayType={!isText ? 'input' : 'text'}
        prefix={''}
        />
    );
  }
}

const CurrencyInput = withStyles(styles)(CurrencyInputCmp);

class CurrencyScreenComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { formModel = {}, onChange } = this.props;
    const sourceValue = formModel['sourceValue'] || '';
  
    onChange && onChange('sourceValue', sourceValue);
  }

  handleOnChange = (value) => {
    const { onChange } = this.props;

    onChange && onChange('sourceValue', value);
  }

  render() {
    const { classes, isLoading, onChange, formModel = {}, currencySymbol, currencyCode, currency } = this.props;
    let destValue = !formModel['destValue'] ? '0.00' : numeral(formModel['destValue']).format(format);

    return (
      <Grid container className={classes.root} spacing={0}>
        <Grid item xs={12}>
          { isLoading && (
              <div className={classes.loader}>
                <CircularProgress />
              </div>
            )
          }
          {
            !isLoading && (
              <div className={modStyles.CurrencyRoot}>
                <div className={modStyles.CenterArrowIcon}>
                  <ArrowDownwardIcon />
                </div>
                <div className={modStyles.CurrencyContainer}>
                  <Typography variant="h5">
                    { 'United States Dollars' }
                  </Typography>
                  <br />
                  <CurrencyInput 
                    onChange={this.handleOnChange}
                    value={formModel['sourceValue'] || ''}
                    currencySymbol={currencySymbol} />
                  <br />
                  <Typography variant="h4" gutterBottom>
                    { 'USD - $' }
                  </Typography>
                </div>
                <div className={modStyles.CurrencyContainer__Secondary}> 
                  <Typography variant="h5">
                    { currency }
                  </Typography>  
                  <br />
                  <Typography variant="h2">
                    { destValue }
                  </Typography>
                  <br />
                  <Typography variant="h4" gutterBottom>
                    { currencyCode } - { currencySymbol }
                  </Typography>
                </div>
              </div>
            )
          }
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(CurrencyScreenComponent);