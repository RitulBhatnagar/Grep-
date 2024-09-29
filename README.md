# TypeScript Grep Implementation

This project is a TypeScript implementation of the `grep` command-line utility. It provides functionality to search for patterns in text using regular expressions.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Features

- Basic pattern matching
- Support for regular expressions
- Matches whole lines or parts of lines
- Command-line interface similar to the standard `grep` utility

## Prerequisites

- Node.js (version 12 or higher)
- npm (usually comes with Node.js)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/typescript-grep.git
   ```

2. Navigate to the project directory:

   ```
   cd typescript-grep
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Build the project:
   ```
   npm run build
   ```

## Usage

The basic syntax for using this grep implementation is:

```
./your_program.sh [OPTIONS] PATTERN [FILE...]
```

If no FILE is given, it reads from standard input.

### Options

- `-E`: Use extended regular expressions
- (Add other options as implemented in your program)

## Examples

1. Search for a simple pattern in a file:

   ```
   ./your_program.sh "pattern" file.txt
   ```

2. Use a regular expression with the -E option:

   ```
   ./your_program.sh -E "^(\w+) starts and ends with \1$" file.txt
   ```

3. Read from standard input:
   ```
   echo "this starts and ends with this" | ./your_program.sh -E "^(\w+) starts and ends with \1$"
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
