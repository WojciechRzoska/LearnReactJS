import { setupWorker } from 'msw';
import { db } from './db';
import { handlers } from './handlers/index';

export const worker = setupWorker(...handlers);

const seed = () => {
  db.group.create({
    id: 'A',
  });
  db.group.create({
    id: 'B',
  });
  db.group.create({
    id: 'C',
  });
  for (let i = 0; i < 15; i++) {
    db.student.create();
    db.event.create();
  }
  db.teacher.create();

  db.note.create();
  db.note.create();
};

seed();

window.mocks = {
  seed,
  getStudents: () => db.student.getAll(),
  getEvents: () => db.event.getAll(),
  getGroups: () => db.group.getAll(),
};
