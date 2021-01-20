<template lang="pug">
    .card.participant-card(
        :class="{'participant-card_active':active}"
    )
        .card-body.participant-card__body
            //- .participant-card__container
            button.btn.participant-card__btn-delete(
                type="button"
                @click="deleteParticipant()"
            )
                i.fas.fa-times
            .participant-card__left
                .participant-card__name {{participant.label}}
                .participant-card__desc(v-if="participant.work_position") {{participant.work_position}}
                .participant-card__contact(v-if="participant.work_company")
                    a.participant-card__contact-link(href="") {{participant.work_company}}
                    a.participant-card__contact-title(href="") ТПП
                .participant-card__contact(v-if="participant.work_phone")
                    a.participant-card__contact-link(href="") {{participant.work_phone}}
                    a.participant-card__contact-title(href="") Телефон
                .participant-card__contact(v-if="participant.email")
                    a.participant-card__contact-link(href="") {{participant.email}}
                    a.participant-card__contact-title(href="") Email
                .participant-card__roles
                    ul.tags
                        li.tags__item(
                        v-for="selectedRole in selectedRoles"
                        )
                            .tags__link(href='#') {{selectedRole.name}}
                            button.btn.tags__delete(
                                type="button"
                                @click="deleteRole(selectedRole)"
                            )
                                i.fas.fa-times
                        li.dropdown.tags__dropdown-add
                            button.btn(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
                                | + Добавить роль
                            .dropdown-menu
                                button.dropdown-item(
                                    type='button'
                                    v-for="role in rolesForSelect"
                                    @click="addRole(role)"
                                ) {{role.name}}
            .participant-card__right
                .participant-card__avatar
                    img.img.participant-card__avatar-img(
                        :src="participant.avatar"
                        v-if="participant.avatar"
                    )
                button.btn.participant-card__btn-detail(
                    @click="active = active ? false : true"
                )
                    i.fas.fa-chevron-down
</template>

<script>
import { mapMutations, mapState, mapGetters, mapActions } from "vuex";


export default {
  data() {
    return {
    };
  },
  props: {
      participant: {
          type: Object,
          default: {}
      },
      active: false
  },

  methods: {
    selectRole(event, role, participant) {
        console.log(event, role, participant)
    },
    addRole(role) {
        this.$emit("addRole", role)
    },
    deleteRole(role) {
        this.$emit("deleteRole", role)
    },
    deleteParticipant() {
        this.$emit("deleteParticipant", this.participant)
    },
  },
  computed: {
      ...mapState({
      roles: state => state.calendar.roles,
    }),
    selectedRoles() {
        return this.roles.filter(el => this.participant.roles.includes(el.id))
    },
    rolesForSelect() {
        return this.roles.filter(el => !this.participant.roles.includes(el.id))
    },
    // test() {
    //     return this.participant.code == 1;
    // }
  },

  components: {
  },
  mounted() {
  }
};
</script>

<style lang="scss">
</style>