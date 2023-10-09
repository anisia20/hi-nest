import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  //beforeAll app 유지
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie Api');
  });

  describe("/movies", () => {
    it("GET 200", ()=> {
      return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect([]);
    });
    it('POST 201', () =>{
      return request(app.getHttpServer())
      .post('/movies')
      .send({
        title: "Test Movies",
        genres: ["test"],
        year: 2000
      })
      .expect(201);
    });
    it('POST 400', () =>{
      return request(app.getHttpServer())
      .post('/movies')
      .send({
        title: "Test Movies",
        genres: ["test"],
        year: 2000,
        other: 'thing'
      })
      .expect(201);
    });
  });
  describe("/movies/:id", () => {
    it("GET 200", () => {
      return request(app.getHttpServer())
      .get("/movies/1")
      .expect(200);
    });
    it("GET 404", () => {
      return request(app.getHttpServer())
      .get('/movies/999')
      .expect(404);
    });
    it('PATCH 200', () => {
      return request(app.getHttpServer())
      .patch('/movies/1')
      .send({
        title: "Updated Movies"
      })
      .expect(200);
    });
    it('DELETE', () =>{
      return request(app.getHttpServer())
      .delete('/movies/1')
      .expect(200);
    });
  });

});
