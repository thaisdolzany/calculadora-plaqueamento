// Tests for the calculation functions in index.html. Run with:  node --test
// The functions between "// <calc>" and "// </calc>" are loaded from the page itself,
// so the tests always check the code that is deployed.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const code = html.slice(html.indexOf("// <calc>"), html.indexOf("// </calc>"));
const ctx = {};
vm.runInNewContext(code + "\nthis.num = num; this.compute = compute;", ctx);
const { num, compute } = ctx;

const close = (a, b, tol = 1e-9) => assert.ok(Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${a} != ${b}`);

test("num accepts plain, decimal-comma and scientific input", () => {
  assert.equal(num("5000"), 5000);
  assert.equal(num(" 0,32 "), 0.32);
  assert.equal(num("0.1"), 0.1);
  assert.equal(num("1e6"), 1e6);
  assert.equal(num("1,5e6"), 1.5e6);
  assert.equal(num("2.5E-3"), 0.0025);
});

test("num rejects junk and ambiguous thousand separators", () => {
  for (const bad of ["", "abc", "100abc", "1e", "--5", "NaN", "Infinity", "1.000.000", "100.000", "1,000,000", "5 000x"]) {
    assert.ok(Number.isNaN(num(bad)), `should reject ${JSON.stringify(bad)}`);
  }
});

test("96-well plate example matches a hand calculation", () => {
  // 96 wells, 10% overage, 0.1 mL per well, 5,000 cells per well, stock 1e6 cells/mL
  const r = compute(0.32, 0.1, 96, 10, 1e6, 5000);
  close(r.totalWork, 10.56);          // 96 * 1.1 * 0.1 mL
  close(r.totalCells, 528000);        // 96 * 1.1 * 5000
  close(r.volStock, 0.528);           // 528,000 / 1e6 cells per mL
  close(r.volMedium, 10.032);
  close(r.dilution, 20);              // 1e6 / (5000 / 0.1)
  close(r.finalDensity, 15625);       // 5000 / 0.32 cm2
});

test("density mode gives the same recipe as the equivalent cells per well", () => {
  const area = 9.6, density = 2e4;
  const a = compute(area, 2, 6, 0, 5e5, density * area);
  close(a.totalCells, 6 * 192000);
  close(a.finalDensity, density);
});

test("suspension too dilute for the target is flagged, not given negative medium", () => {
  assert.equal(compute(0.32, 0.1, 96, 10, 1e4, 5000).error, "too_dilute");
});

test("out-of-range inputs name the field at fault", () => {
  assert.equal(compute(0, 0.1, 96, 10, 1e6, 5000).error, "area");
  assert.equal(compute(0.32, -1, 96, 10, 1e6, 5000).error, "wv");
  assert.equal(compute(0.32, 0.1, 2.5, 10, 1e6, 5000).error, "n");
  assert.equal(compute(0.32, 0.1, 0, 10, 1e6, 5000).error, "n");
  assert.equal(compute(0.32, 0.1, 96, -150, 1e6, 5000).error, "ov");
  assert.equal(compute(0.32, 0.1, 96, 101, 1e6, 5000).error, "ov");
  assert.equal(compute(0.32, 0.1, 96, 10, 1e6, NaN).error, "target");
  assert.equal(compute(0.32, 0.1, 96, 10, 0, 5000).error, "stock");
});

test("zero overage is allowed", () => {
  close(compute(0.32, 0.1, 10, 0, 1e6, 5000).totalWork, 1);
});
