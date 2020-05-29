export function passwordCompare(password1, password2): boolean {
  return password1 === password2;
}

export function setPassword(password) {
  return password;
}

export function scorePassword(password): number {
  var score = 0;
  if (!password) return score;

  // award every unique letter until 5 repetitions
  var letters = new Object();
  for (var i = 0; i < password.length; i++) {
    letters[password[i]] = (letters[password[i]] || 0) + 1;
    score += 5.0 / letters[password[i]];
  }

  // bonus points for mixing it up
  var variations = {
    digits: /\d/.test(password),
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    nonWords: /\W/.test(password),
  };

  let variationCount = 0;
  for (var check in variations) {
    variationCount += variations[check] == true ? 1 : 0;
  }
  score += (variationCount - 1) * 10;

  return score;
}
