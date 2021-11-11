function isEmpty(obj) {
  // because Object.keys(new Date()).length === 0;
  // we have to do some additional check
  return (
    obj == null || // null and undefined check
    obj.length === 0
  );
}

function objContainsVal(obj, value) {
  return Object.values(obj).indexOf(value) > -1;
}

module.exports = { isEmpty, objContainsVal };
