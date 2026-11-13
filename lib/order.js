export function alternateOrigins(items) {
  const international = items.filter((item) => item.origin === "international");
  const japan = items.filter((item) => item.origin !== "international");
  const ordered = [];
  const count = Math.max(international.length, japan.length);
  for (let index = 0; index < count; index += 1) {
    if (international[index]) ordered.push(international[index]);
    if (japan[index]) ordered.push(japan[index]);
  }
  return ordered;
}
