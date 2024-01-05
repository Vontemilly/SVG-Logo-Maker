
const fs = require('fs');
const inquirer = require('inquirer');

class Shape {
  constructor(color, text) {
    this.color = color;
    this.text = text;
  }

  renderText() {
    return `<text x="150" y="150" font-size="60" text-anchor="middle" fill="${this.text.color}">${this.text.content}</text>`;
  }

  render() {
    throw new Error('Method not implemented');
  }
}

class Triangle extends Shape {
  render() {
    const points = "150,18 244,182 56,182";
    return `<polygon points="${points}" fill="${this.color}" />${super.renderText()}`;
  }
}

class Square extends Shape {
  render() {
    const width = 200;
    const height = 200;
    return `<rect width="${width}" height="${height}" fill="${this.color}" />${super.renderText()}`;
  }
}

class Circle extends Shape {
  render() {
    const cx = 150;
    const cy = 100;
    const r = 80;
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${this.color}" />${super.renderText()}`;
  }
}

function saveSVGToFile(filename, svgContent) {
  fs.writeFileSync(filename, svgContent);
}

async function getUserInput() {
  const userInput = await inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters for the text:',
      validate: (input) => input.length <= 3 || 'Please enter up to three characters.',
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter the text color (keyword or hexadecimal):',
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape:',
      choices: ['circle', 'triangle', 'square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter the shape color (keyword or hexadecimal):',
    },
  ]);

  return userInput;
}


async function main() {
  try {
    const userInput = await getUserInput();

    let shape;
    switch (userInput.shape) {
      case 'circle':
        shape = new Circle(userInput.shapeColor, { color: userInput.textColor, content: userInput.text });
        break;
      case 'triangle':
        shape = new Triangle(userInput.shapeColor, { color: userInput.textColor, content: userInput.text });
        break;
      case 'square':
        shape = new Square(userInput.shapeColor, { color: userInput.textColor, content: userInput.text });
        break;
      default:
        throw new Error('Invalid shape');
    }

 
    const svgContent = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">${shape.render()}</svg>`;
    const filename = 'logo.svg';

    saveSVGToFile(filename, svgContent);
    console.log(`Generated ${filename}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

main();
