import { useState } from "react";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  coluna: {
    width: '250px',
    padding: '10px'
  },
}));

export default function GrupoVazio({ onAction = () => { } }) {

const [groupLabel, setGroupLabel] = useState('');

  const classes = useStyles();

  const setLabel = ({ target }) => {
    setGroupLabel(target.value);
  };

  const saveGroup = () => {
    if (!!groupLabel) {
      onAction(groupLabel);
      setGroupLabel('');
    }
  }
};