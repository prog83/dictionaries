/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import request from 'supertest';

import 'env';
import { app } from 'main';
import db from 'db';
import { UnitsRepository } from 'repositories';
import { UnitDto } from 'dtos';

import { ERROR_BODY_BAD_REQUEST, ERROR_BODY_NOT_FOUND } from './errors';

const baseRoute = '/units';

const unit: UnitDto = {
  id: 0,
  label: 'Some text',
};

beforeAll(async () => {
  await db.initialize();
});

afterAll(async () => {
  await UnitsRepository.removeUnit(unit.id);
  await db.destroy();
});

describe(`POST ${baseRoute}`, () => {
  describe('check require data', () => {
    it('shouldn`t create unit with not require id', async () => {
      const { status, body } = await request(app)
        .post(baseRoute)
        .send({ ...unit, id: undefined });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });

    it('shouldn`t create unit with not require label', async () => {
      const { status, body } = await request(app)
        .post(baseRoute)
        .send({ ...unit, label: '' });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });
  });

  describe('check validate data', () => {
    it('shouldn`t create unit with no valid id', async () => {
      const { status, body } = await request(app)
        .post(baseRoute)
        .send({ ...unit, id: '0' });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });

    it('shouldn`t create unit with no valid label', async () => {
      const { status, body } = await request(app)
        .post(baseRoute)
        .send({ ...unit, label: ''.padStart(51, '*') });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });
  });

  it('should create unit', () => request(app).post(baseRoute).send(unit).expect(201));
});

describe(`PUT ${baseRoute}/:id`, () => {
  const url = `/units/${unit.id}`;

  describe('check require data', () => {
    it('shouldn`t update unit with not require label', async () => {
      const { status, body } = await request(app)
        .put(url)
        .send({ ...unit, label: '' });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });
  });

  describe('check validate', () => {
    it('shouldn`t update unit not valid id', async () => {
      const { status, body } = await request(app).put(`${baseRoute}/${Infinity}`).send({ label: unit.label });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });

    it('shouldn`t update unit not exists unit', async () => {
      const { status, body } = await request(app).put(`${baseRoute}/31999`).send({ label: unit.label });

      expect(status).toBe(404);
      expect(body).toMatchObject(ERROR_BODY_NOT_FOUND);
    });

    it('shouldn`t update unit with no valid label', async () => {
      const { status, body } = await request(app)
        .put(url)
        .send({ label: ''.padStart(51, '*') });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });
  });

  it('should update unit', () => request(app).put(url).send({ label: unit.label }).expect(200));
});

describe(`GET ${baseRoute}`, () => {
  it('should get units', async () => {
    const { status, body } = await request(app).get(baseRoute);

    expect(status).toBe(200);
    expect(Array.isArray(body)).toBe(true);
    expect(body).toContainEqual({
      id: expect.any(Number),
      label: expect.any(String),
    });
  });
});

describe(`GET ${baseRoute}/:id`, () => {
  it('shouldn`t get unit not valid id', async () => {
    const { status, body } = await request(app).get(`${baseRoute}/${Infinity}`);

    expect(status).toBe(400);
    expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
  });

  it('shouldn`t get unit not exists id', async () => {
    const { status, body } = await request(app).get(`${baseRoute}/31999`);

    expect(status).toBe(404);
    expect(body).toMatchObject(ERROR_BODY_NOT_FOUND);
  });

  it('should get unit', async () => {
    const { status, body } = await request(app).get(`${baseRoute}/${unit.id}`);

    expect(status).toBe(200);
    expect(body).toEqual(unit);
  });
});
