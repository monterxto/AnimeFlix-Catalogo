import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
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
      .expect('Hello World!');
  });

  // create a test for the /categories endpoint
  it('/categories (GET)', () => {
    return request(app.getHttpServer())
      .get('/categories')
      .expect(200)
      .expect([]);
  });

  // create a test for the /categories/:id endpoint
  it('/categories/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/categories/1')
      .expect(200)
      .expect({});
  });

  // create a test for the /categories/:id endpoint
  it('/categories/:id (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/categories/1')
      .expect(200)
      .expect({});
  });
});
