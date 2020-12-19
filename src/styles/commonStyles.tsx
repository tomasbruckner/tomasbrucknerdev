import { makeStyles } from '@material-ui/core';

export const useCommonStyles = makeStyles((theme) => ({
  menuLinkStyle: {
    textDecoration: 'none',
    padding: theme.spacing(2),
    color: 'white',
    fontWeight: 500,
    fontSize: 20,
  },
  linkStyle: {
    textDecoration: 'none',
    color: '#0089eb',
    marginLeft: '1em',
  },
}));
