import "babel-polyfill";

function* entries(obj) {
  // eslint-disable-next-line
  for (const key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

export const formatNestedMessages = (
  phrases,
  formattedMessages = {},
  prefix = '',
) => {
  const messages = formattedMessages;

  // eslint-disable-next-line
  for (const [key, value] of entries(phrases)) {
    if ({}.hasOwnProperty.call(phrases, key)) {
      const keyWithPrefix = prefix ? `${prefix}.${key}` : key;
      if (typeof value === 'object') {
        formatNestedMessages(value, formattedMessages, keyWithPrefix);
      } else {
        messages[keyWithPrefix] = value;
      }
    }
  }
  return messages;
};
/* TODO: CLEANUP / WHAT DO WE NEED TO KEEP? */
/*
export const getLocaleObject = localeAbbreviation => {
  const locale = appLocales.find(l => l.abbreviation === localeAbbreviation);

  return locale || NB; // defaults to NB
};

export const isValidLocale = localeAbbreviation =>
  appLocales.find(l => l.abbreviation === localeAbbreviation) !== undefined;

export const getHtmlLang = localeAbbreviation => {
  const locale = appLocales.find(l => l.abbreviation === localeAbbreviation);
  return locale ? locale.abbreviation : 'nb'; // Defaults to nb if not found
};

export function getLocaleInfoFromPath(path) {
  const paths = path.split('/');
  const basename = isValidLocale(paths[1]) ? paths[1] : '';
  const basepath = basename ? path.replace(`/${basename}`, '') : path;
  return {
    basepath,
    basename,
    ...getLocaleObject(basename),
  };
}
*/
