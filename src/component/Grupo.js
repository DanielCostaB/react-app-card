import { Paper, makeStyles, InputAdornment, IconButton, OutlinedInput, Typography } from '@material-ui/core';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import AddIcon from '@material-ui/icons/Add';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  coluna: {
    width: '250px',
    padding: '10px'
  },
  item: {
    cursor: 'pointer',
  },
  titulo: {
    cursor: 'pointer',
    backgroundColor: '#512da8',
    color: 'white',
    borderRadius: '5px',
    marginBottom: '10px',
    padding: '10px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  }
}));

export default function Grupo({ grupo, items = [], onAddItem = () => { }, onEditGroup = (id, name) => {}, onEditItem = (item, name) => {} }) {

  const [itemLabel, setItemLabel] = useState('');
  const [editGroup, setEditGroup] = useState(false);
  const [editItem, setEditItem] = useState({});

  const classes = useStyles();

  const grid = 8;

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    wordBreak: 'break-all',
    background: isDragging ? 'lightgray' : 'white',
    ...draggableStyle
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : 'white',
    padding: grid,
    width: 250,
    display: 'inline-block',
    marginRight: '16px'
  });

  const setLabel = ({ target }) => {
    setItemLabel(target.value);
  };

  const saveItem = () => {
    if (!!itemLabel) {
      onAddItem(grupo.id, itemLabel);
      setItemLabel('');
    }
  }

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      saveItem();
    }
  }

  const saveGroup = (e) => {
    if (e.keyCode === 13) {
      setEditGroup(!editGroup);
    }
  }

  const persistItem = (e) => {
    if (e.keyCode === 13) {
      setEditItem(!editGroup);
    }
  }

  return <Droppable droppableId={grupo.id}>
    {(provided, snapshot) => (
      <Paper ref={provided.innerRef} className={classes} style={getListStyle(snapshot.isDraggingOver)} key={`group-${grupo.id}`}>
        {editGroup
          ? <OutlinedInput
              id="outlined-basic"
              fullWidth
              value={grupo.name}
              onKeyDown={saveGroup}
              onChange={({ target }) => {
                onEditGroup(grupo.id, target.value)
              }}
            />
          :<Typography className={classes.titulo} variant="h6" component="h2" color="primary" onClick={() => setEditGroup(!editGroup)}>{grupo.name}</Typography>
        }
        {items && items.map((item, index) => (
          <Draggable
            key={item.id}
            draggableId={item.id}
            index={index}>
            {(provided, snapshot) => (
              <Paper
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style
                )}>
                {(!!editItem && editItem.id === item.id)
                  ? <OutlinedInput
                    id="outlined-basic"
                    fullWidth
                    value={editItem.content}
                    onKeyDown={persistItem}
                    onChange={({ target }) => {
                      onEditItem(item, target.value)
                    }}
                  />
                  : <span className={classes.item} onClick={() => setEditItem(item)}>{item.content}</span>
                }
              </Paper>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
        <OutlinedInput
          id="outlined-basic"
          fullWidth
          value={itemLabel}
          placeholder="Novo Card"
          onKeyDown={keyPress}
          onChange={setLabel}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => saveItem()}
              >
                <AddIcon />
              </IconButton>
            </InputAdornment>}
        />
      </Paper>
    )}
  </Droppable>
}