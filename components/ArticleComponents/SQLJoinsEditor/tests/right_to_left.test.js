import { rightToLeft } from '../sql.js'

import { strict as assert } from 'node:assert';

describe("rightToLeft", function() {
  test("should convert a right join to a left join", function() {
    const query1 = "select * from table1 right join table2 on something";
    const expectedResult1 = "select * from table2 left join table1 on something";
    assert.equal(expectedResult1.toLowerCase(), rightToLeft(query1).toLowerCase());

    const query2 = "SELECT * FROM table1 RIGHT JOIN table2 ON something";
    const expectedResult2 = "SELECT * FROM table2 LEFT JOIN table1 ON something";
    assert.equal(expectedResult2.toLowerCase(), rightToLeft(query2).toLowerCase());

    const query3 = `SELECT * 
    FROM table1 
    RIGHT JOIN table2 
    ON something`;
    const expectedResult3 = `SELECT * 
    FROM table2 LEFT JOIN table1 ON something`;
    assert.equal(expectedResult3.toLowerCase(), rightToLeft(query3).toLowerCase());
  });
  test("should convert a right outer join to a left outer join", function() {
    const query = "select * from table1 right outer join table2 on something";
    const expectedResult = "select * from table2 left join table1 on something";
    assert.equal(expectedResult.toLowerCase(), rightToLeft(query).toLowerCase());
  });
});