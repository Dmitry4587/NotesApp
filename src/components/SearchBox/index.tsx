import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { ISearchBoxProps } from '../../types';
import { Search, StyledInputBase, SearchIconWrapper } from './SearchStyled';

const SearchBox = ({ search, setSearch, handleDrawerOpen }: ISearchBoxProps) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDrawerOpen();
    setSearch(e.target.value);
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        onChange={handleSearch}
        value={search}
        placeholder="Search notes"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
};

export default SearchBox;
