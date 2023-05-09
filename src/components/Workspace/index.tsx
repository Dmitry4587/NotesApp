import React from 'react';
import { nanoid } from 'nanoid';
import ReactMarkdown from 'react-markdown';
import DrawerWidthContext from '../../context';
import DrawerHeader from '../DrawerHeader';
import 'easymde/dist/easymde.min.css';
import { IWorkspaceProps, NotesStatus } from '../../types';
import { TypographyStyled, Main, MDEStyled } from './WorkspaceStyled';

const Workspace = React.memo(
  ({ open, onChangeText, edit, note, currentNoteId, notesStatus }: IWorkspaceProps) => {
    const drawerWidth = React.useContext(DrawerWidthContext);

    const options = React.useMemo(
      () => ({
        spellChecker: false,
        hideIcons: ['fullscreen', 'preview', 'side-by-side', 'image', 'guide'] as const,
        autofocus: true,
        placeholder: 'Введите текст...',
        status: false,
        autosave: {
          uniqueId: nanoid(),
          enabled: true,
          delay: 1000,
        },
      }),
      [],
    );

    const createContent = () => {
      if (notesStatus === NotesStatus.ERROR) {
        return <TypographyStyled variant="h2">Something went wrong...</TypographyStyled>;
      }
      if (currentNoteId !== '' && note) {
        return edit ? (
          <MDEStyled value={note.noteText} onChange={onChangeText} options={options} />
        ) : (
          <ReactMarkdown>{note.noteText}</ReactMarkdown>
        );
      }
      return <TypographyStyled variant="h2">Please select a Note</TypographyStyled>;
    };

    return (
      <Main open={open} drawerwidth={drawerWidth}>
        <DrawerHeader />
        {createContent()}
      </Main>
    );
  },
);

export default Workspace;
