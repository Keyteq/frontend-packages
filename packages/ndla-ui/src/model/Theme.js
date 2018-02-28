export const themes = {
  NORMAL: 'normal',
  FILM: 'film',
};

export const getCssModifierByTheme = theme => {
  if (theme !== themes.NORMAL) {
    return `theme-${theme}`;
  }

  return null;
};
