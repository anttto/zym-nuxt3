import { getCourseDetails } from '~/server/model/courses';

export default defineEventHandler((event) => {
  const courseSlug = getRouterParam(event, 'courseSlug') as string;
  console.log(courseSlug);
  const courseDetails = getCourseDetails(courseSlug);
  if (!courseDetails.course) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Server Error',
    });
  }
  return courseDetails;
});
