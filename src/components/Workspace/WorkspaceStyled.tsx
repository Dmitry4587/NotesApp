import { styled } from '@mui/material/styles';
import SimpleMDE from 'react-simplemde-editor';
import { Typography } from '@mui/material';

export const TypographyStyled = styled(Typography)`
  position: absolute;
  top: 50%;
  text-transform: uppercase;
  font-weight: bold;
  left: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: 900px) {
    font-size: 25px;
    width: 320px;
  }
`;

export const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
  drawerwidth: number;
}>(({ theme, open, drawerwidth }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.down('md')]: {
    paddingTop: '120px',
  },
  [theme.breakpoints.down('sm')]: {
    paddingTop: '220px',
  },
  wordBreak: 'break-all',
  marginLeft: `-${drawerwidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export const MDEStyled = styled(SimpleMDE)`
  .CodeMirror {
    border: none !important;
  }
  .editor-toolbar {
    border: none !important;
  }
`;
