import { processPDF } from "./pdfProcessor.js";

window.showMainScreen = function () {
  document.getElementById("main-screen").classList.remove("d-none");
  document.getElementById("scan-class-screen").classList.add("d-none");
  document.getElementById("train-class-screen").classList.add("d-none");
  document.getElementById("quiz-screen").classList.add("d-none");
};

window.showScanClassScreen = function () {
  document.getElementById("scan-class-screen").classList.remove("d-none");
  document.getElementById("train-class-screen").classList.add("d-none");
  document.getElementById("quiz-screen").classList.add("d-none");
};

window.showTrainClassScreen = function () {
  document.getElementById("scan-class-screen").classList.add("d-none");
  document.getElementById("train-class-screen").classList.remove("d-none");
  document.getElementById("quiz-screen").classList.add("d-none");
};

window.startQuiz = function () {
  document.getElementById("train-class-screen").classList.add("d-none");
  document.getElementById("quiz-screen").classList.remove("d-none");
  loadRandomImage();
};

window.checkAnswer = function () {
  const input = document.getElementById("quiz-input").value.trim();
  const correctName = currentImageName.split(" ")[0]; // Assuming first name is the first word
  const messageElement = document.getElementById("quiz-message");
  const correctNameElement = document.getElementById("correct-name");
  const nextButton = document.getElementById("next-button");
  const okButton = document.getElementById("ok-button");
  const scoreElement = document.getElementById("score");

  console.log(`Input: ${input}, Correct Name: ${correctName}`);

  const distance = levenshteinDistance(
    input.toLowerCase(),
    correctName.toLowerCase()
  );

  if (distance === 0) {
    messageElement.textContent = "Korrekt!";
    messageElement.className = "text-success";
    score++;
  } else if (distance === 1) {
    const highlightedName = highlightMistakes(input, correctName);
    messageElement.textContent = "Fast";
    messageElement.className = "text-warning";
    correctNameElement.innerHTML = `Correct name: ${highlightedName}`;
    score += 0.5;
  } else {
    const highlightedName = highlightMistakes(input, correctName);
    messageElement.textContent = "Falsch";
    messageElement.className = "text-danger";
    correctNameElement.innerHTML = `Correct name: ${highlightedName}`;
  }

  scoreElement.textContent = `Score: ${score}`;
  nextButton.classList.remove("d-none");
  okButton.classList.add("d-none");
};

window.handleKeyPress = function (event) {
  if (event.key === "Enter") {
    checkAnswer();
  }
};

let images = [];
let currentImageName = "";
let score = 0;

window.processPDF = async function () {
  const fileInput = document.getElementById("pdf-file");
  if (fileInput.files.length === 0) {
    alert("Please select a PDF file.");
    return;
  }
  const pdfFile = fileInput.files[0];
  await processPDF(pdfFile);
  alert("PDF processing complete. Starting the quiz now.");
  startQuiz(); // Start the quiz immediately after processing the PDF
};

window.loadRandomImage = function () {
  if (images.length === 0) {
    alert("No images available. Please scan a class first.");
    return;
  }

  const randomIndex = Math.floor(Math.random() * images.length);
  const image = images[randomIndex];
  currentImageName = image.name;

  const imageContainer = document.getElementById("quiz-image-container");
  imageContainer.innerHTML = "";
  const imgElement = document.createElement("img");
  imgElement.src = image.src;
  imgElement.alt = image.name;
  imgElement.className = "quiz-image";
  imageContainer.appendChild(imgElement);

  document.getElementById("quiz-input").value = "";
  document.getElementById("quiz-message").textContent = "";
  document.getElementById("correct-name").textContent = "";
  document.getElementById("next-button").classList.add("d-none");
  document.getElementById("ok-button").classList.remove("d-none");
};

function isCorrectAnswer(input, correctName) {
  const distance = levenshteinDistance(
    input.toLowerCase(),
    correctName.toLowerCase()
  );
  return distance <= 1;
}

function highlightMistakes(input, correctName) {
  const inputLower = input.toLowerCase();
  const correctLower = correctName.toLowerCase();
  let highlightedName = "";

  const maxLength = Math.max(inputLower.length, correctLower.length);

  for (let i = 0; i < maxLength; i++) {
    if (inputLower[i] !== correctLower[i]) {
      highlightedName += `<span class="text-danger">${
        correctName[i] || ""
      }</span>`;
    } else {
      highlightedName += correctName[i] || "";
    }
  }

  console.log(`Highlighted Name: ${highlightedName}`);
  return highlightedName;
}

function levenshteinDistance(a, b) {
  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        );
      }
    }
  }

  console.log(`Levenshtein Distance: ${matrix[b.length][a.length]}`);
  return matrix[b.length][a.length];
}

export function addImageToQuiz(imageDataUrl, fileName) {
  images.push({ src: imageDataUrl, name: fileName });
}
