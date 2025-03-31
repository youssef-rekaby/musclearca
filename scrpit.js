document.addEventListener("DOMContentLoaded", function () {
  var footer = document.querySelector("footer");
  footer.style.display = "nonE";

  var aboutbutton = document.getElementById("about");

  aboutbutton.addEventListener("click", function () {
    footer.style.display = "flex";
    footer.scrollIntoView({ behavior: "smooth" });
  });

  let loader = document.querySelector(".loader");
  let mainContent = document.querySelector(".main-content"); // Wrap your main content in a div

  // Show loader and apply blur effect to everything except it
  loader.classList.add("active");
  mainContent.style.filter = "blur(25px)"; // Apply blur to the page content
  document.body.style.pointerEvents = "none"; // Disable interactions during loading

  // Wait for 1 second, then remove the blur effect
  setTimeout(() => {
    mainContent.style.filter = "none"; // Remove blur
    document.body.style.pointerEvents = "auto"; // Enable interactions
    loader.classList.remove("active"); // Hide loader
    mainContent.replaceWith(...mainContent.children);
  }, 2000); // Keep the blur effect for 1s

  const ContactMe = document.getElementById("contact");
  ContactMe.addEventListener("click", () => {
    const ContactDiv = document.getElementById("contactDiv");
    ContactDiv.style.display = "block";

    // making the close button
    const CloseContact = document.getElementsByClassName("CloseContact");
    CloseContact[0].addEventListener("click", () => {
      ContactDiv.style.display = "none";
    });
  });

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
      newDiv.style.alignSelf = "center"; // Default position
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
      dragHeader.style.position = "sticky";
      dragHeader.style.top = "0";
      dragHeader.style.left = "0";

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
      closeButton.style.position = "sticky";
      closeButton.style.top = "0px";
      closeButton.style.right = "0px";
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
      moreInfoButton.setAttribute("class", "MoreInfoButton");
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
          quads:
            "Located at the front of the thigh, the quadriceps extend the knee and assist in hip flexion, essential for walking, running, and jumping. Strengthening them improves knee stability and power. Key exercises: squats, lunges, leg press, leg extensions.",
          calves:
            "The calves (gastrocnemius, soleus) at the back of the lower leg control plantar flexion and provide stability for walking and running. Strong calves enhance endurance and balance. Key exercises: calf raises, donkey calf raises, jump rope.",
          abdominals:
            "Located in the front torso, abs flex the spine, stabilize the core, and support posture. A strong core improves athletic performance and prevents back pain. Key exercises: crunches, planks, leg raises, Russian twists.",
          obliques:
            "Situated on the sides of the torso, obliques assist in trunk rotation and lateral flexion, enhancing stability and balance. Key exercises: side planks, Russian twists, woodchoppers.",
          hands:
            "Hand muscles control grip strength and dexterity, crucial for lifting and fine motor tasks. Key exercises: farmer's carries, grip squeezes, towel hangs.",
          forearms:
            "Located between the wrist and elbow, forearms support grip strength and wrist stability. Key exercises: wrist curls, reverse curls, hammer curls.",
          biceps:
            "Situated at the front of the upper arm, biceps assist in elbow flexion and pulling movements. Key exercises: bicep curls, hammer curls, chin-ups.",
          "front-shoulders":
            "Located at the front of the shoulder, this muscle aids in shoulder flexion and pressing motions. Key exercises: shoulder presses, front raises, upright rows.",
          chest:
            "Positioned in the upper torso, pecs assist in pushing movements and arm adduction. Key exercises: bench press, push-ups, dips, cable flys.",
          traps:
            "Running from the neck to shoulders, traps elevate and retract the shoulders, improving posture. Key exercises: shrugs, upright rows, face pulls.",
          hamstrings:
            "Located at the back of the thigh, hamstrings flex the knee and extend the hip, improving speed and power. Key exercises: Romanian deadlifts, leg curls, glute-ham raises.",
          glutes:
            "The largest muscles in the body, the glutes aid in hip extension, stability, and lateral movement. Key exercises: squats, hip thrusts, lunges, deadlifts.",
          triceps:
            "Situated at the back of the upper arm, triceps extend the elbow and enhance pushing strength. Key exercises: triceps dips, skull crushers, pushdowns.",
          lats: "Spanning the sides of the back, lats control shoulder movement and pulling strength. Key exercises: pull-ups, lat pulldowns, rows.",
          lowerback:
            "Supporting spinal stability and posture, the lower back muscles prevent injury and enhance strength. Key exercises: deadlifts, back extensions, good mornings.",
          "traps-middle":
            "Located between the shoulder blades, these muscles aid in scapular retraction and posture. Key exercises: face pulls, rows, reverse flys.",
          "rear-shoulders":
            "At the back of the shoulder, this muscle supports shoulder extension and rotation. Key exercises: reverse flys, face pulls, rear delt rows.",
        };

        const moreInfoParagraph = document.createElement("p");
        moreInfoParagraph.textContent = exaplinedMuscles[muscleGroupName];
        moreInfoDiv.appendChild(moreInfoParagraph);

        document.body.appendChild(moreInfoDiv);

        // Auto-scroll to the More Info section
        moreInfoDiv.scrollIntoView({ behavior: "smooth" });
      });

      // Get the muscle group name
      const muscleGroupName = path.parentNode.id;
      const muscleName =
        muscleGroupName.charAt(0).toUpperCase() + muscleGroupName.slice(1);

      // Display muscle name
      const h1 = document.createElement("h1");
      h1.textContent = muscleName;
      h1.style.textAlign = "center";
      newDiv.appendChild(h1);

      // Define muscle info
      const muscleInfo = {
        quads:
          "The quadriceps are a group of four muscles located on the front of the thigh. They extend the knee.",
        calves:
          "The calves are located on the back of the lower leg. They help with walking and running.",
        abdominals:
          "The abdominal muscles support core strength and spine flexion.",
        obliques: "The obliques assist with twisting and bending the torso.",
        hands:
          "Hand muscles are responsible for grip strength and fine motor skills.",
        forearms: "Forearm muscles control wrist and finger movement.",
        biceps: "The biceps flex the elbow and assist in forearm rotation.",
        "front-shoulders":
          "The anterior deltoids assist in lifting and rotating the arm.",
        chest:
          "The pectoralis major is responsible for arm flexion and rotation.",
        traps: "The trapezius helps move and stabilize the scapula.",
        hamstrings: "The hamstrings flex the knee and extend the hip.",
        glutes: "The gluteal muscles extend and rotate the hip.",
        triceps: "The triceps extend the elbow joint.",
        lats: "The latissimus dorsi muscles control arm adduction and extension.",
        lowerback: "The lower back muscles support the spine and posture.",
        "traps-middle": "The middle trapezius muscles retract the scapula.",
        "rear-shoulders":
          "The posterior deltoids extend and laterally rotate the arm.",
      };

      // Display muscle description
      const muscleDescription = document.createElement("p");
      muscleDescription.textContent =
        muscleInfo[muscleGroupName] || "No information available.";
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
