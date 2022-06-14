const request = require('supertest');
const assert = require('assert');
const express = require('express');


// const app = express();
import app from '../server/server';

describe('Retrieves a list of questions for a particular product.', function() {
  it('tests basic get request', async function() {
    const response = await request(app)
      .get('/qa/questions?product_id=3');
      expect(response.statusCode).toEqual(200);
      expect(response._body.length).toEqual(5);
  });

  it('test count input', async function() {
    const response = await request(app)
      .get('/qa/questions?product_id=3&count=8');
      expect(response.statusCode).toEqual(200);
      expect(response._body.length).toEqual(8);
  });
});

describe('Returns answers for a given question. ', function() {
  it('tests basic get request for answers table', async function() {
    const response = await request(app)
      .get('/qa/questions/:question_id/answers?question_id=1');
      expect(response.statusCode).toEqual(200);
      expect(response._body.length).toEqual(5);
  });

  it('test answers with count input', async function() {
    const response = await request(app)
      .get('/qa/questions?product_id=3&count=8');
      expect(response.statusCode).toEqual(200);
      expect(response._body.length).toEqual(8);
  });

});

describe('Adds a question for the given product', function() {
  it('successfully posts a question', async function() {
    const response = await request(app)
      .post('/qa/questions')
      .send(
      {
        body: "akjsdbnfkajsbndfkjasbdfasdf",
        name: "asdfasdf",
        email: "ajsdfasdf@gmail.com",
        product_id: 1
      });
      expect(response.statusCode).toEqual(201);
  });
});

describe('Adds an answer for the given question', function() {
  it('successfully posts an answer', async function() {
    const response = await request(app)
      .post('/qa/questions/:question_id/answers?question_id=1')
      .send(
      {
        body: "akjsdbnfkajsbndfkjasbdfasdf",
        name: "asdfasdf",
        email: "ajsdfasdf@gmail.com",
        photos: []
      });
      expect(response.statusCode).toEqual(201);
  });
});

describe('PUT /qa/questions/:question_id/helpful', function() {
  it('Updates a question to show it was found helpful.', async function() {
    const response = await request(app)
      .put('/qa/questions/:question_id/helpful?question_id=1');
      expect(response.statusCode).toEqual(204);

  });

  it('Updates a question to show it was found helpful.', async function() {
    const response = await request(app)
      .put('/qa/questions/:question_id/helpful?question_id=2');
      expect(response.statusCode).toEqual(204);

  });
});

describe('Updates a question to show it was reported. Note, this action does not delete the question, but the question will not be returned in the above GET request.', function() {
  it('Updates a question to show it was reported..', async function() {
    const response = await request(app)
      .put('/qa/questions/:question_id/report?question_id=1');
      expect(response.statusCode).toEqual(204);

  });

  it('Updates a question to show it was reported..', async function() {
    const response = await request(app)
      .put('/qa/questions/:question_id/report?question_id=2');
      expect(response.statusCode).toEqual(204);
  });
});

describe('Updates an answer to show it was found helpful.', function() {
  it('Updates an answer to show it was found helpful.', async function() {
    const response = await request(app)
      .put('/qa/answers/:answer_id/helpful?answer_id=1');
      expect(response.statusCode).toEqual(204);

  });

  it('Updates a question to show it was found helpful.', async function() {
    const response = await request(app)
      .put('/qa/answers/:answer_id/helpful?answer_id=2');
      expect(response.statusCode).toEqual(204);

  });
});

describe('Updates an answer to show it has been reported.', function() {
  it('Updates an answer to show it has been reported.', async function() {
    const response = await request(app)
      .put('/qa/answers/:answer_id/report?answer_id=1');
      expect(response.statusCode).toEqual(204);

  });

  it('Updates an answer to show it has been reported.', async function() {
    const response = await request(app)
      .put('/qa/answers/:answer_id/report?answer_id=2');
      expect(response.statusCode).toEqual(204);
  });
});