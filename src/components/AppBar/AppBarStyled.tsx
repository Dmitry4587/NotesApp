import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  drawerwidth: number;
}

export const AppBarStyled = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open, drawerwidth }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerwidth}px)`,
    marginLeft: `${drawerwidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  [theme.breakpoints.down('md')]: {
    ...(open && {
      width: `calc(100% - ${drawerwidth}px)`,
      marginLeft: `${drawerwidth + 70}px`,
    }),
  },
}));

export const ToolBarStyled = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  @media (max-width: 900px) {
    flex-direction: column;
    padding-top: 15px;
    padding-bottom: 15px;
    div:first-of-type {
      margin-bottom: 15px;
    }
  }
`;

export const ButtonsWrapper = styled(Box)`
  display: flex;
  gap: 10px;
  @media (max-width: 600px) {
    flex-direction: column;
    button:first-of-type {
      margin: 0;
      padding: 0;
    }
  }
`;
