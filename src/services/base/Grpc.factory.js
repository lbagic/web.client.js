import { createInterceptor } from "./Grpc.utils";

function GatewayControllerPromiseClient() {}

/**
 * Create grpc instance.
 *
 * @param {{
 *  hostname: String,
 *  getToken: () => String,
 * }} config Decsripton.
 * @return { GatewayControllerPromiseClient } Return description.
 */

export const createGrpc = (config) => {
  const { getToken, hostname } = config;
  if (!hostname) throw new Error("Grpc hostname is missing.");

  const interceptor = createInterceptor(getToken, new Map());
  const interceptors = {
    unaryInterceptors: [interceptor],
    streamInterceptors: [interceptor],
  };

  return new GatewayControllerPromiseClient(hostname, undefined, interceptors);
};
