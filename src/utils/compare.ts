export default (value, other) => {
  if (value === other) {
    return true;
  }

  if (
    value instanceof Object && other instanceof Object &&
    Object.keys(value).length === Object.keys(other).length
  ) {
    return !Object.keys(value).some(keyValue =>
      !(keyValue in other && value[keyValue] === other[keyValue])
    );
  }

  return false;
}