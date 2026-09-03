try {
  const savedTheme = localStorage.getItem("courseflow-demo-theme");
  document.documentElement.dataset.theme = savedTheme === "dark" ? "dark" : "light";
} catch (_) {
  document.documentElement.dataset.theme = "light";
}
