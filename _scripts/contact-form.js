$(document).ready(function initContactForm() {
  var HashLabsContactForm = {
    init: function() {
      this._contactForm();
    },

    requiredFormFields: [
      { name: 'name', feedback: $('[for="name-contact-input"] .form-control-feedback') },
      { name: 'email', feedback: $('[for="email-contact-input"] .form-control-feedback') },
      { name: 'phone', feedback: $('[for="phone-contact-input"] .form-control-feedback') },
      { name: 'typeOfJob', feedback: $('[for="type-of-job-contact-input"] .form-control-feedback') },
      { name: 'budget', feedback: $('[for="budget-contact-input"] .form-control-feedback') },
      { name: 'howDidYouHearAboutUs', feedback: $('#how-did-you-hear-radios') }
    ],

    _getFormValues: function getFormValues() {
      var values = {};

      $('#contact-form .form-control:not([type="radio"])').each(function saveFormValues() {
        values[this.name] = $(this).val();
      });

      var checkedRadio = $('#contact-form .custom-control-input[type="radio"]:checked');
      checkedRadio.each(function getRadiosValues() {
        values[this.name] = $(this).val() || '';
      });

      return values;
    },

    _validateForm: function validateForm(formValues) {
      var requiredFormFields = this.requiredFormFields;
      var isFormValid = true;

      requiredFormFields.forEach(function checkRequiredFormFields(field) {
        var isFieldValid = !!(typeof formValues[field.name] !== 'undefined' && formValues[field.name]);
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

    _contactForm: function contactForm() {
      var validateForm = this._validateForm.bind(this);
      var getFormValues = this._getFormValues.bind(this);

      $('#contact-form').submit(function contactFormSubmitHandler(event) {
        var formValues = getFormValues();
        var isFormValid = validateForm(formValues);

        if (!isFormValid) {
          // If form isn't valid, we prevent the submit event from happening
          event.preventDefault();
          return;
        }
      });

      $('#contact-form .form-control').focus(function contactFormFocusHandler(event) {
        var input = $(this);
        var id = input.attr('id');
        var label = $('label[for="' + id + '"]');

        label
          .addClass('sliding-label--active')
          .closest('.form-group')
          .addClass('form-group--slided')
          .removeClass('has-danger');
      });

      $('#contact-form .form-control').blur(function contactFormBlurHandler(event) {
        var input = $(this);
        var id = input.attr('id');
        var label = $('label[for="' + id + '"]');

        if (!input.val()) {
          label
            .removeClass('sliding-label--active')
            .closest('.form-group')
            .removeClass('form-group--slided');
        }
      });

      $('#contact-form .custom-radio input').change(function contactFormCheckedChangeHandler(event) {
        $(this)
          .closest('.form-group')
          .removeClass('has-danger');
      });
    }
  };

  HashLabsContactForm.init();
});
