module.exports.toTime = function toTime(str) {
  try {
    var result = str.split(":");
    var time = new Date(1999, 9, 9, result[0], result[1]);
  } catch (err) {
    // TODO Use a proper exception logger here
    console.log(err);
    return;
  }
  return time;
};
