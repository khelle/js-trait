/** Bootstrap **/
const Path    = require('path');
process.env.SRC = Path.resolve(__dirname);

/** Application **/
const src = process.env.SRC;
const Example = require(`${src}/Domain/Example`);

const main = () => {
    const app = new Example();
    app.helloA();
    app.helloB();
};

main();