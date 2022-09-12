/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import request from 'supertest';

import 'env';
import { app } from 'app';
import db from 'db';
import { unitsRepository } from 'repositories';
import type { Unit } from 'types/units';

const unit: Unit = {
  id: 0,
  label: 'Some text',
};

beforeAll(async () => {
  await db.initialize();
});

afterAll(async () => {
  await unitsRepository.removeUnit(unit.id);
  await db.destroy();
});

describe('POST /units', () => {
  describe('check require data', () => {
    it('shouldn`t create unit with not require id', async () => {
      const { status, body } = await request(app)
        .post('/units')
        .send({ ...unit, id: undefined });

      expect(status).toBe(400);
      expect(body).toMatchObject({
        statusCode: 400,
        timestamp: expect.any(String),
        message: expect.any(String),
        errors: expect.any(Array),
      });
    });

    it('shouldn`t create unit with not require label', async () => {
      const { status, body } = await request(app)
        .post('/units')
        .send({ ...unit, label: '' });

      expect(status).toBe(400);
      expect(body).toMatchObject({
        statusCode: 400,
        timestamp: expect.any(String),
        message: expect.any(String),
        errors: expect.any(Array),
      });
    });
  });

  describe('check validate', () => {
    it('shouldn`t create unit with no valid id', async () => {
      const { status, body } = await request(app)
        .post('/units')
        .send({ ...unit, id: '0' });

      expect(status).toBe(400);
      expect(body).toMatchObject({
        statusCode: 400,
        timestamp: expect.any(String),
        message: expect.any(String),
        errors: expect.any(Array),
      });
    });

    it('shouldn`t create unit with no valid label', async () => {
      const { status, body } = await request(app)
        .post('/units')
        .send({ ...unit, label: ''.padStart(51, '*') });

      expect(status).toBe(400);
      expect(body).toMatchObject({
        statusCode: 400,
        timestamp: expect.any(String),
        message: expect.any(String),
        errors: expect.any(Array),
      });
    });
  });

  it('should create unit', () => request(app).post('/units').send(unit).expect(201));
});

describe('PUT /units/:id', () => {
  const url = `/units/${unit.id}`;

  describe('check require data', () => {
    it('shouldn`t update unit with not require label', async () => {
      const { status, body } = await request(app)
        .put(url)
        .send({ ...unit, label: '' });

      expect(status).toBe(400);
      expect(body).toMatchObject({
        statusCode: 400,
        timestamp: expect.any(String),
        message: expect.any(String),
        errors: expect.any(Array),
      });
    });
  });

  describe('check validate', () => {
    it('shouldn`t update not valid id', async () => {
      const { status, body } = await request(app).put(`/units/${Infinity}`).send({ label: unit.label });

      expect(status).toBe(400);
      expect(body).toMatchObject({
        statusCode: 400,
        timestamp: expect.any(String),
        message: expect.any(String),
        errors: expect.any(Array),
      });
    });

    it('shouldn`t update not exists unit', async () => {
      const { status, body } = await request(app).put('/units/31999').send({ label: unit.label });

      expect(status).toBe(404);
      expect(body).toMatchObject({
        statusCode: 404,
        timestamp: expect.any(String),
        message: expect.any(String),
        errors: expect.any(Array),
      });
    });

    it('shouldn`t update unit with no valid label', async () => {
      const { status, body } = await request(app)
        .put(url)
        .send({ label: ''.padStart(51, '*') });

      expect(status).toBe(400);
      expect(body).toMatchObject({
        statusCode: 400,
        timestamp: expect.any(String),
        message: expect.any(String),
        errors: expect.any(Array),
      });
    });
  });

  it('should update unit', () => request(app).put(url).send({ label: unit.label }).expect(200));
});

describe('GET /units', () => {
  it('should get units', async () => {
    const { status, body } = await request(app).get('/units');

    expect(status).toBe(200);
    expect(Array.isArray(body)).toBe(true);
    expect(body).toContainEqual({
      id: expect.any(Number),
      label: expect.any(String),
    });
  });
});

describe('GET /units/:id', () => {
  it('shouldn`t get not valid id', async () => {
    const { status, body } = await request(app).get(`/units/${Infinity}`);

    expect(status).toBe(400);
    expect(body).toMatchObject({
      statusCode: 400,
      timestamp: expect.any(String),
      message: expect.any(String),
      errors: expect.any(Array),
    });
  });

  it('shouldn`t get not exists unit', async () => {
    const { status, body } = await request(app).get('/units/31999');

    expect(status).toBe(404);
    expect(body).toMatchObject({
      statusCode: 404,
      timestamp: expect.any(String),
      message: expect.any(String),
      errors: expect.any(Array),
    });
  });

  it('should get unit', async () => {
    const { status, body } = await request(app).get(`/units/${unit.id}`);

    expect(status).toBe(200);
    expect(body).toEqual(unit);
  });
});
