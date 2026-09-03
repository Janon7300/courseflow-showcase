export type DemoCourse = {
  id: string;
  title: string;
  group: "foundation" | "studio" | "exploration";
  credits: number;
};

// Independently invented examples. These are not records of any institution.
export const groups = [
  { id: "foundation", title: "พื้นฐานการคิด", required: 9 },
  { id: "studio", title: "สตูดิโอออกแบบ", required: 18 },
  { id: "exploration", title: "พื้นที่ทดลอง", required: 9 },
] as const;

export const courses: readonly DemoCourse[] = [
  { id: "DEMO-F01", title: "Idea Sketchbook", group: "foundation", credits: 3 },
  { id: "DEMO-F02", title: "Everyday Observation", group: "foundation", credits: 3 },
  { id: "DEMO-F03", title: "Collaborative Making", group: "foundation", credits: 3 },
  { id: "DEMO-S01", title: "Paper Interface Lab", group: "studio", credits: 3 },
  { id: "DEMO-S02", title: "Playful Systems", group: "studio", credits: 3 },
  { id: "DEMO-S03", title: "Inclusive Objects", group: "studio", credits: 3 },
  { id: "DEMO-S04", title: "Service Storyboards", group: "studio", credits: 3 },
  { id: "DEMO-S05", title: "Prototype Critique", group: "studio", credits: 3 },
  { id: "DEMO-S06", title: "Final Studio", group: "studio", credits: 3 },
  { id: "DEMO-E01", title: "Colour Experiments", group: "exploration", credits: 3 },
  { id: "DEMO-E02", title: "Sound Notebooks", group: "exploration", credits: 3 },
  { id: "DEMO-E03", title: "Unexpected Materials", group: "exploration", credits: 3 },
];
export const sampleSelection = courses.slice(0, 7).map(course => course.id);
