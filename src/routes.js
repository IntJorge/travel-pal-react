import PlaceIcon from '@material-ui/icons/Place';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CloudIcon from '@material-ui/icons/Cloud';

const routes = {
    "/": {
      title: 'Place',
      icon: PlaceIcon,
    },
    "/currency": {
      title: 'Currency',
      icon: AttachMoneyIcon,
    },
    "/weather": {
      title: 'Weather',
      icon: CloudIcon,
    },
}

export default routes;