'use strict';

//Drill 1

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


//Drill 2

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
    ...text.split('').map(char => ((char.charCodeAt() - 97 + shift) % 26) + 97)
  );
};

//Drill 3

app.get('/lotto', (req, res) => {
  let { numbers } = req.query;

  numbers = numbers.map((num) => parseInt(num));

  if (!numbers) {
    return res
      .status(400)
      .send('number is required');
  }

  if (!Array.isArray(numbers)) {
    return res
      .status(400)
      .send('number must be an array');
  }

  if (!numbers.length === 6) {
    return res
      .status(400)
      .send('there must be 6 numbers');
  }
  if (Number.isInteger(numbers)) {
    return res
      .status(400)
      .send('must be a number');
  }
  var unique = numbers.filter((v, i, a) => a.indexOf(v) === i);
  if (!unique.length === 6) {
    return res
      .status(400)
      .send('each number must be unique');
  }

  let lotto = [];
  for (let i = 0; i < 6; i++) {
    lotto.push(Math.ceil(Math.random() * 20));
  }
  console.log(lotto);
  console.log(numbers);
 

  let union = [...new Set([...lotto, ...numbers])];

  if (union.length === 6) {
    return res
      .send('Wow! Unbelievable! You could have won the mega millions!');
  }
  else if (union.length === 7) {
    return res
      .send('Congrats! You won $100');
  }
  else if (union.length === 8) {
    return res
      .send('Congrats! you won a free ticket');
  }
  else {
    return res
      .send('Sorry, you lose');
  }

});
app.listen(8090, () => {
  console.log('Express server is listening on port 8090!');
});