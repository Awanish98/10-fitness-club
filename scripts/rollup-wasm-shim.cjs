/*
 * Environment shim: this machine's Application Control policy blocks the native
 * Rollup .node binary. Redirect Rollup's native loader to the official WASM build
 * so `npm run build` works here. Harmless on machines where native Rollup loads.
 */
const Module = require('node:module');

const wasmNativePath = require.resolve('@rollup/wasm-node/dist/native.js');
const originalResolveFilename = Module._resolveFilename;

Module._resolveFilename = function patchedResolveFilename(request, parent, ...rest) {
  const resolved = originalResolveFilename.call(this, request, parent, ...rest);
  const normalized = resolved.replace(/\\/g, '/');
  if (normalized.endsWith('/rollup/dist/native.js') && !normalized.includes('/@rollup/wasm-node/')) {
    return wasmNativePath;
  }
  return resolved;
};
