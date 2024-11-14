module.exports = {
  async echoRoute(fastify) {
    fastify.post("/echo", async (request) => {
      console.log("333336663338811");
      return request.body; // Echo the received data
    });
  },
};
