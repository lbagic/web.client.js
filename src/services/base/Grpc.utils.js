import { toast } from "../../store/modules/Toast";

const logStyle = "font-weight: bold;";

/**
 * Handles custom grpc options.
 *
 * @typedef {{
 *   useToasts: Boolean,
 *   requestMessage: String,
 *   responseMessage: String,
 *   errorMessage: String
 * }} GrpcOptions
 *
 * @param { GrpcOptions } options Custom grpc options.
 * @return {{ options: GrpcOptions }} Returns custom options.
 */

export const useOptions = (options) => ({ options });

/**
 * Resolves grpc request context.
 *
 * @param { any } req Grpc request object.
 * @return {{ name: String, request: Object, metadata: Object, options: GrpcOptions }} Returns request context.
 */

export function resolveGrpcRequestContext(req) {
  const { name } = req.getMethodDescriptor();
  const request = req.getRequestMessage().toObject();
  const metadata = req.getMetadata();
  const options = metadata.options || {};
  delete metadata.options;

  return {
    name: name.slice(name.lastIndexOf("/") + 1),
    request,
    metadata,
    options,
  };
}

export function resolveGrpcCall({ req, invoker, ctx, callMap }) {
  const key = JSON.stringify(ctx);
  const savedCall = callMap.get(key);
  const call = savedCall || invoker(req);
  if (!savedCall) callMap.set(key, call);

  const deleteEntry = () => callMap.delete(key);
  call?.catch?.(() => {}).finally?.(deleteEntry);
  call?.on?.("end", deleteEntry);
  call?.on?.("error", deleteEntry);

  return { call, isDuplicateCall: !!savedCall };
}

/**
 * Attach grpc call hooks.
 *
 * @param  {{
 *  onCall: () => {},
 *  onResponse: (ctx: { response: {} }) => {},
 *  onUnaryResponse: (ctx: { response: {} }) => {},
 *  onStreamResponse: (ctx: { response: {} }) => {},
 *  onStreamEnd: () => {},
 *  onError: (ctx: { error: Error }) => {},
 * }} hooks Grpc interceptor hooks.
 */

export function addGrpcCallHooks(call, hooks) {
  const {
    onCall,
    onResponse,
    onUnaryResponse,
    onStreamResponse,
    onError,
    onStreamEnd,
  } = hooks;

  const type = typeof call?.on === "function" ? "stream" : "promise";

  if (onCall) onCall();
  if (type === "promise") {
    if (onResponse)
      call
        .then((res) =>
          onResponse({ response: res.getResponseMessage().toObject() })
        )
        .catch(() => {});
    if (onUnaryResponse)
      call
        .then((res) =>
          onUnaryResponse({
            response: res.getResponseMessage().toObject(),
          })
        )
        .catch(() => {});
    if (onError) call.catch((error) => onError({ error }));
  } else if (type === "stream") {
    if (onResponse || onStreamResponse)
      call.on("data", (res) => {
        onResponse?.({ response: res.toObject() });
        onStreamResponse?.({ response: res.toObject() });
      });
    if (onError) call.on("error", (error) => onError({ error }));
    if (onStreamEnd) call.on("end", () => onStreamEnd());
  }
}

export const createInterceptor = (getToken, callMap) => ({
  intercept(req, invoker) {
    const ctx = resolveGrpcRequestContext(req);
    const { name, metadata, options, request } = ctx;
    const { errorMessage, requestMessage, responseMessage, useToasts } =
      options;

    // Authentication handler
    const token = getToken?.();
    if (token && !metadata.Authorization)
      metadata.Authorization = `Bearer ${getToken()}`;

    const { call, isDuplicateCall } = resolveGrpcCall({
      callMap,
      ctx,
      invoker,
      req,
    });
    const type = typeof call?.on === "function" ? "stream" : "promise";

    // Debug handlers calls
    if (process.env.NODE_ENV !== "production" && !isDuplicateCall)
      addGrpcCallHooks(call, {
        onCall() {
          if (type === "stream")
            console.log(`%c[stream init] ${name}`, logStyle, { request });
        },
        onUnaryResponse({ response }) {
          console.log(`%c${name}`, logStyle, {
            request,
            response,
          });
        },
        onStreamResponse({ response }) {
          console.log(`%c[stream] ${name}`, logStyle, { response });
        },
        onStreamEnd() {
          console.log(`%c[stream end] ${name}`, logStyle, { request });
        },
        onError({ error }) {
          const title = type === "stream" ? "[stream error]" : "[error]";
          console.warn(`%c${title} ${name}`, logStyle, {
            request,
            error,
          });
        },
      });

    // Notification hooks
    if (!isDuplicateCall) {
      addGrpcCallHooks(call, {
        onCall: () => requestMessage && toast.success(requestMessage),
        onUnaryResponse({ response }) {
          if (useToasts & response?.status?.message)
            toast.success(response.status.message);
          if (responseMessage) toast.success(responseMessage);
        },
        onStreamEnd: () => responseMessage && toast.success(responseMessage),
        onError({ error }) {
          if (useToasts && error?.message) toast.error(error.message);
          if (errorMessage) toast.error(errorMessage);
        },
      });
    }

    return call;
  },
});
