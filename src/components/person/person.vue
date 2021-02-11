<template>
  <div class="person-block" ref="person">
    <div class="person-block__avatar">
      <img :src="person.avatar" alt="" class="person-block__avatar-img" v-if="person.avatar">
      <div class="person-block__initials">{{ initials }}</div>
    </div>
  </div>
</template>

<script>

import { mapMutations, mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  props: {
    person: {
      type: Object,
      default() {
        return {
          label: '',
          avatar: '',
          work_position: '',
          work_company: '',
          work_phone: '',
          email: ''
        };
      }
    }
  },
  watch: {},
  methods: {
    getContentPopover() {
      let content = `
        <div class="person-block-popovers">
          <div class="person-block-popovers__name">${this.person.label}</div>
          <ul class="person-block-popovers__info-list">`;

      if (this.person.work_position) {
        content += `<li>Должность: ${this.person.work_position}</li>`
      }
      if (this.person.work_company) {
        content += `<li>Организация: ${this.person.work_company}</li>`
      }
      if (this.person.work_phone) {
        content += `<li>Телефон: ${this.person.work_phone}</li>`
      }
      if (this.person.email) {
        content += `<li>Email: ${this.person.email}</li>`
      }

      content += '</ul></div>'

      return content;
    }
  },
  computed: {
    ...mapState({}),
    ...mapGetters([]),
    initials() {
      const [name, lastName] = this.person.label.trim().split(' ');

      return `${name[0]}.${lastName[0]}.`;
    }
  },
  components: {},
  mounted() {
    $(this.$refs.person).popover({
      content: this.getContentPopover(),
      html: true,
      placement: 'top'
    });

    $(document).mouseup((e) => {
        if (!$(this.$refs.person).is(e.target) && $(this.$refs.person).has(e.target).length === 0) {
            $(this.$refs.person).popover('hide');
        }
    });
  }
};
</script>

<style lang="scss">
.person-block {
  width: 100%;
  height: 100%;
  position: relative;

  &__avatar {
    width: 100%;
    height: 100%; 
    overflow: hidden;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover
  }
}

.person-block-popovers {
  min-width: 200px;
  // text-align: center;
  &__name {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 7px;
    text-align: left;
    
  }
}
</style>>