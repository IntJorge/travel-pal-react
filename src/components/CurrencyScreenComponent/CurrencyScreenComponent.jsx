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
    BlockTitle,
    Label,
    Input,
    List,
    ListItem,
    Icon,
    F7List,
    Button,
    Popup,
    Subnavbar,
    ListButton,
    Searchbar,
    Row,
    Col,
} from 'framework7-react';

import BaseScreenComponent from '../BaseScreenComponent';

import styles from './styles.module.scss';

// export default ({ onChange, formModel = {} }) => {
  
// }

class CurrencyScreenComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popupOpened: false,
      popupField: '',
    }
  }

  openPopUp = ({ field }) => {
    this.setState({ popupOpened : true, popupField: field })
  }

  closePopUp = () => {
    this.setState({ popupOpened : false, popupField: '' })
  }

  onListItemSelected = (value) => {
    const { onChange } = this.props;

    onChange && onChange(this.state.popupField, value);
  }

  render() {
    const { onChange, formModel = {} } = this.props;
    
    return (
      <h1>Currency</h1>
    );
    
    return (
      <BaseScreenComponent title="Converter">
          <div className={styles.CurrencyContainer}>   
              <Input
                className={styles.CurrencyContainer_Input}
                name="sourceValue"
                type="number"
                placeholder="Enter amount"
                value={formModel['sourceValue'] || ''}
                onChange={(e) => onChange(e.target.name, e.target.value)}
              />
              <div className={styles.CurrencyButton}>
                <Button fill round big onClick={() => { this.openPopUp({field: 'sourceCurrency' })}}>
                  { formModel['sourceCurrency'] || `Select`}
                  <Icon material="arrow_drop_down"></Icon>
                </Button>
            </div>
          </div>
          <div className={styles.CurrencyContainer}>   
              <Input
                className={styles.CurrencyContainer_Input}
                name="destValue"
                type="number"
                placeholder="Enter amount"
                value={formModel['destValue'] || 0}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                readonly
                disabled
              />
              <div className={styles.CurrencyButton}>
                <Button fill round big onClick={() => { this.openPopUp({field: 'destCurrency' })}}>
                  { formModel['destCurrency'] || `Select`}
                  <Icon material="arrow_drop_down"></Icon>
                </Button>
            </div>
          </div>
          <Popup opened={this.state.popupOpened} onPopupClosed={() => this.setState({popupOpened : false})}>
            <Page withSubnavbar>
              <Navbar title="Searchbar">
                <Subnavbar inner={false}>
                  <Searchbar
                    searchContainer=".search-list"
                    searchIn=".item-title"
                    backdrop
                    backdropEl=".search-list"
                  ></Searchbar>
                </Subnavbar>
                <NavRight>
                  <Link popupClose>Close</Link>
                </NavRight>
              </Navbar>

              <List className="searchbar-not-found">
                <ListItem title="Nothing found" />
              </List>
              <List className="search-list searchbar-found currency-list">
                <ListButton onClick={() => { this.onListItemSelected('USD'); this.closePopUp(); }} title="(USD) United States Dollar" />
                <ListButton onClick={() => { this.onListItemSelected('EUR'); this.closePopUp(); }} title="(EUR) Euro" />
              </List>
            </Page>
          </Popup>
          {/* <List noHairlinesMd>
            <ListItem>
              <Label>
                Amount
              </Label>
              <Input
                name="sourceValue"
                type="number"
                placeholder="Enter amount"
                value={formModel['sourceValue'] || ''}
                onChange={(e) => onChange(e.target.name, e.target.value)}
              />
            </ListItem>
            <ListItem>
              <Label>
                Currency
              </Label>
              <Input
                name="sourceCurrency"
                type="select"
                placeholder="Please choose..."
                defaultValue={formModel['sourceCurrency'] || ''}
                onChange={(e) => onChange(e.target.name, e.target.value)}
              >
                <option value="">Please choose an option...</option>
                <option value="USD">(USD) United States Dollar</option>
                <option value="EUR">(EUR) Euro</option>
              </Input>
            </ListItem>
            <ListItem>
              <Label>
                Amount
              </Label>
              <Input
                name="destValue"
                type="number"
                placeholder="Enter amount"
                value={formModel['destValue'] || ''}
                onChange={(e) => onChange(e.target.name, e.target.value)}
              />
            </ListItem>
            <ListItem>
              <Label>
                Currency
              </Label>
              <Input
                name="destCurrency"
                type="select"
                placeholder="Please choose..."
                defaultValue={formModel['destCurrency'] || ''}
                onChange={(e) => onChange(e.target.name, e.target.value)}
              >
                <option value="">Please choose an option...</option>
                <option value="USD">(USD) United States Dollar</option>
                <option value="EUR">(EUR) Euro</option>
              </Input>
            </ListItem>
          </List> */}
      </BaseScreenComponent>
    );
  }
}

export default CurrencyScreenComponent;