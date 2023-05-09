/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import { INoteRes, INotesRes } from '../types';
import { transformRes } from '../utils';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export const getNoteApi = async (noteId: string) => {
  const { data } = await axios<INoteRes>(
    `/${process.env.REACT_APP_API_DB}/dtypes/${noteId}.json?rest_api_key=${process.env.REACT_APP_API_KEY}`,
  );
  return transformRes(data.record);
};

export const deleteNoteApi = async (noteId: string) => {
  const { data } = await axios.delete(
    `/${process.env.REACT_APP_API_DB}/dtypes/${noteId}.json?rest_api_key=${process.env.REACT_APP_API_KEY}`,
  );
  return data;
};

export const updateNoteApi = async (noteId: string, text: string) => {
  const { data } = await axios.patch<INoteRes>(
    `/${process.env.REACT_APP_API_DB}/dtypes/${noteId}.json?rest_api_key=${process.env.REACT_APP_API_KEY}`,
    {
      json_values: JSON.stringify({ c2WRdcOmnoWRr5mmkMimoi: text || 'New Note' }),
    },
  );
  return transformRes(data.record);
};

export const addNoteApi = async (id: string) => {
  const { data } = await axios.post<INoteRes>(
    `/${process.env.REACT_APP_API_DB}/dtypes.json?rest_api_key=${process.env.REACT_APP_API_KEY}`,
    {
      json_values: JSON.stringify({
        entity_id: 'boW6eCW5HiBioNWQuyrt8e',
        id,
        c2WRdcOmnoWRr5mmkMimoi: 'New Note',
      }),
    },
  );
  return transformRes(data.record);
};

export const getAllNotesApi = async () => {
  const { data } = await axios<INotesRes>(
    `/${process.env.REACT_APP_API_DB}/dtypes/entity/boW6eCW5HiBioNWQuyrt8e.json?rest_api_key=${process.env.REACT_APP_API_KEY};view=`,
  );
  return data.records.map((record) => transformRes(record));
};
