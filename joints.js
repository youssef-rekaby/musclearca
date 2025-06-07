const jointCircles = document.querySelectorAll("g.joints circle");
let activeDiv = null; // Store the currently opened div
let moreInfoDiv = null; // Store the more info div

jointCircles.forEach((circle) => {
  circle.addEventListener("click", function () {
    if (activeDiv) {
      alert("Close the current muscle info before opening another.");
      return;
    }

    // Create the info div
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

    // Create the close button
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

    // Create the more info button
    const moreInfoButton = document.createElement("button");
    moreInfoButton.textContent = "More Info";
    moreInfoButton.setAttribute("class", "MoreInfoButton");
    newDiv.appendChild(moreInfoButton);
    
    moreInfoButton.addEventListener('click', () => {
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
      document.body.appendChild(moreInfoDiv);

    const jointsMoreInfo = {
  shoulder: "Ball-and-socket joint between humerus and scapula. Moves in all directions (flexion, extension, abduction, rotation). Main muscles: deltoid, rotator cuff. Stabilized by labrum and ligaments. Prone to dislocations and rotator cuff injuries.",

  elbow: "Hinge joint linking humerus, radius, and ulna. Allows flexion/extension and forearm rotation. Biceps and triceps control movement. Stabilized by the ulnar collateral ligament. Common issues: tennis elbow, fractures.",

  wrist: "Formed by radius and carpal bones (like scaphoid). Allows various motions: flexion, extension, and rotation. Controlled by forearm flexors/extensors. TFCC supports the joint. Prone to sprains and carpal tunnel syndrome.",

  knee: "Largest hinge joint between femur, tibia, and patella. Allows flexion, extension, and slight rotation. Quadriceps and hamstrings power it. Menisci absorb shock; ACL, PCL, MCL, LCL stabilize. Common issues: ligament tears, arthritis.",

  ankle: "Hinge joint of tibia, fibula, and talus. Enables dorsiflexion and plantarflexion; subtalar joint allows rotation. Controlled by calf and shin muscles. Stabilized by deltoid and lateral ligaments. Sprains are very common.",

  hip: "Ball-and-socket joint between femur and pelvis. Moves in all directions: flexion, extension, rotation. Key muscles: glutes, iliopsoas, adductors. Labrum and strong ligaments ensure stability. Can suffer from arthritis and labral tears.",

  upperScapula: "The upper region of the scapula (shoulder blade) includes the superior angle and the supraspinous fossa. It's the attachment site for muscles like the levator scapulae and supraspinatus. Plays a role in upward rotation and elevation of the scapula. Can be involved in shoulder impingement or tension headaches.",

  scapula: "The scapula is a flat, triangular bone that connects the humerus (upper arm) with the clavicle (collarbone). It serves as a foundation for shoulder movement and muscle attachment, including the deltoid, trapezius, and rotator cuff. It glides along the rib cage during arm motion. Key movements: elevation, depression, protraction, retraction, and rotation. Dysfunction may cause winging or instability.",

  'lower-spine': "The lower spine includes the lumbar vertebrae (L1–L5), sacrum, and coccyx. It supports body weight, enables bending and rotation, and protects spinal nerves. The lumbar region is large and strong, bearing heavy loads. The sacrum connects the spine to the pelvis, while the coccyx (tailbone) is a vestigial structure. Muscles like the erector spinae and multifidus stabilize this area. Common problems include herniated discs, lower back pain, and sciatica due to nerve compression."
};



const moreInfoParagraph = document.createElement("p");
        moreInfoParagraph.textContent = jointsMoreInfo[muscleGroupName];
        moreInfoDiv.appendChild(moreInfoParagraph);

        document.body.appendChild(moreInfoDiv);

        // Auto-scroll to the More Info section
        moreInfoDiv.scrollIntoView({ behavior: "smooth" });
    });

    // Get the muscle group name
    const muscleGroupName = circle.parentNode.id;
    const muscleName = muscleGroupName.charAt(0).toUpperCase() + muscleGroupName.slice(1);

    // Display muscle name
    const h1 = document.createElement("h1");
    h1.textContent = muscleName + ' joint';
    h1.style.textAlign = "center";
    newDiv.appendChild(h1);

   const jointsInfo = {
  shoulder: "The shoulder joint allows a wide range of arm movements.",
  elbow: "The elbow joint connects the upper arm to the forearm and enables bending.",
  wrist: "The wrist joint allows the hand to rotate and move in many directions.",
  knee: "The knee joint supports body weight and allows leg bending.",
  ankle: "The ankle joint connects the foot to the leg and supports movement.",
  hip: "The hip is a ball-and-socket joint connecting the femoral head to the pelvis.",
  upperScapula: "Top part of the scapula, helps lift and rotate the shoulder.",
  scapula: "Flat shoulder blade that anchors muscles and guides arm motion.",
  'lower-spine': "Supports the upper body, allows bending and twisting, and protects spinal nerves in the lower back."
};


    // Display muscle description
    const jointsDescription = document.createElement("p");
    jointsDescription.textContent = jointsInfo[muscleGroupName] || "No information available";
    jointsDescription.style.textAlign = "center";
    newDiv.appendChild(jointsDescription);
  });
});