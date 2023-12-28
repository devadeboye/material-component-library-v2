const fs = require("fs");
const docs = fs.readFileSync("docs/index.md", "utf-8");

const updatedReadme =
	`# material-component-library-v2

Material component library is a library of custom react components implemented according to [material design 3](https://m3.material.io) specification using react, typescript and tailwindcss. \n\n` +
	docs;

fs.writeFileSync("README.md", updatedReadme, "utf-8");
