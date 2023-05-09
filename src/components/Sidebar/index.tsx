import React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Skeleton from '@mui/material/Skeleton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';
import { ListItem, ListItemText } from '@mui/material';
import { nanoid } from 'nanoid';
import DrawerHeader from '../DrawerHeader';
import ListItemComponent from '../ListItemComponent';
import DrawerWidthContext from '../../context';
import { ISidebarProps, NotesStatus } from '../../types';
import { TypographyStyled } from './SidebarStyled';

const Sidebar = ({
  notes,
  open,
  handleDrawerClose,
  setCurrentNoteId,
  notesStatus,
  currentNoteId,
  setEdit,
}: ISidebarProps) => {
  const drawerWidth = React.useContext(DrawerWidthContext);

  const createNotes = () => {
    if (notes.length && notesStatus === NotesStatus.LOADED) {
      return notes.map(({ noteText, id, noteDate }) => (
        <ListItemComponent
          key={id}
          id={id}
          handleDrawerClose={handleDrawerClose}
          noteText={noteText}
          noteDate={noteDate}
          currentNoteId={currentNoteId}
          setEdit={setEdit}
          setCurrentNoteId={setCurrentNoteId}
        />
      ));
    }

    if (notesStatus === NotesStatus.LOADING) {
      return [...new Array(5)].map(() => (
        <ListItem key={nanoid()}>
          <Skeleton variant="rectangular" width={210} height={60} />
        </ListItem>
      ));
    }

    if (notesStatus === NotesStatus.ERROR) {
      return (
        <ListItem>
          <ListItemText primary="Something went wrong" />
        </ListItem>
      );
    }
    return (
      <ListItem>
        <ListItemText primary="No notes yet" />
      </ListItem>
    );
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}>
      <DrawerHeader sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <TypographyStyled>My notes</TypographyStyled>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />

      <List>{createNotes()}</List>
    </Drawer>
  );
};

export default Sidebar;
