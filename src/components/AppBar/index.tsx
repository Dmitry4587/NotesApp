/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { nanoid } from 'nanoid';
import { useDebounce } from '../../hooks';
import {
  getNoteApi,
  updateNoteApi,
  getAllNotesApi,
  deleteNoteApi,
  addNoteApi,
} from '../../api/api';
import SearchBox from '../SearchBox';
import DrawerWidthContext from '../../context';
import { IAppBarComponentProps, NotesStatus } from '../../types';
import { catchAsync } from '../../utils';
import { AppBarStyled, ToolBarStyled, ButtonsWrapper } from './AppBarStyled';

const AppBarComponent = ({
  open,
  handleDrawerOpen,
  setNotesStatus,
  currentNoteId,
  setNotes,
  text,
  setCurrentNoteId,
  notesStatus,
  setNote,
  notes,
  edit,
  setEdit,
}: IAppBarComponentProps) => {
  const [search, setSearch] = React.useState('');
  const debouncedText: string = useDebounce<string>(text, 500);
  const debouncedSearch: string = useDebounce<string>(search, 500);
  const drawerWidth = React.useContext(DrawerWidthContext);
  const isButtonDisable = currentNoteId === '' || notesStatus === NotesStatus.LOADING;

  const getAllNotes = catchAsync(async (changeNotesStatus) => {
    const notesArr = await getAllNotesApi();
    const findedNotes = notesArr.filter((item) =>
      item.noteText.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
    setNotes(findedNotes);
    changeNotesStatus(NotesStatus.LOADED);
  });

  const getNoteById = catchAsync(async (changeNotesStatus) => {
    const currentNote = await getNoteApi(currentNoteId);
    setNote(currentNote);
    changeNotesStatus(NotesStatus.LOADED);
  });

  const updateNote = catchAsync(async (changeNotesStatus) => {
    if (edit) {
      const data = await updateNoteApi(currentNoteId, text);
      const updatedNotes = notes.map((noteItem) => {
        if (noteItem.id === currentNoteId) {
          return data;
        }
        return noteItem;
      });
      setNote(data);
      setNotes(updatedNotes);
      changeNotesStatus(NotesStatus.LOADED);
    }
  });

  const deleteNote = catchAsync(async (changeNotesStatus) => {
    await deleteNoteApi(currentNoteId);
    const deletedNote = notes.filter((noteItem) => noteItem.id !== currentNoteId);
    setNotes(deletedNote);
    setCurrentNoteId('');
    setNote(null);
    setEdit(false);
    changeNotesStatus(NotesStatus.LOADED);
  });

  const addNote = catchAsync(async (changeNotesStatus) => {
    const id = nanoid();
    const newNote = await addNoteApi(id);

    setNotes((notesItems) =>
      [newNote, ...notesItems].filter((item) =>
        item.noteText.toLowerCase().includes(debouncedSearch.toLowerCase()),
      ),
    );

    changeNotesStatus(NotesStatus.LOADED);
  });

  React.useEffect(() => {
    getAllNotes(setNotesStatus);
  }, [debouncedSearch]);

  React.useEffect(() => {
    updateNote(setNotesStatus);
  }, [debouncedText]);

  React.useEffect(() => {
    if (currentNoteId !== '') {
      getNoteById(setNotesStatus);
    }
  }, [currentNoteId]);

  return (
    <AppBarStyled position="fixed" open={open} drawerwidth={drawerWidth}>
      <ToolBarStyled>
        <ButtonsWrapper>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}>
            <MenuIcon />
          </IconButton>
          <Button
            color="secondary"
            disabled={notesStatus === NotesStatus.LOADING}
            onClick={() => addNote(setNotesStatus)}
            variant="contained"
            startIcon={<AddIcon />}>
            Add
          </Button>
          <Button
            onClick={() => setEdit(true)}
            variant="contained"
            disabled={isButtonDisable}
            color="success"
            startIcon={<EditIcon />}>
            Edit
          </Button>
          <Button
            color="error"
            onClick={() => {
              deleteNote(setNotesStatus);
            }}
            variant="contained"
            disabled={isButtonDisable}
            startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </ButtonsWrapper>
        <SearchBox handleDrawerOpen={handleDrawerOpen} search={search} setSearch={setSearch} />
      </ToolBarStyled>
    </AppBarStyled>
  );
};

export default AppBarComponent;
