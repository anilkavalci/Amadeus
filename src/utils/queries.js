import instance from './axios';

export const airports = () => instance.get('/amaduesCase');
