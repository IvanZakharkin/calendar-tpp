<template lang="pug">
.calendar-event
	.row
		.col-8
			.calendar-event__row
				.calendar-event__close
					button.calendar-event__close-btn
						//- +icon('signs', 'calendar-event__close-btn-icon')
						| Х
				.calendar-event__name
					input.calendar-event__input-name(placeholder="Добавьте название")
		.col-4
			button.btn.calendar-event__btn-save Сохранить
	.calendar-event__row
		.calendar-event__row-item
			input(type='text').calendar-event__field
		.calendar-event__row-item
			.dropdown
				button.btn.calendar-event__field.dropdown-toggle(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
					| 12:00
				.dropdown-menu
					button.dropdown-item(type='button') 13:00
					button.dropdown-item(type='button') 14:00
		.calendar-event__row-item -
		.calendar-event__row-item
			.dropdown
				button.btn.calendar-event__field.dropdown-toggle(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
					| 12:00
				.dropdown-menu
					button.dropdown-item(type='button') 13:00
					button.dropdown-item(type='button') 14:00
		.calendar-event__row-item
			input(type='text').calendar-event__field
	.row
		.col-8
			.calendar-event__nav
				.calendar-event__nav-item.calendar-event__nav-item_active
					.calendar-event__nav-button Сведения о мероприятии
				.calendar-event__nav-item
					.calendar-event__nav-button Найдите время
			.calendar-event__info
				.calendar-event__row.calendar-event__row_location
					.calendar-event__icon
						i.fas.fa-align-left
					input.calendar-event__field.calendar-event__input(placeholder="Укажите место проведения")
				.calendar-event__row.calendar-event__conf
					.calendar-event__icon
						i.fas.fa-align-left
					button.btn.calendar-event__field Добавить видеконференцию
				.calendar-event__row
					.calendar-event__icon
						i.fas.fa-align-left
					.calendar-event__row-item
						.dropdown
							button.btn.calendar-event__field.dropdown-toggle(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
								| Уведомление
							.dropdown-menu
								button.dropdown-item(type='button') Уведомление
								button.dropdown-item(type='button') Письмо на почту
					.calendar-event__row-item
						input(type='time').calendar-event__field
					.calendar-event__row-item
						.dropdown
							button.btn.calendar-event__field.dropdown-toggle(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
								| Мин.
							.dropdown-menu
								button.dropdown-item(type='button') Мин.
								button.dropdown-item(type='button') Ч.
								button.dropdown-item(type='button') Дн.
								button.dropdown-item(type='button') Нед.
					button.calendar-event__close-btn
						//- +icon('signs', 'calendar-event__close-btn-icon')
						| X
				.calendar-event__row
					.calendar-event__icon
						i.fas.fa-align-left
					.calendar-event__row-item
						.dropdown
							button.btn.calendar-event__field.dropdown-toggle(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
								| Занят/занята
							.dropdown-menu
								button.dropdown-item(type='button') Занят/занята
								button.dropdown-item(type='button') Свободен/свободна
					.calendar-event__row-item
						.dropdown
							button.btn.calendar-event__field.dropdown-toggle(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
								| Настройки приватности по умолчанию
							.dropdown-menu
								button.dropdown-item(type='button') Настройки приватности по умолчанию
								button.dropdown-item(type='button') Общедоступное
								button.dropdown-item(type='button') Личное
				.calendar-event__desk

		.col-4
			.calendar-event__nav
				.calendar-event__nav-item.calendar-event__nav-item_active
					.calendar-event__nav-button Гости
			.calendar-event__row
				input.calendar-event__field.calendar-event__input(placeholder="Добавьте гостей")
			.calendar-event__row
				.calendar-event__guest-options
					.calendar-event__guest-title Разрешения для гостей
					label.checkbox.checkbox_calendar-event
						input.checkbox__input(type='checkbox')
						.checkbox__title Изменить мероприятие
					label.checkbox.checkbox_calendar-event
						input.checkbox__input(type='checkbox')
						.checkbox__title приглашать других гостей
					label.checkbox.checkbox_calendar-event
						input.checkbox__input(type='checkbox')
						.checkbox__title видеть список приглашенных
			.calendar-event__row
					button.calendar-event__field Добавить мероприятия в группу
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>