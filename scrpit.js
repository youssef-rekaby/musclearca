document.addEventListener("DOMContentLoaded", function () {
  // advanced mode

  const togglebutton = document.getElementById("toggle-button");
const icon = document.getElementById("icon");
const toggleText = document.getElementById("toggle-state");
const frontMuscles = document.getElementById("front");
const backMuscles = document.getElementById("back");
const frontDetailed = document.getElementById("frontDetailed");
const backDetailed = document.getElementById("backDetailed");

let isopen = false;

togglebutton.addEventListener("click", () => {
  if (!isopen) {
    icon.classList.add("move-right");
    togglebutton.style.backgroundColor = "blue";
    toggleText.textContent = "opened";
    toggleText.style.right = "47px";

    frontMuscles.style.display = "none";
    backMuscles.style.display = "none";

    frontDetailed.style.display = "flex";
    backDetailed.style.display = "flex";

    isopen = true;
  } else {
    icon.classList.remove("move-right");
    togglebutton.style.backgroundColor = ""; // Reset to default
    toggleText.textContent = "closed";
    toggleText.style.right = "15px";

    frontMuscles.style.display = "flex";
    backMuscles.style.display = "flex";

    frontDetailed.style.display = "none";
    backDetailed.style.display = "none";

    isopen = false;
  }
});

// ✅ Add hover once only
togglebutton.addEventListener("mouseover", () => {
  if (isopen) {
    togglebutton.style.backgroundColor = "green";
  }
});

togglebutton.addEventListener("mouseout", () => {
  if (isopen) {
    togglebutton.style.backgroundColor = "blue";
  }
});

  const theme = document.getElementById("theme");
  theme.style.display = "";
  let isWhite = false;

  theme.addEventListener("click", () => {
    if (isWhite) {
      document.body.style.backgroundColor = "black";
      document.body.style.backgroundColor = "black";
      isWhite = false;
    } else {
      document.body.style.backgroundColor = "white";
      isWhite = true;
    }
  });

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
  mainContent.style.filter = "blur(60px)"; // Apply blur to the page content
  document.body.style.pointerEvents = "none"; // Disable interactions during loading

  // Wait for 1 second, then remove the blur effect
  setTimeout(() => {
    mainContent.style.filter = "none"; // Remove blur
    document.body.style.pointerEvents = "auto"; // Enable interactions
    loader.classList.remove("active"); // Hide loader
    mainContent.replaceWith(...mainContent.children);
  }, 500); // Keep the blur effect for 1s

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
  quads: "The quadriceps are a group of four muscles located at the front of the thigh. They are primarily responsible for extending the knee joint, which is crucial in walking, running, and jumping. The quadriceps also help stabilize the patella and knee during physical activities.",
  
  calves: "The calves consist mainly of two muscles: the gastrocnemius and soleus. These muscles work together to enable plantar flexion of the foot, essential for walking, running, and jumping. The calves also help maintain balance and support the ankle during movement.",
  
  abdominals: "The abdominals form the core muscles that support the trunk and maintain posture. They assist in flexing the spine, such as when bending forward or during crunches. Strong abdominals improve balance and protect the lower back from injury.",
  
  obliques: "Obliques are the muscles on the side of the abdomen responsible for rotating and bending the torso sideways. They play an important role in stabilizing the spine during twisting motions. Strengthening obliques enhances core stability and athletic performance.",
  
  hands: "Hand muscles control fine motor skills, including gripping and manipulating objects. These muscles allow precise movements like writing, typing, and grasping. Well-conditioned hand muscles improve dexterity and coordination.",
  
  forearms: "Forearm muscles control wrist and finger movements, enabling gripping, lifting, and manipulating objects. They consist of flexors and extensors that allow bending and straightening of the wrist and fingers. Strength in these muscles is essential for tasks requiring hand strength and endurance.",
  
  biceps: "The biceps brachii is located at the front of the upper arm and is responsible for flexing the elbow and rotating the forearm. It enables movements like lifting objects and turning the palm upward. Exercises like curls help strengthen and shape the biceps.",
  
  "front-shoulders": "The front shoulders, or anterior deltoids, lift and rotate the arm forward. They are heavily involved in pushing movements and overhead activities. Strengthening these muscles improves shoulder stability and function.",
  
  chest: "The chest muscles, primarily the pectoralis major, are responsible for pushing movements and moving the arms across the body. They play a vital role in upper body strength and endurance. Exercises like bench presses and push-ups target the chest effectively.",
  
  traps: "The trapezius muscles span the upper back and neck, stabilizing and moving the shoulder blades. They assist in shrugging the shoulders and rotating the neck. Strong traps improve posture and reduce neck and shoulder tension.",
  
  hamstrings: "The hamstrings are a group of muscles at the back of the thigh that bend the knee and extend the hip. They are essential for running, jumping, and controlling deceleration. Strengthening hamstrings helps prevent injuries such as strains and tears.",
  
  glutes: "The gluteal muscles are the main hip extensors, aiding in movements like standing up, walking, and running. They also assist with hip rotation and pelvis stabilization. Strong glutes improve athletic performance and reduce lower back pain.",
  
  triceps: "The triceps brachii is located at the back of the upper arm and is responsible for extending the elbow joint. It also helps stabilize the shoulder during pushing activities. Strength training exercises like dips and pushdowns target the triceps.",
  
  lats: "The latissimus dorsi are large muscles on the sides of the back that pull the arms downward and backward. They contribute to movements such as pull-ups and swimming strokes. Strong lats enhance upper body strength and posture.",
  
  lowerback: "Lower back muscles support the spine and maintain posture, preventing injuries during bending and lifting. They also play a role in stabilizing the core during movement. Strengthening these muscles reduces the risk of lower back pain.",
  
  "traps-middle": "The middle trapezius muscles retract the shoulder blades, pulling them toward the spine. This action is important for good posture and shoulder blade stability. Strengthening this area helps prevent rounded shoulders and improves upper back strength.",
  
  "rear-shoulders": "The rear shoulders, or posterior deltoids, extend and rotate the arm backward. They balance the front shoulder muscles and support pulling movements. Strengthening rear deltoids improves shoulder stability and posture.",
  
  "lateral-deltoid": "The lateral deltoids raise the arm to the side, enabling movements like lateral raises. They help widen the shoulders and contribute to shoulder abduction. Well-developed lateral deltoids enhance upper body aesthetics and function.",
  
  "anterior-deltoid": "The anterior deltoids lift the arm forward and assist in shoulder flexion. They are involved in many pushing exercises and overhead movements. Training this muscle improves shoulder strength and range of motion.",
  
  "upper-pectoralis": "The upper pectoralis major targets the upper chest area and is heavily involved in incline pressing movements. Strengthening this part of the chest enhances upper body power and aesthetics. Incline bench presses and push-ups are effective exercises.",
  
  "mid-lower-pectoralis": "The middle and lower pectoralis major muscles control horizontal adduction and downward movement of the arms. They play a key role in flat and decline pressing exercises. These muscles add thickness and strength to the chest.",
  
  "upper-abdominals": "The upper abdominals are the top section of the rectus abdominis muscle and are activated during crunches. They assist in flexing the spine forward and stabilizing the torso. Strong upper abs contribute to a defined six-pack appearance.",
  
  "lower-abdominals": "The lower abdominals help in lifting the legs and stabilizing the pelvis. They are activated in exercises like leg raises and reverse crunches. Strengthening this area improves core stability and posture.",
  
  "short-head-bicep": "The short head of the biceps lies on the inner side of the upper arm and contributes to elbow flexion. It adds width to the biceps muscle. Exercises like hammer curls emphasize the short head.",
  
  "long-head-bicep": "The long head of the biceps is on the outer part of the upper arm and helps with elbow flexion and shaping the muscle peak. It is heavily recruited during incline curls. Developing this head improves overall arm aesthetics.",
  
  "wrist-flexors": "Wrist flexors are muscles on the underside of the forearm that bend the wrist toward the palm. They play a vital role in gripping and wrist stability. Strengthening these muscles can improve performance in sports and daily tasks.",
  
  "wrist-extensors": "Wrist extensors are located on the top side of the forearm and extend the wrist backward. They balance the wrist flexors and help stabilize the wrist joint. Proper training prevents wrist injuries and improves grip strength.",
  
  "inner-thigh": "The inner thigh muscles, or adductors, pull the legs toward the midline of the body. They are essential for balance and leg stability during walking and running. Exercises like side lunges and adductor squeezes target these muscles.",
  
  "inner-quadricep": "The inner quadriceps, or vastus medialis, stabilizes the knee and assists in extending the leg. It plays a critical role in knee tracking during movements like squats. Strengthening this muscle helps prevent knee injuries.",
  
  soleus: "The soleus is a deep calf muscle beneath the gastrocnemius that aids in maintaining posture and balance. It is important for activities such as walking and standing for long periods. Exercises like seated calf raises specifically target the soleus.",
  
  tibialis: "The tibialis anterior muscle runs along the front of the shin and is responsible for dorsiflexion, lifting the foot upwards. It helps prevent foot drop and improves walking efficiency. Toe raises and resistance band exercises strengthen the tibialis.",
  
  gastrocnemius: "The gastrocnemius is the largest calf muscle, giving the calf its shape. It is responsible for powerful movements like jumping and sprinting. Standing calf raises effectively develop this muscle.",
  
  "upper-trapezius": "The upper trapezius raises the shoulders and assists in neck movement. It supports head stability and helps during shoulder shrugs. Overdeveloped traps can cause neck tension, so balanced training is key.",
  
  neck: "Neck muscles support and move the head, allowing flexion, extension, and rotation. They protect the cervical spine and assist in posture. Neck strengthening exercises help reduce pain and improve head control.",
  
  feet: "The muscles in the feet are small but vital for balance, arch support, and toe control. They help absorb impact during walking and running. Strengthening foot muscles prevents injuries and improves overall movement efficiency.",
  
  "lower-trapezius": "The lower trapezius lowers the shoulder blade and stabilizes the shoulder during arm movements. It plays a key role in scapular control and posture. Strengthening this muscle helps prevent shoulder injuries and improves upper back function.",
  
  "posterior-deltoid": "The posterior deltoid extends and rotates the arm backward, counterbalancing the front deltoids. It is crucial for pulling movements and maintaining shoulder balance. Strengthening it improves posture and shoulder health.",
  
  "lateral-head-triceps": "The lateral head of the triceps is located on the outer side of the back arm and is responsible for elbow extension. It contributes to the muscle’s overall size and strength. Targeted exercises include triceps pushdowns and kickbacks.",
  
  "long-head-triceps": "The long head of the triceps assists in elbow extension and also helps stabilize the shoulder joint. It spans from the shoulder blade to the elbow. Overhead triceps extensions target this part effectively.",
  
  "medial-head-triceps": "The medial head of the triceps lies deep under the other two heads and provides stable elbow extension. It contributes to endurance and fine motor control. Close-grip bench presses and reverse grip pushdowns strengthen this muscle.",
  
  "gluteus-medius": "The gluteus medius is a lateral hip muscle important for leg abduction and pelvis stabilization during walking and running. It prevents hip drop and maintains balance. Side leg raises and clamshell exercises target this muscle.",
  
  "gluteus-maximus": "The gluteus maximus is the largest muscle in the buttocks, responsible for hip extension, outward rotation, and power generation during activities like running and climbing. Squats and deadlifts effectively strengthen this muscle.",
  
  "lateral-hamstrings": "The lateral hamstrings run along the outer back thigh and assist in knee flexion and hip extension. They help control leg movements during running and jumping. Strengthening these muscles reduces injury risk.",
  
  "medial-hamstrings": "The medial hamstrings are located on the inner back thigh and are involved in bending the knee and extending the hip. They contribute to stability and power during dynamic movements. Exercises like Nordic curls target this muscle group.",
  
  groin: "The groin muscles, or adductors, are located in the inner thigh and pull the legs toward the body's midline. They provide stability during lateral movements and help prevent injuries. Stretching and strengthening the groin are essential for athletic performance.",
  
  "rectus-femoris": "The rectus femoris is one of the quadriceps muscles located in the middle of the thigh and is involved in knee extension and hip flexion. It plays a vital role in kicking and sprinting motions. Strengthening it improves speed and leg power.",
  
  "outer-quadricep": "The outer quadriceps, or vastus lateralis, is on the outer thigh and is responsible for knee extension and stabilizing the leg. It contributes to the overall size and strength of the thigh. Exercises like squats and leg presses effectively target this muscle."
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
  quads: "Front thigh muscles that extend the knee.",
  calves: "Back lower-leg muscles that help with walking and running.",
  abdominals: "Core muscles involved in spine flexion and stability.",
  obliques: "Side abs for rotation and side bending.",
  hands: "Control grip and fine hand movements.",
  forearms: "Move the wrist and fingers.",
  biceps: "Flex the elbow and rotate the forearm.",
  "front-shoulders": "Lift and rotate the arm forward.",
  chest: "Main chest muscle for pushing and arm movement.",
  traps: "Upper back muscles that move and stabilize the shoulder.",
  hamstrings: "Back thigh muscles that flex the knee.",
  glutes: "Hip muscles for extension and rotation.",
  triceps: "Extend the elbow joint.",
  lats: "Side back muscles that pull the arm downward.",
  lowerback: "Support posture and spinal stability.",
  "traps-middle": "Retract the shoulder blades.",
  "rear-shoulders": "Extend and rotate the arm backward.",
  "lateral-deltoid": "Raises the arm to the side.",
  "anterior-deltoid": "Lifts the arm forward.",
  "upper-pectoralis": "Top chest muscle for incline pressing.",
  "mid-lower-pectoralis": "Middle and lower chest for flat and decline pressing.",
  "upper-abdominals": "Top abs used in crunches.",
  "lower-abdominals": "Lower core muscles used in leg raises.",
  "short-head-bicep": "Inner biceps head for elbow flexion.",
  "long-head-bicep": "Outer biceps head for flexion and shape.",
  "wrist-flexors": "Bend the wrist toward the palm.",
  "wrist-extensors": "Extend the wrist backward.",
  "inner-thigh": "Adductor muscles that pull the leg inward.",
  "inner-quadricep": "Vastus medialis; stabilizes the knee.",
  soleus: "Deep calf muscle for balance and walking.",
  tibialis: "Front shin muscle for lifting the foot.",
  gastrocnemius: "Main calf muscle used in jumping.",
  "upper-trapezius": "Raises shoulders and moves the neck.",
  neck: "Moves and supports the head.",
  feet: "Small muscles for balance and toe control.",
  
  // New detailed entries
  "lower-trapezius": "Lowers the shoulder blade and stabilizes the shoulder.",
  "posterior-deltoid": "Extends and rotates the shoulder back.",
  "lateral-head-triceps": "Outer triceps for elbow extension.",
  "long-head-triceps": "Triceps part aiding in elbow and shoulder movement.",
  "medial-head-triceps": "Deep triceps for stable elbow extension.",
  "gluteus-medius": "Lateral hip muscle for leg movement and balance.",
  "gluteus-maximus": "Main glute muscle for hip power.",
  "lateral-hamstrings": "Outer back thigh for knee and hip movement.",
  "medial-hamstrings": "Inner back thigh muscles for knee flexion.",
  "groin": "Inner thigh muscles for pulling the legs inward.",
  "rectus-femoris": "Central quad that helps in kicking and sprinting.",
  "outer-quadricep": "Vastus lateralis; outer thigh for knee extension.",
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
