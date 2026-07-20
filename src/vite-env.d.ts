/// <reference types="vite/client" />
/// <reference types="google.maps" />

// Fallback stubs in case the Google Maps type package isn't picked up
// automatically. Kept as `any` so runtime code is unaffected.
declare namespace google {
  namespace maps {
    type Map = any;
    type Marker = any;
    type Geocoder = any;
    type InfoWindow = any;
    type MapMouseEvent = any;
    type LatLngLiteral = { lat: number; lng: number };
  }
}
declare const google: any;
