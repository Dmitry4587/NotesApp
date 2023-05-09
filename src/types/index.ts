/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React from 'react';

export interface INote {
  id: string;
  app_id: string;
  entity_id: string;
  values: {
    [key: string]: string;
  };
  approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface INotesRes {
  records: [INote];
}

export interface INoteRes {
  record: INote;
}

export interface INoteTransformed {
  id: string;
  noteText: string;
  noteDate: string;
}

export enum NotesStatus {
  LOADING = 'loading',
  LOADED = 'loaded',
  IDLE = 'idle',
  ERROR = 'error',
}

interface IProps {
  open: boolean;
  currentNoteId: string;
  setNotes: React.Dispatch<React.SetStateAction<INoteTransformed[]>>;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  text: string;
  setCurrentNoteId: React.Dispatch<React.SetStateAction<string>>;
  setNote: React.Dispatch<React.SetStateAction<INoteTransformed | null>>;
  notes: INoteTransformed[];
  note: INoteTransformed | null;
  edit: boolean;
  onChangeText: (val: string) => void;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  notesStatus: NotesStatus;
}

export interface IAppBarComponentProps
  extends Omit<IProps, 'handleDrawerClose' | 'note' | 'onChangeText'> {
  setNotesStatus: React.Dispatch<React.SetStateAction<NotesStatus>>;
}

export interface ISidebarProps
  extends Omit<
    IProps,
    'handleDrawerOpen' | 'onChangeText' | 'edit' | 'setNotes' | 'text' | 'note' | 'setNote'
  > {}

export interface IWorkspaceProps
  extends Pick<
    IProps,
    'currentNoteId' | 'open' | 'onChangeText' | 'edit' | 'note' | 'notesStatus'
  > {}

export interface IListItemComponentProps
  extends Pick<IProps, 'setCurrentNoteId' | 'currentNoteId' | 'handleDrawerClose' | 'setEdit'> {
  id: string;
  noteText: string;
  noteDate: string;
}

export interface ISearchBoxProps extends Pick<IProps, 'handleDrawerOpen'> {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export interface IModalComponentProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteNote: () => void;
}
