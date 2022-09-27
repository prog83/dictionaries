/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import request from 'supertest';

import 'env';
import { app } from 'main';
import db from 'db';
import { PermissionsRepository } from 'repositories';
import { PermissionDto } from 'dtos';

import { ERROR_BODY_BAD_REQUEST, ERROR_BODY_NOT_FOUND } from './errors';

const baseRoute = '/permissions';

const permission: PermissionDto = {
  id: 0,
  label: 'test',
  alias: 'test',
};

beforeAll(async () => {
  await db.initialize();
});

afterAll(async () => {
  await PermissionsRepository.removePermission(permission.id);
  await db.destroy();
});

describe(`POST ${baseRoute}`, () => {
  describe('check require data', () => {
    it('shouldn`t create permission with not require id', async () => {
      const { status, body } = await request(app)
        .post(baseRoute)
        .send({ ...permission, id: undefined });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });

    it('shouldn`t create permission with not require label', async () => {
      const { status, body } = await request(app)
        .post(baseRoute)
        .send({ ...permission, label: '' });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });

    it('shouldn`t create permission with not require alias', async () => {
      const { status, body } = await request(app)
        .post(baseRoute)
        .send({ ...permission, alias: '' });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });
  });

  describe('check validate data', () => {
    it('shouldn`t create permission with no valid id', async () => {
      const { status, body } = await request(app)
        .post(baseRoute)
        .send({ ...permission, id: '0' });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });

    it('shouldn`t create permission with no valid label', async () => {
      const { status, body } = await request(app)
        .post(baseRoute)
        .send({ ...permission, label: ''.padStart(51, '*') });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });

    it('shouldn`t create permission with no valid alias', async () => {
      const { status, body } = await request(app)
        .post(baseRoute)
        .send({ ...permission, alias: ''.padStart(51, '*') });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });
  });

  it('should create permission', () => request(app).post(baseRoute).send(permission).expect(201));
});

describe(`PUT ${baseRoute}/:id`, () => {
  const url = `${baseRoute}/${permission.id}`;

  describe('check require data', () => {
    it('shouldn`t update permission with not require label', async () => {
      const { status, body } = await request(app)
        .put(url)
        .send({ ...permission, label: '' });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });
  });

  describe('check validate', () => {
    it('shouldn`t update permission not valid id', async () => {
      const { status, body } = await request(app).put(`${baseRoute}/${Infinity}`).send({ label: permission.label });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });

    it('shouldn`t update permission not exists role', async () => {
      const { status, body } = await request(app).put(`${baseRoute}/31999`).send({ label: permission.label });

      expect(status).toBe(404);
      expect(body).toMatchObject(ERROR_BODY_NOT_FOUND);
    });

    it('shouldn`t update permission with no valid label', async () => {
      const { status, body } = await request(app)
        .put(url)
        .send({ label: ''.padStart(51, '*') });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });
  });

  it('should update permission', () => request(app).put(url).send({ label: permission.label }).expect(200));
});

describe(`GET ${baseRoute}`, () => {
  it('should get permissions', async () => {
    const { status, body } = await request(app).get(baseRoute);

    expect(status).toBe(200);
    expect(Array.isArray(body)).toBe(true);
    expect(body).toContainEqual({
      id: expect.any(Number),
      label: expect.any(String),
      alias: expect.any(String),
    });
  });
});

describe(`GET ${baseRoute}/:id`, () => {
  it('shouldn`t get permission not valid id', async () => {
    const { status, body } = await request(app).get(`${baseRoute}/${Infinity}`);

    expect(status).toBe(400);
    expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
  });

  it('shouldn`t get permission not exists id', async () => {
    const { status, body } = await request(app).get(`${baseRoute}/31999`);

    expect(status).toBe(404);
    expect(body).toMatchObject(ERROR_BODY_NOT_FOUND);
  });

  it('should get permission', async () => {
    const { status, body } = await request(app).get(`${baseRoute}/${permission.id}`);

    expect(status).toBe(200);
    expect(body).toEqual(permission);
  });
});
