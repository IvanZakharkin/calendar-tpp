<template lang="pug">
  ul.lcalendar__days-week
    each daysItem in ['пн', 'вт','ср','чт','пт','сб','вс']
      li.lcalendar__day-week=daysItem
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
