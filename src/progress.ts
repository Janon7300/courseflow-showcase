import { courses, groups } from "./demoData.ts";

export function calculateProgress(selectedIds: readonly string[]) {
  const selected = new Set(selectedIds);
  const categories = groups.map(group => {
    const completed = courses.filter(course => course.group === group.id && selected.has(course.id));
    const earned = Math.min(group.required, completed.reduce((sum, course) => sum + course.credits, 0));
    return { ...group, earned, completed: completed.length, remaining: group.required - earned };
  });
  const required = categories.reduce((sum, group) => sum + group.required, 0);
  const earned = categories.reduce((sum, group) => sum + group.earned, 0);
  return { categories, required, earned, remaining: required - earned, percent: Math.round(earned / required * 100) };
}
