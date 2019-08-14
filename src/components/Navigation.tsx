import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/ViewHeadline';
import IconButton from '@material-ui/core/IconButton';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { menuLinkStyle } from '../styles/commonStyles';

const Navigation = () => {
  const { t } = useTranslation();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));

  if (isLg) {
    return (
      <>
        <a style={menuLinkStyle} href="#about">
          {t('navigation.about')}
        </a>
        <a style={menuLinkStyle} href="#contact">
          {t('navigation.contact')}
        </a>
        <a style={menuLinkStyle} href="#lectures">
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
        <MenuIcon style={{ fill: 'white' }} />
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
