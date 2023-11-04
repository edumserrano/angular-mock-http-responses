import { http, HttpResponse } from 'msw';
import cars from './cars.json';
import bikes from './bikes.json';

export const handlers = [
  http.get('/api/cars', () => {
    return HttpResponse.json(cars);
  }),
  http.get('/api/bikes', () => {
    return HttpResponse.json(bikes);
  }),
];
