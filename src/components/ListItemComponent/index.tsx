import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import removeMarkdown from 'markdown-to-text';
import { format } from 'date-fns';
import { Divider } from '@mui/material';
import { IListItemComponentProps } from '../../types';

const ListItemComponent = ({
  id,
  setCurrentNoteId,
  currentNoteId,
  noteText,
  noteDate,
  handleDrawerClose,
  setEdit,
}: IListItemComponentProps) => {
  const transformedDate = format(new Date(), 'dd/LL/yyy');
  const transformedText = removeMarkdown(noteText);
  const text =
    transformedText.length >= 15 ? `${transformedText.slice(0, 16)}...` : transformedText;

  const handleClick = () => {
    setCurrentNoteId(id);
    setEdit(false);
    handleDrawerClose();
  };
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton selected={id === currentNoteId} onClick={handleClick}>
          <ListItemText
            sx={{ wordBreak: 'break-all' }}
            primary={text}
            secondary={`Created: ${transformedDate} `}
          />
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
};

export default ListItemComponent;
