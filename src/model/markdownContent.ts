export const markdownContent = `# Markdown syntax guide

## Headers

# This is a Heading h1
## This is a Heading h2
###### This is a Heading h6

## Emphasis

*This text will be italic*
_This will also be italic_

**This text will be bold**  
__This will also be bold__

_You **can** combine them_

## Lists

### Unordered

* Item 1
* Item 2
* Item 2a
* Item 2b
    * Item 3a
    * Item 3b

### Ordered

1. Item 1
2. Item 2
3. Item 3
    1. Item 3a
    2. Item 3b

## Images

![This is an alt text.](/public/vite.svg "This is a sample image.")

## Links

You may be using [Markdown Live Preview](https://markdownlivepreview.com/).

## Blockquotes

> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.
>
>> Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.

## Tables

| Left columns  | Right columns |
| ------------- |:-------------:|
| left foo      | right foo     |
| left bar      | right bar     |
| left baz      | right baz     |

## Blocks of code

\`\`\`js
let message = 'Hello world';
alert(message);
\`\`\`

\`\`\`sql
SELECT * FROM users;
SELECT * FROM users WHERE age > 18;
SELECT * FROM users WHERE age > 18;
\`\`\`

\`\`\`python
def greet(name):
    return f"Hello, {name}!"
\`\`\`

  \`\`\`typescript
  interface User {
    id: number;
    name: string;
    email: string;
  }
  
  const users: User[] = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" }
  ];
  
  function findUser(id: number): User | undefined {
    return users.find(user => user.id === id);
  }
  
  const user = findUser(1);
  console.log(user?.name);
  \`\`\`

的事发生的故事
## Inline code

This web site is using \`markedjs/marked\`.
`;
