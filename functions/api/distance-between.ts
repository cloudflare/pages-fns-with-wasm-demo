import wasmModule from "../../app-rust/pkg/src_wasm_bg.wasm";
import { GeoCoordinates } from "../../app-web/src/globe/geoCoordinates.interface";

export async function onRequestPost({ request }): Promise<Response> {
  const { from, to } = await request.json() as {from: GeoCoordinates, to: GeoCoordinates};

  const wasmModuleInstance = await WebAssembly.instantiate(wasmModule);
  const distanceBetweenFn = wasmModuleInstance.exports.distance_between as CallableFunction;
  const distanceBetween = distanceBetweenFn(from.latitude, from.longitude, to.latitude, to.longitude);

	return new Response(distanceBetween);
}