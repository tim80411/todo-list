const request = require('supertest')
const app = require('../app')
const { expect } = require('chai')

describe('使用者 API', () => {
  it('GET /users/login', done => {
    request(app)
      .get('/users/login')
      .expect(200)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .end((err, res) => {
        if (err) return done(err)
        expect(res.text).to.include('login', '應該要有登入').and.include('Sign in', '應該要有Sign in').and.include('Register', '應該要有Register')
        done()
      })
  })
})