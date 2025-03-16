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
      newDiv.style.alignSelf = "center"
      newDiv.style.background = "white";
      newDiv.style.border = "1px solid black";
      newDiv.style.padding = "10px";
      newDiv.style.width = "350px";
      newDiv.style.height = "150px";
      newDiv.style.top = "100px";
      newDiv.style.left = "100px";
      newDiv.style.cursor = "grab";
      newDiv.style.display = "flex";
      newDiv.style.alignItems = "center";
      newDiv.style.justifyContent = "center";
      newDiv.style.flexDirection = "column";
      newDiv.style.fontSize = "18px";
      newDiv.style.fontWeight = "bold";
      newDiv.style.overflow = "scroll";
      newDiv.setAttribute("id", "muscle-info");
      document.body.appendChild(newDiv);
      activeDiv = newDiv; // Set the active div

      // Make the div draggable
      let isDragging = false;
      let offsetX, offsetY;

      newDiv.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - newDiv.offsetLeft;
        offsetY = e.clientY - newDiv.offsetTop;
        newDiv.style.cursor = "grabbing";
      });

      document.addEventListener("mousemove", (e) => {
        if (isDragging) {
          newDiv.style.left = `${e.clientX - offsetX}px`;
          newDiv.style.top = `${e.clientY - offsetY}px`;
        }
      });

      document.addEventListener("mouseup", () => {
        isDragging = false;
        newDiv.style.cursor = "grab";
      });

      // Position the div next to the clicked SVG path
      const rect = path.getBoundingClientRect();
      newDiv.style.left = `${rect.right + 10}px`;
      newDiv.style.top = `${rect.top}px`;

      // Create a close button (X) to remove the div
      const closeButton = document.createElement("button");
      closeButton.textContent = "X";
      closeButton.style.position = "sticky"; // Make it sticky
      closeButton.style.top = "0px"; // Stick to the top
      closeButton.style.right = "0px"; // Stick to the right
      closeButton.style.alignSelf = 'start'
      closeButton.style.cursor = "pointer";
      closeButton.style.background = "rgba(168, 168, 168, 0.88)";
      closeButton.style.border = "none";
      closeButton.style.padding = "5px";
      closeButton.style.zIndex = "10"; // Ensure it stays on top
      newDiv.appendChild(closeButton);

      closeButton.addEventListener("click", function () {
        document.body.removeChild(newDiv);
        activeDiv = null; // Reset active div
      });

      // Get the muscle group name
      const muscleGroupName = path.parentNode.id;
      const muscleName =
        muscleGroupName.charAt(0).toUpperCase() + muscleGroupName.slice(1);

      // Display muscle name
      const h1 = document.createElement("h1");
      h1.textContent = muscleName;
      h1.style.marginTop = "105px";
      newDiv.appendChild(h1);

      // Define muscle info
      const muscleInfo = {
        quads:
          "The quadriceps are a group of four muscles located on the front of the thigh. They are responsible for extending the knee.",
        calves:
          "The calves are located on the back of the lower leg. They are responsible for plantarflexion of the foot (pointing the toes).",
        abdominals:
          "The abdominal muscles are located in the abdomen. They are responsible for flexing the spine and supporting the core.",
        obliques:
          "The obliques are located on the sides of the abdomen. They are responsible for twisting and bending the torso.",
        hands:
          "Muscles in the hands are responsible for fine motor skills and grip strength.",
        forearms:
          "The forearm muscles control wrist and finger movements, including grip and rotation.",
        biceps:
          "The biceps brachii muscle is located on the front of the upper arm. It is responsible for flexing the elbow and supinating the forearm.",
        "front-shoulders":
          "The anterior deltoid muscles are located at the front of the shoulder. They assist in lifting and rotating the arm.",
        chest:
          "The pectoralis major muscle is located on the chest. It is responsible for adducting, medially rotating, and flexing the arm.",
        traps:
          "The trapezius muscle is located in the upper back. It is responsible for moving and stabilizing the scapula.",
        hamstrings:
          "The hamstrings are a group of three muscles located at the back of the thigh. They are responsible for flexing the knee and extending the hip.",
        glutes:
          "The gluteal muscles are located in the buttocks. They are responsible for extending and rotating the hip.",
        triceps:
          "The triceps brachii muscle is located at the back of the upper arm. It is responsible for extending the elbow.",
        lats: "The latissimus dorsi muscles are located on the sides of the back. They are responsible for adducting, extending, and medially rotating the arm.",
        lowerback:
          "The lower back muscles are located in the lumbar region. They are responsible for supporting the spine and maintaining posture.",
        "traps-middle":
          "The middle trapezius muscles are located in the upper back. They are responsible for retracting the scapula.",
        "rear-shoulders":
          "The posterior deltoid muscles are located at the back of the shoulder. They assist in extending and laterally rotating the arm.",
      };

      // Display muscle description
      const p = document.createElement("p");
      p.textContent =
        muscleInfo[muscleGroupName] || "Information not available.";
      newDiv.appendChild(p);

      // Create a "More Info" button
      const moreButton = document.createElement("button");
      moreButton.textContent = "More info";
      moreButton.classList.add("more-info");
      newDiv.appendChild(moreButton);
      moreButton.addEventListener("click", () => {
        window.location.href = "muscle-info.html";
      });
    });
  });
  
  
  updateLayout(); // Apply on load
  window.addEventListener('resize', updateLayout); // Apply on resize
  
});
