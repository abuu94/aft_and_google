function greet(name: string): string;
function greet(name: string, language: string): string;

function greet(name: string, language?: string): string {
  if (!language) {
    return `Hello, ${name}!`;
  }

  if (language === "nl") {
    return `Hallo, ${name}!`;
  } else if (language === "fr") {
    return `Bonjour, ${name}!`;
  } else {
    return `Hello, ${name}!`;
  }
}

// Usage
console.log(greet("Jeroen"));
console.log(greet("Jeroen", "nl"));
console.log(greet("Jeroen", "fr"));
console.log(greet("Jeroen", "es"));