export default function goToElementHref(element) {
  const href = element.getAttributeNode("href").value;
  if (href !== undefined) window.location = href;
}
