const img1 = document.getElementById('img1');

// const image = document

roboflow.auth({
    publishable_key: "rf_aBKNpcw5cid4VPIxUldvfbXI2X93"
}).load({
    model: "fruit-detection-and-classification",
    version: 1 // <--- YOUR 1 NUMBER
}).then(function(model) {
    // model has loaded!

    model.detect(img1).then(function(predictions) {
        console.log("Predictions:", predictions);
    });

});



    //Camera
    let videoStream;
    let isFrontCamera = false;

    const video = document.getElementById('video');
    const captureBtn = document.getElementById('capture-btn');
    const switchCameraBtn = document.getElementById('switch-camera-btn');

    const initializeCamera = async () => {
        try {
            const facingMode = isFrontCamera ? 'user' : 'environment';
            videoStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode } });
            video.srcObject = videoStream;
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    initializeCamera();

    captureBtn.addEventListener('click', () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const photoDataUrl = canvas.toDataURL('image/png');
        const photoElement = document.createElement('img');
        photoElement.src = photoDataUrl;
        document.body.appendChild(photoElement);
    });

    switchCameraBtn.addEventListener('click', async () => {
        // Stop the current camera stream
        videoStream.getTracks().forEach(track => track.stop());
        // Toggle between front and rear cameras
        isFrontCamera = !isFrontCamera;
        // Initialize the camera with the new facing mode
        await initializeCamera();
    });