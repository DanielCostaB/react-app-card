import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Group from "../component/Grupo";
import GrupoVazio from "../component/GrupoVazio";

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = { grupos: [] };
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