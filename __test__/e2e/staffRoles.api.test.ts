/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import request from 'supertest';

import 'env';
import { app } from 'main';
import db from 'db';
import { StaffRolesRepository } from 'repositories';
import { StaffRoleDto } from 'dtos';

import { ERROR_BODY_BAD_REQUEST, ERROR_BODY_NOT_FOUND } from './errors';

const baseRoute = '/staff-roles';

const role: StaffRoleDto = {
  id: 0,
  label: 'test',
  alias: 'test',
};

beforeAll(async () => {
  await db.initialize();
});

afterAll(async () => {
  await StaffRolesRepository.removeRole(role.id);
  await db.destroy();
});

describe(`POST ${baseRoute}`, () => {
  describe('check require data', () => {
    it('shouldn`t create staff role with not require id', async () => {
      const { status, body } = await request(app)
        .post(baseRoute)
        .send({ ...role, id: undefined });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });

    it('shouldn`t create staff role with not require label', async () => {
      const { status, body } = await request(app)
        .post(baseRoute)
        .send({ ...role, label: '' });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });

    it('shouldn`t create staff role with not require alias', async () => {
      const { status, body } = await request(app)
        .post(baseRoute)
        .send({ ...role, alias: '' });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });
  });

  describe('check validate data', () => {
    it('shouldn`t create staff role with no valid id', async () => {
      const { status, body } = await request(app)
        .post(baseRoute)
        .send({ ...role, id: '0' });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });

    it('shouldn`t create staff role with no valid label', async () => {
      const { status, body } = await request(app)
        .post(baseRoute)
        .send({ ...role, label: ''.padStart(51, '*') });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });

    it('shouldn`t create staff role with no valid alias', async () => {
      const { status, body } = await request(app)
        .post(baseRoute)
        .send({ ...role, alias: ''.padStart(51, '*') });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });
  });

  it('should create staff role', () => request(app).post(baseRoute).send(role).expect(201));
});

describe(`PUT ${baseRoute}/:id`, () => {
  const url = `${baseRoute}/${role.id}`;

  describe('check require data', () => {
    it('shouldn`t update staff role with not require label', async () => {
      const { status, body } = await request(app)
        .put(url)
        .send({ ...role, label: '' });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });
  });

  describe('check validate', () => {
    it('shouldn`t update staff role not valid id', async () => {
      const { status, body } = await request(app).put(`${baseRoute}/${Infinity}`).send({ label: role.label });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });

    it('shouldn`t update staff role not exists role', async () => {
      const { status, body } = await request(app).put(`${baseRoute}/31999`).send({ label: role.label });

      expect(status).toBe(404);
      expect(body).toMatchObject(ERROR_BODY_NOT_FOUND);
    });

    it('shouldn`t update staff role with no valid label', async () => {
      const { status, body } = await request(app)
        .put(url)
        .send({ label: ''.padStart(51, '*') });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });
  });

  it('should update staff role', () => request(app).put(url).send({ label: role.label }).expect(200));
});

describe(`GET ${baseRoute}`, () => {
  it('should get staff roles', async () => {
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
  it('shouldn`t get staff role not valid id', async () => {
    const { status, body } = await request(app).get(`${baseRoute}/${Infinity}`);

    expect(status).toBe(400);
    expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
  });

  it('shouldn`t get staff role not exists id', async () => {
    const { status, body } = await request(app).get(`${baseRoute}/31999`);

    expect(status).toBe(404);
    expect(body).toMatchObject(ERROR_BODY_NOT_FOUND);
  });

  it('should get staff role', async () => {
    const { status, body } = await request(app).get(`${baseRoute}/${role.id}`);

    expect(status).toBe(200);
    expect(body).toEqual(role);
  });
});
