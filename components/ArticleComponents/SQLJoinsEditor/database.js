import initSqlJs from 'sql.js'

let db 

export default async function database() {
  if (db) {
    return db
  }
  const SQL = await initSqlJs({
    locateFile: file => `https://sql.js.org/dist/${file}`
  })
  db = new SQL.Database()
  return db
}