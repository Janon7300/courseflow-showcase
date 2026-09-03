import test from "node:test";
import assert from "node:assert/strict";
import { calculateProgress } from "../src/progress.ts";
import { courses, groups, sampleSelection } from "../src/demoData.ts";

test("empty selection earns nothing", () => {
  assert.deepEqual([calculateProgress([]).earned, calculateProgress([]).remaining, calculateProgress([]).percent], [0, 36, 0]);
});
test("demo data has twelve unique synthetic IDs", () => {
  assert.equal(courses.length, 12);
  assert.equal(new Set(courses.map(course => course.id)).size, 12);
  assert.ok(courses.every(course => /^DEMO-[FSE][0-9]{2}$/.test(course.id)));
});
test("category totals match catalogue credits", () => {
  for (const group of groups) assert.equal(courses.filter(course => course.group === group.id).reduce((sum, course) => sum + course.credits, 0), group.required);
});
test("sample selection earns 21 units", () => {
  const report = calculateProgress(sampleSelection);
  assert.equal(report.earned, 21);
  assert.equal(report.remaining, 15);
  assert.equal(report.percent, 58);
  assert.deepEqual(report.categories.map(group => group.earned), [9, 12, 0]);
});
test("all courses complete the programme", () => {
  const report = calculateProgress(courses.map(course => course.id));
  assert.equal(report.earned, 36); assert.equal(report.percent, 100); assert.equal(report.remaining, 0);
});
test("duplicates cannot inflate credits", () => assert.equal(calculateProgress(["DEMO-F01", "DEMO-F01"]).earned, 3));
test("unknown IDs earn no credits", () => assert.equal(calculateProgress(["UNKNOWN"]).earned, 0));
test("removing a course reduces the result", () => assert.equal(calculateProgress(sampleSelection.slice(1)).earned, 18));
test("calculation does not mutate inputs", () => {
  const ids = Object.freeze([...sampleSelection]);
  calculateProgress(ids);
  assert.deepEqual(ids, sampleSelection);
});
