const buttonsParent = document.getElementsByClassName("menu-buttons")[0]

new HoverSelect(buttonsParent, "Syntax", [
  ["Introduction", "introduction"],
  ["Variables", "jsvariables"],
  ["Operators", "jsoperators"],
  ["Data types", "jstypes"],
  ["Functions", "jsfunctions"],
  ["Objects", "jsobjects"]
])

new HoverSelect(buttonsParent, "Lorem", [
  ["ipsum", "ipsum"],
  ["dolor", "dolor"],
  ["sit", "sit"],
  ["amet", "amet"]
])