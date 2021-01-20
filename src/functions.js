function roundingMinutes(minutes) {
  if (minutes >= 0 && minutes < 7.5) {
    return (minutes = 0);
  }
  if (minutes >= 7.5 && minutes < 22.5) {
    return (minutes = 15);
  }
  if (minutes >= 22.5 && minutes < 37.5) {
    return (minutes = 30);
  }
  if (minutes >= 37.5 && minutes < 52.5) {
    return (minutes = 45);
  }
  if (minutes >= 52.5) {
    return (minutes = 60);
  }
}

export { roundingMinutes }