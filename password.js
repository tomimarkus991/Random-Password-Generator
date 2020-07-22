const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboard = document.getElementById("clipboard");

generateEl.addEventListener("click", () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

const getRandomSymbol = () => {
  const symbols = "?!@#$%^&*(){}[]=<>/_-+|~";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

// 48 - 57 Numbers 0 1 2 3 4 5 6 7 8 9
const getRandomNumber = () =>
  String.fromCharCode(Math.floor(Math.random() * 10 + 48));

// 97 - 122 LowerCase Letter a b c d e f g h i j k l m n o p q r s t u v w x y z
const getRandomLowercaseLetter = () =>
  String.fromCharCode(Math.floor(Math.random() * 26 + 97));

// 65 - 90 UpperCase letter A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
const getRandomUppercaseLetter = () =>
  String.fromCharCode(Math.floor(Math.random() * 26 + 65));

const randomFunction = {
  lower: getRandomLowercaseLetter,
  upper: getRandomUppercaseLetter,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

const generatePassword = (lower, upper, number, symbol, length) => {
  let generatedPassword = "";

  const typesCount = lower + upper + number + symbol;

  const typesArray = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return "";
  }

  for (let i = 0; i <= length; i += typesCount) {
    typesArray.forEach((type) => {
      const funcName = Object.keys(type)[0];

      generatedPassword += randomFunction[funcName]();
    });
  }
  return generatedPassword.slice(0, length);
};

clipboard.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultEl.innerText;
  if (!password) {
    return;
  }

  textarea.value = password;

  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard");
});
