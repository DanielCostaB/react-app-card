import { IconButton, InputAdornment, makeStyles, OutlinedInput, Paper } from "@material-ui/core";
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

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      saveGroup();
    }
  }

  return <Paper elevation={2} className={classes.coluna} >
    <OutlinedInput
      id="outlined-basic"
      fullWidth
      value={groupLabel}
      placeholder="Novo Grupo"
      onKeyDown={keyPress}
      onChange={setLabel}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            onClick={() => saveGroup()}
          >
            <AddIcon />
          </IconButton>
        </InputAdornment>}
    />
  </Paper>;
};