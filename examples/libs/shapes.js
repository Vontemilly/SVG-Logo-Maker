
class Shape {
  constructor(color, text) {
    this.color = color;
    this.text = text;
  }

  render() {
    return `<text x="150" y="150" font-size="60" text-anchor="middle" fill="${this.text.color}">${this.text.content}</text>`;
  }

  render() {
    throw new Error('Method not implemented');
  }
}

class Triangle extends Shape {
  render() {
    const points = "150,18 244,182 56,182";
    return `${this.renderText()}<polygon points="${points}" fill="${this.color}" />`;
  }
}

class Square extends Shape {
  render() {
    const width = 200;
    const height = 200;
    return `${this.renderText()}<rect width="${width}" height="${height}" fill="${this.color}" />`;
  }
}

class Circle extends Shape {
  render() {
    const cx = 150;
    const cy = 100;
    const r = 80;
    return `${this.renderText()}<circle cx="${cx}" cy="${cy}" r="${r}" fill="${this.color}" />`;
  }
}

module.exports = { Triangle, Square, Circle };
