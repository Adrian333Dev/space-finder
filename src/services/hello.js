exports.main = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello! TABLE_NAME: ${process.env.TABLE_NAME}`,
    }),
  };
};
