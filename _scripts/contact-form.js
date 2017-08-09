$(document).ready(function initContactForm() {
  const HashLabsContactForm = {
    init() {
      this.contactForm();
    },

    requiredFormFields: [
      { name: 'name', feedback: $('[for="name-contact-input"] .form-control-feedback') },
      { name: 'email', feedback: $('[for="email-contact-input"] .form-control-feedback') },
      { name: 'phone', feedback: $('[for="phone-contact-input"] .form-control-feedback') },
      { name: 'typeOfJob', feedback: $('[for="type-of-job-contact-input"] .form-control-feedback') },
      { name: 'budget', feedback: $('[for="budget-contact-input"] .form-control-feedback') },
      { name: 'howDidYouHearAboutUs', feedback: $('#how-did-you-hear-radios') }
    ],

    getFormValues() {
      const values = {};

      $('#contact-form .form-control:not([type="radio"])').each(function saveFormValues() {
        values[this.name] = $(this).val();
      });

      const checkedRadio = $('#contact-form .custom-control-input[type="radio"]:checked');
      checkedRadio.each(function getRadiosValues() {
        values[this.name] = $(this).val() || '';
      });

      return values;
    },

    validateForm(formValues) {
      const requiredFormFields = this.requiredFormFields;
      let isFormValid = true;

      requiredFormFields.forEach(function checkRequiredFormFields(field) {
        const isFieldValid = !!(typeof formValues[field.name] !== 'undefined' && formValues[field.name]);
        isFormValid = isFormValid && isFieldValid;

        if (!isFieldValid) {
          field.feedback
            .closest('.form-group')
            .addClass('has-danger');
        } else {
          field.feedback.addClass('form-control-feedback--active');
        }
      });

      return isFormValid;
    },

    contactForm() {
      const validateForm = this.validateForm.bind(this);
      const getFormValues = this.getFormValues.bind(this);

      $('#contact-form').submit(function contactFormSubmitHandler(event) {
        const formValues = getFormValues();
        const isFormValid = validateForm(formValues);

        if (!isFormValid) {
          // If form isn't valid, we prevent the submit event from happening
          event.preventDefault();
          return;
        }
      });

      $('#contact-form .form-control').focus(function contactFormFocusHandler(event) {
        const input = $(this);
        const id = input.attr('id');
        const label = $('label[for="' + id + '"]');

        label
          .addClass('sliding-label--active')
          .closest('.form-group')
          .removeClass('has-danger');
      });

      $('#contact-form .form-control').blur(function contactFormBlurHandler(event) {
        const input = $(this);
        const id = input.attr('id');
        const label = $('label[for="' + id + '"]');

        if (!input.val()) {
          label
            .removeClass('sliding-label--active');
        }
      });

      $('#contact-form .custom-radio input').change(function contactFormCheckedChangeHandler(event) {
        $(this)
          .closest('.form-group')
          .removeClass('has-danger');
      });

      $('#contact-form .form-control:not([type="radio"])').each(function checkValidInputs() {
        const input = $(this);
        const inputValue = input.val();
        const id = input.attr('id');
        const label = $('label[for="' + id + '"]');

        if (inputValue) {
          label.addClass('sliding-label--active');
        }
      });
    }
  };

  HashLabsContactForm.init();
});
