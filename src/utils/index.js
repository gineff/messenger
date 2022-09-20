const goToElementHref = (element) => {
  const href = element.getAttributeNode("href").value;
  if (href !== undefined) window.location = href;
};

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
      if (typeof value === "function") {
        return `${prev} ${key}="${wrapFunction(value)}"`;
      }

      return `${prev} ${key}={{${key}}}`;
    }, "")
    .trim();

export { wrapFunction, uid, goToElementHref, stringifyProps };
