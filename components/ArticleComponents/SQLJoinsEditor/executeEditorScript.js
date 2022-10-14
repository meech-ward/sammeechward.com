import { rightToLeft, fullToLeft, containsRightJoin, containsFullJoin, containsLeftJoin, containsJoin } from './sql.js';
export default function executeEditorScript({db, editorName, sql}) {

  let heading
  if (containsJoin(sql)) {
    if (containsLeftJoin(sql)) {
      heading = `LEFT OUTER JOIN`
    } else if (containsRightJoin(sql)) {
      heading = `RIGHT OUTER JOIN`
    } else if (containsFullJoin(sql)) {
      heading = `FULL OUTER JOIN`
    } else {
      heading = `INNER JOIN`
    }
  }

  if (containsFullJoin(sql)) {
    sql = fullToLeft(sql);
  }
  if (containsRightJoin(sql)) {
    sql = rightToLeft(sql);
  }

  const extras = {
    'schema': "SELECT name as tables FROM sqlite_master WHERE type ='table' AND name NOT LIKE 'sqlite_%';",
    'seeds': ""
  };
  
  if (editorName === 'seeds') {
    const tableNames = db.exec("SELECT name as tables FROM sqlite_master WHERE type ='table' AND name NOT LIKE 'sqlite_%';");
    let subSQL = `select `;
    tableNames[0].values.forEach((value, index) => {
      subSQL += ` ( select count(${value[0]}.id) from ${value[0]} ) as 'Number Of Rows in ${value[0]}' ${index < tableNames[0].values.length-1 ? ', ': ''}`
    });

    extras.seeds = subSQL;
  }

  let output;
  sql += ";" + (extras[editorName] || '');

  try {
    output = db.exec(sql);
  } catch (e) {
    alert("There was an error with your query.");
  }

  let totalRows 
  if (editorName !== 'schema' && editorName !== 'seeds' && Array.isArray(output)) {
    totalRows = output[0]?.values?.length
  }

  return {
    output,
    totalRows,
    heading
  }
}