/* eslint-disable indent */
import React from 'react';
import { INote, INoteTransformed, NotesStatus } from '../types';

export const transformRes = (record: INote): INoteTransformed => ({
  id: record.id,
  noteText: Object.values(record.values)[0],
  noteDate: record.created_at,
});

type TSetNoteStatus = React.Dispatch<React.SetStateAction<NotesStatus>>;

export const catchAsync =
  (fun: (setNotesStatus: TSetNoteStatus) => Promise<void>) =>
  async (setNotesStatus: TSetNoteStatus) => {
    try {
      setNotesStatus(NotesStatus.LOADING);
      await fun(setNotesStatus);
    } catch (e) {
      setNotesStatus(NotesStatus.ERROR);
    }
  };
