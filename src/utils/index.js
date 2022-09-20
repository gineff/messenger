const goToElementHref = (element) => {
  const href = element.getAttributeNode("href").value;
  if (href !== undefined) window.location = href;
};

// eslint-disable-next-line no-underscore-dangle
const _context = [];

const setContext = (el) => _context.push(el) - 1;
const getContext = (i) => _context[i];

const uid = () => Math.random().toString(16).slice(2) + Date.now().toString(16);

const wrapFunction = (f) => {
  const id = uid();
  const functionAlias = `functionId${id}`;
  window[functionAlias] = f;
  return `${functionAlias}(this)`;
};

const stringifyProps = (props, keys = false) =>
  Object.entries(props)
    .reduce((prev, [key, value]) => {
      if ((keys && !keys.include(key)) || value === undefined) {
        return prev;
      }

      if (typeof value === "string") {
        return `${prev} ${key}="${value}"`;
      }

      return `${prev} ${key}={{${setContext(value)}}}`;
    }, "")
    .trim();

const useContext = [getContext, setContext];

export { wrapFunction, uid, goToElementHref, stringifyProps, useContext };
