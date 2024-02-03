function handleDrop(event) {
    event.preventDefault();
    event.target.classList.remove('hover');
    
    const files = event.dataTransfer.files;
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        
        reader.onload = function() {
          const img = new Image();
          img.src = reader.result;
          document.body.appendChild(img);
        };
        
        reader.readAsDataURL(file);
      }
    }
  }