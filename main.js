const buttonsParent = document.getElementsByClassName("menu-buttons")[0]

new HoverSelect(buttonsParent, "Syntax", [
  "Introduction",
  "Variables",
  "Operators",
  "Data types",
  "Functions",
  "Objects"
])