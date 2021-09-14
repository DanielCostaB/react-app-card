import { uuid } from 'uuidv4';
import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Group from "../component/Grupos/Grupo";
import GrupoVazio from "../component/Grupos/GrupoVazio";
import { firebase } from "../services/firebase";
import { CircularProgress } from '@material-ui/core';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = { grupos: [], loading: true };
  }

  onDragEnd = result => {
    const databaseCardItem = firebase.database().ref("Card_Group")
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const { grupos } = this.state;
      const grupo = grupos.find(g => g.id === source.droppableId);
      if (!!grupo) {
        const [removed] = grupo.items.splice(source.index, 1);
        grupo.items.splice(destination.index, 0, removed);
        this.setState({ ...this.state, grupos });
        databaseCardItem.child(grupo.id).set({ ...grupo });
      }
    } else {
      const { grupos } = this.state;
      const src = grupos.find(g => g.id === source.droppableId);
      const dst = grupos.find(g => g.id === destination.droppableId);

      if (!!src && !!dst) {
        const item = src.items[source.index];
        
        if (!dst.hasOwnProperty("items")) {
          dst.items = [];
          item.grupo = destination.droppableId;
          dst.items.push(item);
        } else {
          item.grupo = destination.droppableId;
          dst.items.splice(destination.index, 0, item);
        }

        src.items.splice(source.index, 1);

        databaseCardItem.child(src.id).set({ ...src });
        databaseCardItem.child(dst.id).set({ ...dst });
      }
      this.setState({ ...this.state, grupos });
    }
  };

  addGrupo = nome => {
    const databaseCardGrupo = firebase.database().ref("Card_Group");
    databaseCardGrupo.push({
      name: nome,
      items: [],
    }).then(() => this.refreshData());
  }

  addItem = (groupId, label) => {
    const databaseCardItem = firebase.database().ref("Card_Group");
    const { grupos } = this.state;
    const grupo = grupos.find(g => g.id === groupId);
    if (!!grupo) {
      const items = grupo.items || [];
      items.push({ content: label, id: uuid(), grupo: groupId });
      grupo.items = items;
    }
    this.setState({ ...this.state, grupos });
    databaseCardItem.child(groupId).set({ ...grupo });
  }

  editGroup = (groupId, name) => {
    const databaseCardGrupo = firebase.database().ref("Card_Group")
    const { grupos } = this.state;
    const grupo = grupos.find(g => g.id === groupId);
    if (!!grupo) {
      grupo.name = name;
    }
    this.setState({ ...this.state, grupos });
    databaseCardGrupo.child(groupId).set({ ...grupo });
  }

  editItem = (item, name) => {
    const databaseCardItem = firebase.database().ref("Card_Group")
    const { grupos } = this.state;
    const grupo = grupos.find(g => g.id === item.grupo)
    const i = grupo && grupo.items.find(i => i.id === item.id);
    if (!!i) {
      i.content = name;
    }
    this.setState({ ...this.state, grupos });
    databaseCardItem.child(i.grupo).set(grupo);
  }

  deleteGrupo = id => {
    const databaseCardGrupo = firebase.database().ref("Card_Group");
    databaseCardGrupo.child(id).remove();
    this.refreshData();
  }

  deleteItem = item => {
    const databaseCardItem = firebase.database().ref("Card_Group");
    const { grupos } = this.state;
    const grupo = grupos.find(g => g.id === item.grupo);
    if (!!grupo) {
      const index = grupo.items.findIndex(i => i.id === item.id);
      //console.log(grupo);
      if (index >= 0) {
        grupo.items.splice(index, 1);
      }
    }
    this.setState({ ...this.state, grupos });
    databaseCardItem.child(item.grupo).set({ ...grupo });
  }

  componentDidMount() {
    this.refreshData();
  }

  refreshData = () => {
    this.setState({ loading: true });
    const databaseCard = firebase.database().ref("Card_Group")
    
    databaseCard.once('value', snapshot => {
      const grupos = [];
    
      snapshot.forEach(childSnapshot => {
        var key = childSnapshot.key;
        var data = childSnapshot.val();
    
        grupos.push({ ...data, id: key });
      });
      this.setState({ grupos, loading: false });
    }).catch(() => this.setState({ loading: false }));
  }

  render() {
    const { grupos: groups, loading } = this.state;
    return <div style={{ display: 'flex', overflow: 'auto', maxHeight: '100vh' }}>
      <div style={{
        padding: '30px 20px',
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'center',
        flexWrap: 'nowrap',
      }}
      >
        {loading
          ? <CircularProgress size={24} />
          : <DragDropContext onDragEnd={this.onDragEnd}>
            {!!groups && groups.length > 0
              && groups.map(g => 
                <Group 
                  key={`outer-group-${g.id}`} 
                  grupo={g} items={g.items}
                  onAddItem={this.addItem}
                  onEditGroup={this.editGroup}
                  onEditItem={this.editItem}
                  onRemoveGroup={this.deleteGrupo}
                  onRemoveItem={this.deleteItem}
                />
              )
            }
            <GrupoVazio onAction={this.addGrupo} />
          </DragDropContext>
        }
      </div>
    </div>;
  }
}