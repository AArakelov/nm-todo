import {AbstractControl, ValidationErrors} from '@angular/forms';

export function expirationTimeValidator(form: AbstractControl): ValidationErrors | null {
  const dateControl = form.get('expirationDate');
  const timeControl = form.get('expirationTime');

  if (!dateControl || !timeControl) {
    return null;
  }

  const date = new Date(dateControl.value);
  const time = timeControl.value;

  if (!date || !time || isNaN(date.getTime())) {
    return null;
  }

  // Разбор строки времени, например: "13:45" или "03:15 PM"
  const timeParts = time.match(/^(\d{1,2}):(\d{2})(?:\s?(AM|PM))?$/i);
  if (!timeParts) {
    return {invalidTime: true};
  }

  let hours = parseInt(timeParts[1], 10);
  const minutes = parseInt(timeParts[2], 10);
  const period = timeParts[3];

  if (period) {
    const isPM = period.toUpperCase() === 'PM';
    if (isPM && hours < 12) {
      hours += 12;
    }
    if (!isPM && hours === 12) {
      hours = 0;
    }
  }

  date.setHours(hours, minutes, 0, 0);

  const now = new Date();
  if (date.getTime() < now.getTime()) {
    return {timeInPast: true};
  }

  return null;
}
