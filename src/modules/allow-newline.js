/* Chrome creates <div> <br> on enter key so we don't want that to happen also it
saves that into local storage which is again something we don't want so we create regex
also to make this work we need to putcontentEditable="plaintext-only"
(taskList.js 64th line of code), spellCheck is to remove wavy red line under words
*/
export default (str) => {
  if (str.includes('\n')) {
    str = str.replaceAll('\n', '');
  }
  return str;
};
