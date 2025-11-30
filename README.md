# 🖼️ ImageZip - Simple Image Compressor

A single-purpose web application that solves one problem elegantly: **compressing images instantly in your browser**.

## ✨ Features

- **Lossy Compression**: Reduce file size significantly with adjustable quality (10-100%)
- **Lossless Compression**: Maintain original quality while optimizing file size
- **100% Private**: All processing happens in your browser - images never leave your device
- **Instant Results**: See before/after comparison with file size savings
- **Drag & Drop**: Easy file upload with drag-and-drop support
- **Responsive Design**: Works perfectly on desktop and mobile devices

## 🚀 Live Demo

Simply open `index.html` in any modern web browser. No installation or build process required!

## 🛠️ Technologies Used

- **HTML5 Canvas API**: For image processing and compression
- **Vanilla JavaScript**: No frameworks, pure JS for maximum performance
- **CSS3**: Modern, responsive design with gradients and animations
- **FileReader API**: Client-side file handling

## 📖 How It Works

1. **Upload**: Drag and drop or click to select an image (JPG, PNG, WebP)
2. **Choose**: Select lossy (smaller size) or lossless (original quality) compression
3. **Adjust**: For lossy compression, adjust quality slider (10-100%)
4. **Compress**: Click "Compress Image" to process
5. **Download**: Compare results and download your compressed image

## 🎯 Use Cases

- Reduce image file sizes for faster website loading
- Compress images before uploading to social media
- Optimize photos for email attachments
- Prepare images for mobile apps
- Save storage space on your device

## 🔒 Privacy

All image processing happens entirely in your browser using the HTML5 Canvas API. Your images are never uploaded to any server, ensuring complete privacy and security.

## 📱 Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## 🏗️ Project Structure

```
imagezip/
├── index.html      # Main HTML structure
├── styles.css      # Styling and responsive design
├── script.js       # Image compression logic
└── README.md       # Documentation
```

## 💡 Technical Details

### Lossy Compression
- Uses JPEG format with adjustable quality
- Quality range: 10% (maximum compression) to 100% (minimal compression)
- Best for photographs and images with many colors

### Lossless Compression
- Uses PNG format with maximum quality
- Preserves original image quality
- Best for graphics, logos, and images with transparency

## 🎓 Built With Kiro AI

This project was developed as part of the "AI for Bharat" Week 1 Micro-Tools challenge, demonstrating how AI-assisted development can accelerate the creation of practical web applications.

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Made with ❤️ for AI for Bharat Challenge**
