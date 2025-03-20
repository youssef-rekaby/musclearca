document.addEventListener("DOMContentLoaded", function () {  
  let activeDiv = null; // Store the currently opened div  
  let moreInfoDiv = null; // Store the more info div  

  const svgPaths = document.querySelectorAll("svg g.bodymap path");  

  svgPaths.forEach((path) => {  
    path.addEventListener("click", function () {  
      if (activeDiv) {  
        alert("Close the current muscle info before opening another.");  
        return;  
      }  

      // Create the main draggable div  
      const newDiv = document.createElement("div");
      newDiv.style.position = "absolute";
      newDiv.style.background = "white";
      newDiv.style.border = "2px solid black";
      newDiv.style.borderRadius = "8px";
      newDiv.style.padding = "10px";
      newDiv.style.width = "350px";
      newDiv.style.height = "150px";
      newDiv.style.boxShadow = "5px 5px 15px rgba(0,0,0,0.2)";
      newDiv.style.overflow = "auto";
      newDiv.style.zIndex = "1000";
      newDiv.style.alignSelf = "center";  // Default position
      newDiv.style.justifySelf = "center"; // Default position
      document.body.appendChild(newDiv);
      activeDiv = newDiv; // Set active div

      // Create a draggable header
      const dragHeader = document.createElement("div");
      dragHeader.style.background = "#333";
      dragHeader.style.color = "white";
      dragHeader.style.padding = "8px";
      dragHeader.style.cursor = "grab";
      dragHeader.style.fontSize = "14px";
      dragHeader.style.textAlign = "center";
      dragHeader.style.borderTopLeftRadius = "8px";
      dragHeader.style.borderTopRightRadius = "8px";

      dragHeader.textContent = "Drag Here";
      newDiv.prepend(dragHeader); // Add header at the top

      // Call the function to make it draggable from the header
      makeDraggable(newDiv, dragHeader);

      // Create a close button  
      const closeButton = document.createElement("button");  
      closeButton.textContent = "X";  
      closeButton.style.cursor = "pointer";  
      closeButton.style.background = "red";  
      closeButton.style.color = "white";  
      closeButton.style.border = "none";  
      closeButton.style.padding = "5px";  
      closeButton.style.fontSize = "14px";  
      closeButton.style.borderRadius = "50%";  
      closeButton.style.width = "25px";  
      closeButton.style.height = "25px";  
      closeButton.style.display = "flex";  
      closeButton.style.alignItems = "center";  
      closeButton.style.justifyContent = "center";  
      closeButton.style.fontWeight = "bold";  
      closeButton.style.position = 'sticky'
      closeButton.style.top = '0px'
      closeButton.style.right = '0px'
      newDiv.appendChild(closeButton);  

      closeButton.addEventListener("click", function () {  
        document.body.removeChild(newDiv);  
        activeDiv = null;  

        // Remove the More Info section if it exists  
        if (moreInfoDiv) {  
          document.body.removeChild(moreInfoDiv);  
          moreInfoDiv = null;  
        }  
      });  

      // Create More Info button  
      const moreInfoButton = document.createElement("button");  
      moreInfoButton.textContent = "More Info";  
      newDiv.appendChild(moreInfoButton);  
      moreInfoButton.setAttribute('class','MoreInfoButton')
      moreInfoButton.addEventListener("click", () => {  
        if (moreInfoDiv) {  
          alert("More Info is already open!");  
          return;  
        }  



        // Create the More Info section  
        moreInfoDiv = document.createElement("div");  
        moreInfoDiv.style.padding = "20px";  
        moreInfoDiv.style.marginTop = "20px";  
        moreInfoDiv.style.border = "1px solid black";  
        moreInfoDiv.style.borderRadius = "8px";  
        moreInfoDiv.style.background = "#f8f8f8";  
        moreInfoDiv.style.width = "80%";  
        moreInfoDiv.style.margin = "20px auto";  

        const moreInfoHeading = document.createElement("h2");  
        moreInfoHeading.textContent = `More info about ${muscleGroupName}`;  
        moreInfoDiv.appendChild(moreInfoHeading);  
  
        const exaplinedMuscles = {
          Quads: "The quadriceps are a group of four muscles located on the front of the thigh. They extend the knee.",  
        calves: "The calves are located on the back of the lower leg. They help with walking and running.",  
        abdominals: "The abdominal muscles support core strength and spine flexion.",  
        obliques: "The obliques assist with twisting and bending the torso.",  
        hands: "Hand muscles are responsible for grip strength and fine motor skills.",  
        forearms: "Forearm muscles control wrist and finger movement.",  
        biceps: "The biceps flex the elbow and assist in forearm rotation.",  
        "front-shoulders": "The anterior deltoids assist in lifting and rotating the arm.",  
        chest: "The pectoralis major is responsible for arm flexion and rotation.",  
        traps: "The trapezius helps move and stabilize the scapula.",  
        hamstrings: "The hamstrings flex the knee and extend the hip.",  
        glutes: "The gluteal muscles extend and rotate the hip.",  
        triceps: "The triceps extend the elbow joint.",  
        lats: "The latissimus dorsi muscles control arm adduction and extension.",  
        lowerback: "The lower back muscles support the spine and posture.",  
        "traps-middle": "The middle trapezius muscles retract the scapula.",  
        "rear-shoulders": "The posterior deltoids extend and laterally rotate the arm.",  
          
        }

        const moreInfoParagraph = document.createElement("p");  
        moreInfoParagraph.textContent = exaplinedMuscles[muscleGroupName];  
        moreInfoDiv.appendChild(moreInfoParagraph);  

        document.body.appendChild(moreInfoDiv);  

        // Auto-scroll to the More Info section  
        moreInfoDiv.scrollIntoView({ behavior: "smooth" });  
      });  

      // Get the muscle group name  
      const muscleGroupName = path.parentNode.id;  
      const muscleName = muscleGroupName.charAt(0).toUpperCase() + muscleGroupName.slice(1);  

      // Display muscle name  
      const h1 = document.createElement("h1");  
      h1.textContent = muscleName;  
      h1.style.textAlign = "center";  
      newDiv.appendChild(h1);  

      // Define muscle info  
      const muscleInfo = {  
        quads: "The quadriceps are a group of four muscles located on the front of the thigh. They extend the knee.",  
        calves: "The calves are located on the back of the lower leg. They help with walking and running.",  
        abdominals: "The abdominal muscles support core strength and spine flexion.",  
        obliques: "The obliques assist with twisting and bending the torso.",  
        hands: "Hand muscles are responsible for grip strength and fine motor skills.",  
        forearms: "Forearm muscles control wrist and finger movement.",  
        biceps: "The biceps flex the elbow and assist in forearm rotation.",  
        "front-shoulders": "The anterior deltoids assist in lifting and rotating the arm.",  
        chest: "The pectoralis major is responsible for arm flexion and rotation.",  
        traps: "The trapezius helps move and stabilize the scapula.",  
        hamstrings: "The hamstrings flex the knee and extend the hip.",  
        glutes: "The gluteal muscles extend and rotate the hip.",  
        triceps: "The triceps extend the elbow joint.",  
        lats: "The latissimus dorsi muscles control arm adduction and extension.",  
        lowerback: "The lower back muscles support the spine and posture.",  
        "traps-middle": "The middle trapezius muscles retract the scapula.",  
        "rear-shoulders": "The posterior deltoids extend and laterally rotate the arm.",  
      };  

      // Display muscle description  
      const muscleDescription = document.createElement("p");  
      muscleDescription.textContent = muscleInfo[muscleGroupName] || "No information available.";  
      muscleDescription.style.textAlign = "center";  
      newDiv.appendChild(muscleDescription);  

    });  
  });  
});  

// Revised makeDraggable function
function makeDraggable(element, dragArea) {
  let isDragging = false;
  let startX, startY, initialX, initialY;

  dragArea.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    initialX = element.offsetLeft;
    initialY = element.offsetTop;
    dragArea.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const newX = initialX + (e.clientX - startX);
    const newY = initialY + (e.clientY - startY);

    element.style.left = `${newX}px`;
    element.style.top = `${newY}px`;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    dragArea.style.cursor = "grab";
  });
}