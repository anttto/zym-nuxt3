import { getCourses } from '~/server/model/courses';

export default defineEventHandler(() => {
  const courses = getCourses();
  return courses;
});

interface CraftBeer {
  world: string;
  lv: number;
}

const brewBeer2 = (worldCode: string, level: number): CraftBeer => {
  const world = 'Server ' + worldCode;
  const lv = level;
  return { world, lv };
};
console.log(brewBeer2('6445', 1));
