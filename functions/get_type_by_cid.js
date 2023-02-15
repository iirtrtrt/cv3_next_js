export default function getTypeByCid(types ,cid) {
  const current = types["cats"][cid];
  if (current["pid"] !== null) {
    return types["cats"][current.pid]["name"];
  } else {
    return current["name"];
  }
}
