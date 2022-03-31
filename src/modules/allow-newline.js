export default (str) => {
  if (str.includes('\n')) {
    str = str.replaceAll('\n', '<br>');
  }
  return str;
};
