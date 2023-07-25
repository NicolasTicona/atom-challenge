import { validateStatus } from './validate-task-status.util';

describe('Validate Task Status', () => {
  test('should validate status is "pending" or "completed" ', () => {
    let status = 'completed';
    let isValid = validateStatus(status);
    expect(isValid).toBeTruthy();

    status = 'pending';
    isValid = validateStatus(status);
    expect(isValid).toBeTruthy();
  });

  test('should validate status is invalid', () => {
    const status = 'any status';
    const isValid = validateStatus(status);
    expect(isValid).toBeFalsy();
  });
});
