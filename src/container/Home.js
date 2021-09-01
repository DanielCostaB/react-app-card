import { uuid } from 'uuidv4';
import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Group from "../component/Grupo";
import GrupoVazio from "../component/GrupoVazio";
import firebase from "../util/firebase";

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = { grupos: [] };
  }

  onDragEnd = result => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const { grupos } =  this.state;
      const grupo = grupos.find(g => g.id === source.droppableId);
      if (!!grupo) {
        const [removed] = grupo.items.splice(source.index, 1);
        grupo.items.splice(destination.index, 0, removed);
        this.setState({ ...this.state, grupos });
      }
    } else {
      const { grupos } =  this.state;
      const src = grupos.find(g => g.id === source.droppableId);
      const dst = grupos.find(g => g.id === destination.droppableId);

      if (!!src && !!dst) {
        const item = src.items[source.index];
        dst.items.splice(destination.index, 0, item);
        src.items.splice(source.index, 1);
      }
      this.setState({ ...this.state, grupos });
    }
  };

  addGrupo = nome => {
    const { grupos } = firebase.database().ref(this.state);
    grupos.push({
      id: uuid(),
      name: nome,
      items: [],
    });
    this.setState({ ...this.state, grupos });
  }

  addItem = (groupId, label) => {
    const { grupos } = this.state;
    const grupo = grupos.find(g => g.id === groupId);
    if (!!grupo) {
      grupo.items.push({ content: label, id: uuid(), grupo: groupId });
    }
    this.setState({ ...this.state, grupos });
  }

  editGroup = (groupId, name) => {
    const { grupos } = this.state;
    const grupo = grupos.find(g => g.id === groupId);
    if (!!grupo) {
      grupo.name = name;
    }
    this.setState({ ...this.state, grupos });
  }

  editItem = (item, name) => {
    const { grupos } = this.state;
    const i = grupos
      .find(g => g.id === item.grupo)?.items.find(i => i.id === item.id);
    if (!!i) {
      i.content = name;
    }
    this.setState({ ...this.state, grupos });
  }

  render() {
    const { grupos: groups } = this.state;
    return <div style={{ display: 'flex', overflow: 'auto', maxHeight: '100vh' }}>
      <div style={{
        padding: '30px 20px',
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'center',
        flexWrap: 'nowrap',
      }}
      >
        <DragDropContext onDragEnd={this.onDragEnd}>
          {!!groups && groups.length > 0
            && groups.map(g => <Group key={`outer-group-${g.id}`} grupo={g} items={g.items} onAddItem={this.addItem} onEditGroup={this.editGroup} onEditItem={this.editItem} />)}
          <GrupoVazio onAction={this.addGrupo} />
        </DragDropContext>
      </div>
    </div>;
  }
}