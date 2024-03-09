import { getCourses } from '~/server/model/courses';

export default defineEventHandler(() => {
  const courses = getCourses();
  return courses;
});
