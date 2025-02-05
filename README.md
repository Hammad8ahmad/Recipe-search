# Recipe Search

A responsive React-based web application to display a collection of recipes. Each recipe is showcased with a rounded image, title, ingredients list, and additional details. The app includes features to handle cases where no videos are available.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Demo

You can check out a live demo of the project [here](https://recipe-search-io.netlify.app/).NOTE : If you cannot see the live version it is probably because my render free tier expired but you can see the live version below and how it worked.
![recipe-search](https://github.com/user-attachments/assets/1fd00050-1ae3-400c-a51a-64dae24000a6)

## Example:

![recipe](https://github.com/user-attachments/assets/4a68e74d-1e82-4de4-a301-d275b79fa26d)

## Features

- Responsive design for various screen sizes (desktop, tablet, mobile).
- Rounded recipe images for a visually appealing gallery.
- Flexbox layout for a well-organized and centered content display.
- "No videos" message with a distinctive style to inform users when content is unavailable.
- Styled loader for indicating ongoing data fetching processes.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/recipe-gallery.git
   ```

2. Navigate to the project directory:

   ```bash
   cd recipe-gallery
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

Your application should now be running on `http://localhost:3000`.

## Usage

- The application will display a gallery of recipes with rounded images.
- If no videos are available, a message with a styled background will appear.
- The app is fully responsive and will adjust the layout and size of elements based on the screen size.

## Project Structure

- **Fetching**: Contains all the data fetching files for the recipes and youtube api.
- **Interface**: Contains the interface file and the related Css file for it.
- **Recipes**: Contains all the information about the individual recipes.
- **App.js**: Main component that renders the application.
- **index.js**: Entry point of the application.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

Please ensure your code adheres to the project's coding standards and includes appropriate documentation.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
