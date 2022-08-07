import '@testing-library/jest-dom';
import { server } from './app/mocks/server.ts';
import 'whatwg-fetch';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

global.jasmine = true;
