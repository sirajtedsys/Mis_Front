// Default settings
// Flatpickr.setDefaults({});
// or:
// Flatpickr.defaultConfig = {};

flatpickr('#startDate', {
  enableTime: true,
  allowInput: true,
  dateFormat: "m/d/Y h:iK",
  "plugins": [new rangePlugin({ input: "#endDate"})]
});