const args = process.argv.slice(2);

// Überprüfe, ob ein Name angegeben wurde
if (args.length === 0) {
    console.log('Bitte gib deinen Namen als Argument an!');
    console.log('Beispiel: node greeter.js Max');
    process.exit(1);
}

const name = args[0];
const now = new Date();
const time = now.toLocaleTimeString();
const date = now.toLocaleDateString();

// Hole den Begrüßungsstil aus der Umgebungsvariable oder verwende Standard
const greetingStyle = process.env.GREETING_STYLE || 'normal';

// Wähle die Begrüßung basierend auf dem Stil
let greeting;
switch (greetingStyle) {
    case 'formal':
        greeting = `Sehr geehrte(r) ${name}`;
        break;
    case 'casual':
        greeting = `Hey ${name}!`;
        break;
    default:
        greeting = `Hallo ${name}`;
}

// Gib die Begrüßung und Zeitinformationen aus
console.log(greeting);
console.log(`Heute ist der ${date}`);
console.log(`Die aktuelle Uhrzeit ist ${time}`);