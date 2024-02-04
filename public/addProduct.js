    const img1 = document.getElementById('video');
    // const img1 = document.getElementById('img1');

    // const image = document



    function getPredictionByRoboflow(photoDataUrl, photoElement){

        roboflow.auth({
            publishable_key: "rf_McNp9kTLjPcQvkUPbQkTR3AmBU72"
        }).load({
            model: "fruit-detection-and-classification",
            version: 1 // <--- YOUR 1 NUMBER
        }).then(function(model) {
            // model has loaded!


        
            model.detect(photoElement).then(function(predictions) {


                // addend the fruit name 
                var productName = document.getElementById("productName");
                var productDescription = document.getElementById("productDescription");
                var productImage = document.getElementById("productImage");

                productImage.value = photoDataUrl;


                console.log(predictions);
                console.log(photoDataUrl);

                if (predictions.length === 0) {
                    console.log("null");


                  } else {
                    
                    console.log(predictions[0]["class"]);

                    const result = predictions[0]["class"];
                    // set the 
                    productName.value = predictions[0]["class"];


                    if(result === "apple"){
                        productDescription.value = "Kashmir Apples, blush red and smooth skinned apples Apples are a good source of vitamin C."
                    }else if(result === "orange"){
                        productDescription.value = "Oranges contain vitamin C and antioxidants, which help build the body's immunity and fight cancer."
                    }else if("banana"){
                        productDescription.value = "Rich in nutrients, May improve blood sugar levels, May support digestive health"
                    }else{
                        productDescription.value = "Promote digestive and cardiometabolic health, reduce inflammation, and reduce your risk for diabetes. "
                    }

                    // var cameraModal = document.getElementById("cameraModal");
                    // cameraModal.style.display = "none";
                    
                    // var closeButtonModal = document.getElementById("closeButtonModal");
                    // closeButtonModal.click();

                  }
            });

        });
    }



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

        getPredictionByRoboflow(photoDataUrl, photoElement);

        photoElement.src = photoDataUrl;
        // document.body.appendChild(photoElement);
    });

    function closeModal(){
            
    }

    switchCameraBtn.addEventListener('click', async () => {
        // Stop the current camera stream
        videoStream.getTracks().forEach(track => track.stop());
        // Toggle between front and rear cameras
        isFrontCamera = !isFrontCamera;
        // Initialize the camera with the new facing mode
        await initializeCamera();
    });

    
    var requestOptions = {
        method: 'GET',
      };
      

    fetch("https://api.geoapify.com/v1/geocode/reverse?lat=22.5726608&lon=88.4373123&apiKey=e1182357f1e6483c812fd6bd0731f496", requestOptions)
        .then(response => response.json())
        .then((result) => {

            const myCurrLcation =  result["features"][0]["properties"]["address_line2"];
            
            const locationInput = document.getElementById('locationInput');
            locationInput.value = myCurrLcation;

        })
        .catch(error => console.log('error', error));



    // const x = document.getElementById("demo");
        
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition();
      } else {
        // x.innerHTML = "Geolocation is not supported by this browser.";
      }
    }
    
    getLocation();