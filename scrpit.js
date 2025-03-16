document.addEventListener("DOMContentLoaded", function () { 
  let activeDiv = null; // Store the currently opened div 

  const svgPaths = document.querySelectorAll("svg g.bodymap path"); 

  svgPaths.forEach((path) => { 
    path.addEventListener("click", function () { 
      // If an active div exists, prevent opening a new one until it's closed 
      if (activeDiv) { 
        alert("Close the current muscle info before opening another."); 
        return; 
      } 

      // Create the main draggable div (info box) 
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
      document.body.appendChild(newDiv); 
      activeDiv = newDiv; // Set the active div 

      // Create a draggable top bar 
      const dragBar = document.createElement("div"); 
      dragBar.style.width = "100%"; 
      dragBar.style.height = "25px"; 
      dragBar.style.background = "#ddd"; 
      dragBar.style.cursor = "grab"; 
      dragBar.style.display = "flex"; 
      dragBar.style.alignItems = "center"; 
      dragBar.style.justifyContent = "center"; 
      dragBar.style.fontWeight = "bolder"; 
      dragBar.style.userSelect = "none"; 
      dragBar.textContent = "Drag here"; 
      newDiv.appendChild(dragBar); 

      // Make the div draggable using the drag bar 
      let isDragging = false; 
      let offsetX, offsetY; 

      dragBar.addEventListener("mousedown", (e) => { 
        isDragging = true; 
        offsetX = e.clientX - newDiv.offsetLeft; 
        offsetY = e.clientY - newDiv.offsetTop; 
        dragBar.style.cursor = "grabbing"; 
      }); 

      document.addEventListener("mousemove", (e) => { 
        if (isDragging) { 
          let newX = e.clientX - offsetX; 
          let newY = e.clientY - offsetY; 

          // Prevent the div from going off-screen 
          newX = Math.max(0, Math.min(window.innerWidth - newDiv.offsetWidth, newX)); 
          newY = Math.max(0, Math.min(window.innerHeight - newDiv.offsetHeight, newY)); 

          newDiv.style.left = `${newX}px`; 
          newDiv.style.top = `${newY}px`; 
        } 
      }); 

      document.addEventListener("mouseup", () => { 
        isDragging = false; 
        dragBar.style.cursor = "grab"; 
      }); 

      // Create a close button (X) to remove the div 
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
      closeButton.style.alignSelf = "center";
      closeButton.style.justifyContent = "center"; 
      closeButton.style.fontWeight = "bold"; 
      newDiv.appendChild(closeButton); 

      closeButton.addEventListener("click", function () { 
        document.body.removeChild(newDiv); 
        activeDiv = null; // Reset active div 
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
