# ESC/POS Printer Emulator �

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A modern web-based thermal receipt printer emulator that lets you test ESC/POS commands without physical hardware.

[View Demo](your-demo-link) · [Report Bug](issues-link) · [Request Feature](issues-link)

![ESC/POS Emulator Preview](preview.png)

</div>

## ✨ What is This?

The ESC/POS Printer Emulator is a development tool that simulates thermal receipt printers right in your browser. Perfect for:

- 🧪 Testing receipt layouts without wasting paper
- 🎓 Learning ESC/POS commands interactively
- 🖥️ Developing POS applications
- 📱 Testing receipt designs across different paper sizes

## 🚀 Features

- **Real-time Preview**: See your receipt updates instantly as you type commands
- **Multiple Paper Sizes**: Support for 58mm, 80mm, and 112mm paper widths
- **Rich Text Formatting**:
  - Bold, underline, and strike-through text
  - Multiple font sizes
  - Text alignment (left, center, right)
  - Vertical text rotation
- **Special Elements**:
  - QR Code generation
  - Paper cut simulation
  - Print sound effects
- **Developer Friendly**:
  - Command logging
  - Error reporting
  - Copy-paste support

## 🛠️ Quick Start

```bash
# Clone the repository
git clone https://github.com/Redbird-Corporation/ecspos-emulator.git

# Navigate to project directory
cd ecspos-emulator

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser to start using the emulator!

## 📝 Example Usage

```
ESC @
ESC ! 00
ESC a 01
The Cozy Corner Cafe
LF
123 Main Street, Anytown
LF
Tel: (555) 123-4567
```

## 🤝 Contributing

We welcome contributions of all sizes! Here's how you can help:

### 1. Fork & Create a Branch

```bash
# Fork via GitHub and then clone your fork
git clone git@github.com:your-username/ecspos-emulator.git

# Create a branch for your feature
git checkout -b feature/amazing-feature
```

### 2. Make Your Changes

- Follow the existing code style
- Add comments for complex logic
- Update documentation if needed
- Add tests for new features

### 3. Submit a Pull Request

1. Commit your changes
2. Push to your fork
3. Open a Pull Request with a clear description

## 💻 Available Commands

| Command | Format | Description |
|---------|---------|-------------|
| ESC @ | `ESC @` | Initialize printer |
| ESC ! | `ESC ! n` | Select print mode(s) |
| ESC E | `ESC E n` | Toggle bold mode |
| ESC a | `ESC a n` | Select justification |
| ESC - | `ESC - n` | Turn underline mode on/off |
| GS V | `GS V` | Paper cut |
| GS ( k | `GS ( k` | Generate QR Code |
| LF | `LF` | Line feed |

## 🎯 Roadmap

- [ ] Support for more ESC/POS commands
- [ ] Save and load receipt templates
- [ ] Export to PDF functionality
- [ ] Custom paper size support
- [ ] Barcode generation
- [ ] Network printer simulation

## 🧰 Built With

- [React](https://reactjs.org/) - UI Framework
- [TypeScript](https://www.typescriptlang.org/) - Language
- [Vite](https://vitejs.dev/) - Build Tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- ESC/POS Command Specifications
- React Community
- All our contributors

## 🤔 Support

Having trouble? 

1. Check out our [Issues](https://github.com/Redbird-Corporation/ecspos-emulator/issues) page
2. Read the [Documentation](docs/README.md)
3. Create a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior

---

<div align="center">
Made with ❤️ for the developer community
</div>�
