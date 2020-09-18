const app = require('../routes/app').app;
const request = require('supertest-as-promised');
const chai = require('chai');

const expect = chai.expect;

describe('app', () => {
  describe('root route with agency header', () => {
    it('returns fare data as JSON', () =>
      request(app)
        .get('/')
        .set('Accept', 'application/json')
        .set('Agency', 'octa')
        .expect(200)
        .then(res => {
          expect(res.body.length).to.eq(6);
          expect(res.body[0]).to.have.all.keys(['id', 'price', 'duration', 'rider']);
          expect(res.body[5]).to.have.all.keys(['id', 'price', 'duration', 'rider']);
        })
      );
  });

  describe('root route with agency header', () => {
    it('returns fare data as JSON', () =>
      request(app)
        .get('/')
        .set('Accept', 'application/json')
        .set('Agency', 'sfmuni')
        .expect(200)
        .then(res => {
          expect(res.body.length).to.eq(4);
          expect(res.body[0]).to.have.all.keys(['id', 'price', 'duration', 'rider']);
          expect(res.body[3]).to.have.all.keys(['id', 'price', 'duration', 'rider']);
        })
      );
  });

  describe('v2 root route with agency header', () => {
    it('returns fare data as JSON', () =>
      request(app)
        .get('/v2')
        .set('Accept', 'application/json')
        .set('Agency', 'octa')
        .expect(200)
        .then(res => {
          expect(res.body.length).to.eq(3);
          expect(res.body).to.include.deep.members( [{'1-hour': [{ 'Adult': 1.50 }, { 'Special': 0.50 }]}] );
          expect(res.body[0]).to.have.all.keys('1-hour');
          expect(res.body[2]).to.have.all.keys('Week pass');
        })
      );
  });

  describe('v2 root route with agency header', () => {
    it('returns fare data as JSON', () =>
      request(app)
        .get('/v2')
        .set('Accept', 'application/json')
        .set('Agency', 'sfmuni')
        .expect(200)
        .then(res => {
          expect(res.body.length).to.eq(2);
          expect(res.body).to.include.deep.members( [{'7-day': [{ 'Adult': 5.00 }]}] );
          expect(res.body[0]).to.have.all.keys('1-hour');
          expect(res.body[1]).to.have.all.keys('7-day');
        })
      );
  });
});
