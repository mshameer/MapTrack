export function calDistanceKm(fromLatLng, toLatLng) {
  var e = Math,
    ra = e.PI / 180;
  var b = fromLatLng.latitude * ra,
    c = toLatLng.latitude * ra,
    d = b - c;
  var g = fromLatLng.longitude * ra - toLatLng.longitude * ra;
  var f =
    2 *
    e.asin(
      e.sqrt(
        e.pow(e.sin(d / 2), 2) + e.cos(b) * e.cos(c) * e.pow(e.sin(g / 2), 2)
      )
    );
  return f * 6378.137;
}
