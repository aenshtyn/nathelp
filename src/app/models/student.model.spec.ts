import { Student } from './student.model';

describe('Students', () => {
  it('should create an instance', () => {
    expect(new Student  ()).toBeTruthy();
  });
});
