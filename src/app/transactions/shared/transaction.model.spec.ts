/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import {Transaction} from './transaction.model';

describe('Transaction', () => {
  it('should create an instance', () => {
    expect(new Transaction(null, null, null, null)).toBeTruthy();
  });
});
