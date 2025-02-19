# React Native Student App

This project is a React Native application designed to help users manage and train students' names from PDF documents containing their portraits. The app allows users to load PDFs, extract student images, and engage in training exercises to learn and memorize student names.

## Features

- Load PDFs containing student portraits and names.
- Extract images of students and save them with corresponding names.
- Two training modes:
  - **Mode 1**: Multiple choice quiz where users select the correct name from a list.
  - **Mode 2**: Name entry quiz where users type the name, allowing for minor typos.

## Project Structure

```
react-native-student-app
├── src
│   ├── components
│   │   ├── MainScreen.tsx
│   │   ├── TrainClassScreen.tsx
│   │   ├── ScanClassScreen.tsx
│   │   └── StudentQuiz.tsx
│   ├── utils
│   │   ├── pdfProcessor.ts
│   │   ├── imageSaver.ts
│   │   └── nameValidator.ts
│   ├── assets
│   │   └── images
│   └── App.tsx
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/react-native-student-app.git
   ```

2. Navigate to the project directory:
   ```
   cd react-native-student-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Start the application:
   ```
   npm start
   ```

2. Use the main screen to either train a class that has already been scanned or scan a new class by loading a different PDF.

3. Follow the prompts to engage in training exercises.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.