# Pages Functions with WebAssembly Demo

This is a demo application that exemplifies the use of Wasm module imports inside ⚡️[Pages Functions](https://developers.cloudflare.com/pages/platform/functions/) code. Head over to our [announcement]()(Not Yet Available) blog post to read more about it, or play with the live demo [here](https://pages-with-wasm-demo.pages.dev/).

The application computes the distance in kilometers on the surface of Earth between your current location (based on the geo coordinates of the incoming request) and any other point on the globe, each time you click on the globe's surface. The code that performs the actual high-performance distance calculation is written in Rust, but is invoked from within a Pages Function via the Wasm module import mechanism. 

## Credits

Kudos to [Vasco Asturiano](https://github.com/vasturiano) and all other contributors for their fantastic work on [globe.gl](https://github.com/vasturiano/globe.gl). 

❤︎

## Prerequisites

In order to run this project, you will need to have the following installed:

- [`wasm-pack`](https://rustwasm.github.io/wasm-pack/installer/) to generate the WebAssembly binaries from the Rust code. We recommend following [these](https://rustwasm.github.io/wasm-pack/book/quickstart.html) instructions.
- [`Node.js`](https://nodejs.org/en/download)
- [`yarn`](https://yarnpkg.com/getting-started/install) or [npm](https://docs.npmjs.com/) package manager

## Project structure

### `app-rust`

> The folder where the Rust application lives. 

Our Rust application project is based on [`wasm-pack-template`](https://github.com/rustwasm/wasm-pack-template). Please refer to the [Rust and WebAssembly book](https://rustwasm.github.io/docs/book/introduction.html) to read more about how to use Rust and WebAssembly together, and how to setup a project for that purpose. 

`app-rust/src/lib.rs` 

This file is the root of the Rust crate that we are compiling to WebAssembly. It uses `wasm-bindgen` to interface with JavaScript. 

In our case, `lib.rs` contains the source code of `distance_between()`, the function which computes the distance on the surface of Earth between two points, and which we invoke within our Pages Function.  

```rust
#[wasm_bindgen]
pub fn distance_between(from_latitude_degrees: f64, from_longitude_degrees: f64, to_latitude_degrees: f64, to_longitude_degrees: f64) -> f64 {
  let earth_radius_kilometer = 6371.0_f64;

  let from_latitude = from_latitude_degrees.to_radians();
  let to_latitude = to_latitude_degrees.to_radians();

   let delta_latitude = (from_latitude_degrees - to_latitude_degrees).to_radians();
   let delta_longitude = (from_longitude_degrees - to_longitude_degrees).to_radians();

  let central_angle_inner = (delta_latitude / 2.0).sin().powi(2)
    + from_latitude.cos() * to_latitude.cos() * (delta_longitude / 2.0).sin().powi(2);
  let central_angle = 2.0 * central_angle_inner.sqrt().asin();

  let distance = earth_radius_kilometer * central_angle;
    
  return distance;
}
````

To build the `app-rust` project you will need to run:
```sh
wasm-pack build
``` 

This orchestrates the following steps ([*](https://rustwasm.github.io/docs/book/game-of-life/hello-world.html#build-the-project)):
- Ensure that we have the correct Rust version and the wasm32-unknown-unknown target installed via rustup,
- Compile our Rust sources into a WebAssembly .wasm binary via cargo,
- Use wasm-bindgen to generate the JavaScript API for using our Rust-generated WebAssembly.

The resulting build artifacts will be outputted in the `pkg` directory. One of these artifacts is `src_wasm_bg.wasm`, the WebAssembly binary that contains the compiled-to-wasm versions of all of our Rust functions and data. This binary is the one we will import as a WebAssembly Module inside our Pages Function.

### `app-web`

> The folder where the client-side application lives.

The client application is responsible of rendering the globe on the page, allowing users to interract with it, and making all the necessary API calls. 

### `functions`

> The Pages Functions folder

Please refer to the Pages official [docs](https://developers.cloudflare.com/pages/platform/functions/routing/) for more information about Functions.
## Develop

Install npm dependencies

```sh
yarn
```

Build Rust project

```sh
yarn build:app-rust
```

Start local server

```sh
yarn dev
```
and go to `http://127.0.0.1:8788/` in your browser.