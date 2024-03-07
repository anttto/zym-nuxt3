export default eventHandler(() => {
  // return {
  //   massage: 'Hello',
  // };
  throw createError({
    statusCode: 404,
    statusMessage: '페이지를 찾을 수 없습니다.',
  });
});
