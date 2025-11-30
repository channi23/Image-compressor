let originalFile = null;
let compressedBlob = null;

const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const controls = document.getElementById('controls');
const results = document.getElementById('results');
const qualityControl = document.getElementById('qualityControl');
const qualitySlider = document.getElementById('quality');
const qualityValue = document.getElementById('qualityValue');
const compressBtn = document.getElementById('compressBtn');
const downloadBtn = document.getElementById('downloadBtn');
const resetBtn = document.getElementById('resetBtn');

// File selection handlers
dropZone.addEventListener('click', () => fileInput.click());

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        handleFileSelect(file);
    }
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        handleFileSelect(file);
    }
});

function handleFileSelect(file) {
    originalFile = file;
    controls.style.display = 'block';
    results.style.display = 'none';
    
    // Show original preview
    const reader = new FileReader();
    reader.onload = (e) => {
        document.getElementById('originalPreview').src = e.target.result;
        document.getElementById('originalSize').textContent = formatFileSize(file.size);
    };
    reader.readAsDataURL(file);
}

// Compression type toggle
document.querySelectorAll('input[name="compressionType"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        if (e.target.value === 'lossy') {
            qualityControl.style.display = 'block';
        } else {
            qualityControl.style.display = 'none';
        }
    });
});

// Quality slider
qualitySlider.addEventListener('input', (e) => {
    qualityValue.textContent = e.target.value;
});

// Compress button
compressBtn.addEventListener('click', compressImage);

async function compressImage() {
    if (!originalFile) return;
    
    compressBtn.disabled = true;
    compressBtn.textContent = 'Compressing...';
    
    const compressionType = document.querySelector('input[name="compressionType"]:checked').value;
    const quality = qualitySlider.value / 100;
    
    try {
        const img = await loadImage(originalFile);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        let mimeType, compressionQuality;
        
        if (compressionType === 'lossy') {
            // Lossy compression using JPEG
            mimeType = 'image/jpeg';
            compressionQuality = quality;
        } else {
            // Lossless compression using PNG
            mimeType = 'image/png';
            compressionQuality = 1;
        }
        
        canvas.toBlob((blob) => {
            compressedBlob = blob;
            displayResults(blob);
            compressBtn.disabled = false;
            compressBtn.textContent = 'Compress Image';
        }, mimeType, compressionQuality);
        
    } catch (error) {
        console.error('Compression error:', error);
        alert('Error compressing image. Please try again.');
        compressBtn.disabled = false;
        compressBtn.textContent = 'Compress Image';
    }
}

function loadImage(file) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();
        
        reader.onload = (e) => {
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function displayResults(blob) {
    results.style.display = 'block';
    
    // Show compressed preview
    const url = URL.createObjectURL(blob);
    document.getElementById('compressedPreview').src = url;
    document.getElementById('compressedSize').textContent = formatFileSize(blob.size);
    
    // Calculate savings
    const savings = ((originalFile.size - blob.size) / originalFile.size * 100).toFixed(1);
    const savingsElement = document.getElementById('savings');
    
    if (savings > 0) {
        savingsElement.textContent = `Saved ${savings}%`;
        savingsElement.style.color = '#10b981';
    } else {
        savingsElement.textContent = `${Math.abs(savings)}% larger`;
        savingsElement.style.color = '#ef4444';
    }
    
    // Scroll to results
    results.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Download button
downloadBtn.addEventListener('click', () => {
    if (!compressedBlob) return;
    
    const compressionType = document.querySelector('input[name="compressionType"]:checked').value;
    const extension = compressionType === 'lossy' ? 'jpg' : 'png';
    const originalName = originalFile.name.replace(/\.[^/.]+$/, '');
    const filename = `${originalName}_compressed.${extension}`;
    
    const url = URL.createObjectURL(compressedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// Reset button
resetBtn.addEventListener('click', () => {
    originalFile = null;
    compressedBlob = null;
    fileInput.value = '';
    controls.style.display = 'none';
    results.style.display = 'none';
    document.querySelector('input[name="compressionType"][value="lossy"]').checked = true;
    qualityControl.style.display = 'block';
    qualitySlider.value = 80;
    qualityValue.textContent = '80';
});

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
