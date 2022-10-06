import { containsFullJoin } from '../sql.js'

import { strict as assert } from 'node:assert';

describe("containsFullJoin", function() {
  test("should return true when query contains full join", function() {
    const query1 = "select * from table1 full join table2 on something";
    assert(containsFullJoin(query1));

    const query2 = "SELECT * FROM table1 FULL JOIN table2 ON something";
    assert(containsFullJoin(query2));

    const query3 = "select * from table1 full outer join table2 on something";
    assert(containsFullJoin(query3));
  });
  test("should return false when query does not contain full join", function() {
    const queries = [
      "", 
      "select * from thing", 
      "select * from table1 left join on table2",
      "select * from table1 right join on table2"];
      queries.forEach(query => assert(!containsFullJoin(query)))
  });
});