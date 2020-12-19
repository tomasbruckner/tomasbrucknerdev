import React, { FC, useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/ViewHeadline';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import { useCommonStyles } from '../styles/commonStyles';
import { t } from '../utils/i18n';

const useStyles = makeStyles((theme) => ({
  menuIcon: {
    fill: theme.palette.common.white,
  },
}));

const Navigation: FC = () => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  if (isLg) {
    return (
      <>
        <a className={commonClasses.menuLinkStyle} href="#about">
          {t('navigation.about')}
        </a>
        <a className={commonClasses.menuLinkStyle} href="#contact">
          {t('navigation.contact')}
        </a>
        <a className={commonClasses.menuLinkStyle} href="#lectures">
          {t('navigation.lectures')}
        </a>
      </>
    );
  }

  return (
    <>
      <IconButton
        onClick={(event: React.MouseEvent<HTMLElement>) => setAnchor(event.currentTarget)}
      >
        <MenuIcon className={classes.menuIcon} />
      </IconButton>
      <Menu
        open={!!anchor}
        onClose={() => setAnchor(null)}
        anchorEl={anchor}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem key="about" component="a" href="#about" button onClick={() => setAnchor(null)}>
          {t('navigation.about')}
        </MenuItem>
        <MenuItem
          key="contact"
          component="a"
          href="#contact"
          button
          onClick={() => setAnchor(null)}
        >
          {t('navigation.contact')}
        </MenuItem>
        <MenuItem
          key="lectures"
          component="a"
          href="#lectures"
          button
          onClick={() => setAnchor(null)}
        >
          {t('navigation.lectures')}
        </MenuItem>
      </Menu>
    </>
  );
};

export default Navigation;
