import initSqlJs from 'sql.js'

export const loadSQL = async () =>
  await initSqlJs({
    locateFile: (file) => `https://sql.js.org/dist/${file}`
  })
