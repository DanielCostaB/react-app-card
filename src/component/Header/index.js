import React from 'react';

import { Container } from './styles';

import GroupIcon from '@material-ui/icons/Group';

export default function Header() {
  return (
    <Container>
      <GroupIcon style={{ fontSize: 30, padding: 5 }}>Group</GroupIcon>    
      <h1>GroupCard</h1>
    </Container>
  );
}