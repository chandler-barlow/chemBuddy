// ENUM //
const ARROW = 0;
const COMPOUND = 1;
const ELEMENT = 3;
const SCALAR = 4;
// TOKEN OBJECT
function Token(type, value) {
  this.type = type;
  this.value = value;
}
// TAKES A COMPOUND STRING AND CREATES TOKENS
// EITHER AN ELEMENT OR A SCALAR
function compoundTokenizer(s) {
  let r = [];
  let scalarBuffer = [];
  const getScalarFromBuffer = (buffer) =>
    buffer.reverse().reduce((inc, e, i) => inc + e * Math.pow(10, i), 0);
  let elementBuffer = [];
  const getElementFromBuffer = (buffer) =>
    buffer.reduce((inc, e) => inc + e, "");

  for (var i of s) {
    let e = parseInt(i);
    if (e || e === 0) {
      // If there is an element in the buffer process that before handling the number
      if (elementBuffer.length > 0) {
        r.push(new Token(ELEMENT, getElementFromBuffer(elementBuffer)));
        elementBuffer = [];
      }
      // push the scalar into the buffer
      scalarBuffer.push(e);
    } else {
      // If the scalar buffer has elements deal with them before handling element symbol
      if (scalarBuffer.length > 0) {
        r.push(new Token(SCALAR, getScalarFromBuffer(scalarBuffer)));
        scalarBuffer = [];
      }
      // If there is already an element symbol in the buffer pop it before adding more
      if (elementBuffer.length > 1) {
        r.push(new Token(ELEMENT, getElementFromBuffer(elementBuffer)));
        elementBuffer = [];
      }
      // Always push character into buffer
      elementBuffer.push(i);
    }
  }
  if (elementBuffer.length > 0)
    r.push(new Token(ELEMENT, getElementFromBuffer(elementBuffer)));
  if (scalarBuffer.length > 0)
    r.push(new Token(SCALAR, getScalarFromBuffer(scalarBuffer)));
  return r;
}

function parseCompound(s) {
  let tokens = compoundTokenizer(s);
  // Go through all tokens and create a list of element and amount pairs
  let compound = tokens.reduce((inc, e, i) => {
    if (e.type === ELEMENT) {
      inc.push([e.value, 0]);
    }
    if (e.type === SCALAR) {
      inc[inc.length - 1][1] = e.value;
    }
    return inc;
  }, []);
  // Make sure all elements have a value assigned. If they are assigned zero value make sure they are assigned 1
  let r = compound.reduce((inc, e, i) => {
    inc[e[0]] = e[1] === 0 ? 1 : e[1];
    return inc;
  }, {});
  return r;
}

function formulaTokenizer(s) {
  let keys = s.split(" ");
  console.log(keys);
  let res = {};
  for (var i in keys) {
    if (keys[i] === "=>") {
    }
  }
}
