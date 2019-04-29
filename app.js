'use strict';

const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/sum', (req, res) => {
  const { a, b } = req.query;

  if (!a) {
    return res
      .status(400)
      .send('must include a');
  }
  if (!b) {
    return res
      .status(400)
      .send('must include b');
  }
  const numberA = parseFloat(a);
  const numberB = parseFloat(b);

  if (isNaN(numberA)) {
    return res
      .status(400)
      .send('a must be a number');
  }
  if (isNaN(numberB)) {
    return res
      .status(400)
      .send('b must be a number');
  }

  const c = numberA + numberB;

  const response = `the sum of ${numberA} and ${numberB} is ${c}`;
  return res
    .status(200)
    .send(response);

});

app.get('/cipher', (req, res) => {
  const { text, shift } = req.query;

  if (!text) {
    return res
      .status(400)
      .send('must include some text');
  }
  if (!shift) {
    return res
      .status(400)
      .send('Caeser must be paid his due');
  }

  const response = caesar(text, shift)

  return res
    .status(200)
    .send(response);

});


app.listen(8080, () => {
  console.log('Express server is listening on port 8080!');
});

const caesar = (text, shift) => {
  return String.fromCharCode(
    ...text.split('').map(char => ((char.charCodeAt() - 97 + shift) % 26) + 97),
  );
};