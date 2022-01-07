import { ValueTransformer } from 'typeorm';

export const NumberTransformer: ValueTransformer = {
  from: (value: string): number => Number(value),
  to: (value: string): number => Number(value),
};

export const DateTransformer: ValueTransformer = {
  from: (value: string): Date => new Date(value),
  to: (value: string): Date => new Date(value),
};
