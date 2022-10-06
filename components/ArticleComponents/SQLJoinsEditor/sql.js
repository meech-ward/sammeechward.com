export function rightToLeft(query) {
  const regex = /from[\s\n]+([a-zA-Z0-9_]+)[\s\n]*right[\s\n]+(outer )?[\s\n]*join[\s\n]+([a-zA-Z0-9_]+)[\s\n]+on/i
  return query.replace(regex, function(match, p1, p2, p3) {
    return `from ${p3} left join ${p1} on`;
  });
}

export function fullToLeft(query) {
  const regex = /(select[\n\s\w\d,.*()]*)from[\s\n]+([a-zA-Z0-9_]+)[\s\n]*full[\s\n]+(outer )?[\s\n]*join[\s\n]+([a-zA-Z0-9_]+)[\s\n]+on((?:(?!order|where|group|having)[\w\d\s\n=.])*)(order|where|group|having)?([\w\d\s\n.=]*)(;*)/i
  return query.replace(regex, function(match, p1, p2, p3, p4, p5, p6, p7, p8) {
    return `${p1}from ${p2} left join ${p4} on${p5} union ${p1}from ${p4} left join ${p2} on${p5} ${p6 || ''} ${p7 || ''} ${p8 || ''}`;
  });
}

export function containsRightJoin(query) {
  return Boolean(query.match(/right[\s\n]+(outer )?[\s\n]*join/i));
}

export function containsFullJoin(query) {
  return Boolean(query.match(/full[\s\n]+(outer )?[\s\n]*join/i));
}

export function containsLeftJoin(query) {
  return Boolean(query.match(/left[\s\n]+(outer )?[\s\n]*join/i));
}
export function containsJoin(query) {
  return Boolean(query.match(/(inner )?[\s\n]*join/i));
}