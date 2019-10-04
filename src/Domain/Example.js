const src = process.env.SRC;
const Trait     = require(`${src}/Util/Decorate/Trait`).Trait;
const PieceA    = require(`${src}/Domain/PieceA`);
const PieceB    = require(`${src}/Domain/PieceB`);

// // Below code is compatible with JS version that supports Decorators
// @Trait(PieceA)
// @Trait(PieceB)
// class Example
// {}

// Below code can be used with JS version that do not support Decorators
class Example
{}

Trait(PieceA)(Example);
Trait(PieceB)(Example);

module.exports = Example;
