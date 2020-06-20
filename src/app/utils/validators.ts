import { FormGroup } from "@angular/forms";

export function passwordCompare(password1, password2): boolean {
  return password1 === password2;
}

export function setPassword(password) {
  return password;
}

export function scorePassword(password): number {
  let score = 0;
  if (!password) { return score; }

  // award every unique letter until 5 repetitions
  const letters = new Object();
  for (let i = 0; i < password.length; i++) {
    letters[password[i]] = (letters[password[i]] || 0) + 1;
    score += 5.0 / letters[password[i]];
  }

  // bonus points for mixing it up
  const variations = {
    digits: /\d/.test(password),
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    nonWords: /\W/.test(password),
  };

  let variationCount = 0;

  for (const check in variations) {
    if (check !== undefined) {
      variationCount += variations[check] === true ? 1 : 0;
    }
  }
  score += (variationCount - 1) * 10;

  return score;
}


export function checkPasswords(group: FormGroup) {
  const pass = group.get('password').value;
  const confirmPass = group.get('c_password').value;

  return pass === confirmPass ? null : { unmatch: true };
}
