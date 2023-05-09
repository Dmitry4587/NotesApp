import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useMediaQuery } from '@mui/material';
import DrawerWidthContext from './context';
import Sidebar from './components/Sidebar';
import Workspace from './components/Workspace';
import AppBar from './components/AppBar';
import { INoteTransformed, NotesStatus } from './types';

const App = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [open, setOpen] = React.useState(true);
  const [edit, setEdit] = React.useState(false);
  const [text, setText] = React.useState('');
  const [notesStatus, setNotesStatus] = React.useState<NotesStatus>(NotesStatus.IDLE);
  const [currentNoteId, setCurrentNoteId] = React.useState('');
  const [note, setNote] = React.useState<INoteTransformed | null>(null);
  const [notes, setNotes] = React.useState<INoteTransformed[]>([]);

  const onChangeText = React.useCallback((value: string) => {
    setText(value);
  }, []);

  const handleDrawerOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const handleDrawerClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <DrawerWidthContext.Provider value={isMobile ? 140 : 240}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          currentNoteId={currentNoteId}
          setNotes={setNotes}
          text={text}
          setNotesStatus={setNotesStatus}
          notesStatus={notesStatus}
          setCurrentNoteId={setCurrentNoteId}
          setNote={setNote}
          notes={notes}
          setEdit={setEdit}
          edit={edit}
        />
        <Sidebar
          notesStatus={notesStatus}
          notes={notes}
          handleDrawerClose={handleDrawerClose}
          open={open}
          currentNoteId={currentNoteId}
          setEdit={setEdit}
          setCurrentNoteId={setCurrentNoteId}
        />
        <Workspace
          notesStatus={notesStatus}
          currentNoteId={currentNoteId}
          open={open}
          onChangeText={onChangeText}
          edit={edit}
          note={note}
        />
      </Box>
    </DrawerWidthContext.Provider>
  );
};

export default App;
