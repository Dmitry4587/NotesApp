import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const TypographyStyled = styled(Typography)`
  font-size: 20px;
  text-transform: uppercase;
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;
