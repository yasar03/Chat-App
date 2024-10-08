




// const firebaseConfig = {
//     apiKey: "AIzaSyDLtWbefGSAd8ACZxnHJxF7wLgrkXEvkEs",
//     authDomain: "chat-app-d9289.firebaseapp.com",
//     databaseURL: "https://chat-app-d9289-default-rtdb.firebaseio.com",
//     projectId: "chat-app-d9289",
//     storageBucket: "chat-app-d9289.appspot.com",
//     messagingSenderId: "910151259608",
//     appId: "1:910151259608:web:b752216bbef028090f8ead",
//     measurementId: "G-EKHNKSYT0J"
//   };

// const app = firebase.initializeApp(firebaseConfig);
// const db = firebase.database();

// console.log("Firebase initialized:", app);

// // Global variables
// let senderEmail = "";
// let receiverEmail = "";
// let chatRef = null;

// function login() {
//     senderEmail = document.getElementById('senderEmail').value;
//     receiverEmail = document.getElementById('receiverEmail').value;

//     if (!senderEmail || !receiverEmail) {
//         alert("Please enter both emails.");
//         return;
//     }

//     // Create a unique chat reference based on sender and receiver emails
//     const chatKey = generateChatKey(senderEmail, receiverEmail);
//     chatRef = db.ref('chats/' + chatKey);  // Initialize chatRef

//     console.log("Chat Reference initialized:", chatRef.toString());

//     // Load previous messages
//     loadMessages();

//     // Switch to chat window
//     document.querySelector('.login-form').style.display = 'none';
//     document.querySelector('.chat-window').style.display = 'block';
// }


// function generateChatKey(sender, receiver) {
//     // Create a consistent unique key for the chat between two users
//     return [sender, receiver].sort().join('_');
// }

// function loadMessages() {
//     chatRef.on('child_added', (snapshot) => {
//         const messageData = snapshot.val();
//         displayMessage(messageData.sender, messageData.text);
//     });
// }

// function displayMessage(sender, text) {
//     const messageContainer = document.getElementById('messages');
//     const messageDiv = document.createElement('div');
//     messageDiv.classList.add('message');
//     messageDiv.textContent = `${sender}: ${text}`;
//     messageContainer.appendChild(messageDiv);

//     // Scroll to the bottom of the chat
//     messageContainer.scrollTop = messageContainer.scrollHeight;
// }

// function sendMessage() {
//     const messageInput = document.getElementById('messageInput');
//     const messageText = messageInput.value.trim();

//     // Check if chatRef is initialized
//     if (!chatRef) {
//         console.error("Error: chatRef is not initialized. You must log in first.");
//         alert("You must log in first!");
//         return;
//     }

//     if (!messageText) {
//         alert("Please enter a message.");
//         return;
//     }

//     console.log("Sending message:", messageText);

//     // Push message to Firebase
//     chatRef.push({
//         sender: senderEmail,
//         text: messageText
//     }).then(() => {
//         console.log("Message sent successfully");
//     }).catch((error) => {
//         console.error("Error sending message:", error);
//     });

//     messageInput.value = '';  // Clear input field
// }





const firebaseConfig = {
    apiKey: "AIzaSyDLtWbefGSAd8ACZxnHJxF7wLgrkXEvkEs",
    authDomain: "chat-app-d9289.firebaseapp.com",
    databaseURL: "https://chat-app-d9289-default-rtdb.firebaseio.com",
    projectId: "chat-app-d9289",
    storageBucket: "chat-app-d9289.appspot.com",
    messagingSenderId: "910151259608",
    appId: "1:910151259608:web:b752216bbef028090f8ead",
    measurementId: "G-EKHNKSYT0J"
  };

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();


// Declare global variables at the top
let senderEmail = '';
let receiverEmail = '';
let chatRef = null;  // Initialize chatRef to null initially

// Login function
function login() {
    // Get email addresses from input fields
    senderEmail = document.getElementById('senderEmail').value;
    receiverEmail = document.getElementById('receiverEmail').value;

    // Validate email addresses
    if (!senderEmail || !receiverEmail) {
        alert("Please enter both sender and receiver email addresses.");
        return;
    }

    // Generate a unique chat key based on the two email addresses
    const chatKey = generateChatKey(senderEmail, receiverEmail);
    chatRef = db.ref('chats/' + chatKey);  // Initialize chatRef

    console.log("Chat reference initialized:", chatRef.toString());

    // Load previous messages
    loadMessages();

    // Switch to the chat window after login
    document.querySelector('.login-form').style.display = 'none';
    document.querySelector('.chat-window').style.display = 'block';
}

// Send message function
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();

    // Check if chatRef is initialized (i.e., user has logged in)
    if (!chatRef) {
        console.error("Error: chatRef is not initialized. You must log in first.");
        alert("You must log in first!");
        return;
    }

    if (!messageText) {
        alert("Please enter a message.");
        return;
    }

    console.log("Sending message:", messageText);

    // Push message to Firebase
    chatRef.push({
        sender: senderEmail,
        text: messageText
    }).then(() => {
        console.log("Message sent successfully");
    }).catch((error) => {
        console.error("Error sending message:", error);
    });

    messageInput.value = '';  // Clear input field after sending
}

// Generate a unique chat key based on the sender and receiver email
function generateChatKey(sender, receiver) {
    return sender.replace('.', '_') + '_' + receiver.replace('.', '_');
}

// Load messages from Firebase when the chat window is loaded
function loadMessages() {
    chatRef.on('child_added', function(snapshot) {
        const message = snapshot.val();
        displayMessage(message.sender, message.text);
    });
}

// Display a message in the chat window
function displayMessage(sender, text) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message');

    const messageSender = document.createElement('strong');
    messageSender.textContent = sender + ": ";
    const messageText = document.createElement('span');
    messageText.textContent = text;

    messageContainer.appendChild(messageSender);
    messageContainer.appendChild(messageText);

    document.querySelector('.messages').appendChild(messageContainer);
}

// Attach the login function to the button's click event
document.getElementById('loginButton').addEventListener('click', login);



window.onload = function () {
  // Thunkable Web Viewer Extension function to receive messages from Thunkable app
  window.ThunkableWebviewerExtension = function (value) {
    if (value.trim() == "") {
      window.location.reload();
      return;
    }
    me = value;

    document
      .querySelector(".message-input")
      .addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          firebase
            .database()
            .ref("chats/example1@gmail_example2@gmail/Texts")
            .push({
              user: me,
              msg: document
                .querySelector(".message-input")
                .value.trim()
                .replace(/</g, "&lt;"),
            });
          document.querySelector(".message-input").value = "";
        }
      });

    var id = "";
    firebase
      .database()
      .ref("chats/example1@gmail_example2@gmail/Texts")
      .on("child_added", (s) => {
        document.querySelector(".loader").style.opacity = "0";
        if (s.val().user === me) {
          if (id !== s.val().user)
            document.querySelector(".message-body").innerHTML +=
              '<div class="my-name">You</div><div class="message-holder"><div class="my-text" onclick="deleteMsg(\'' +
              s.key +
              "')\" id=" +
              s.key +
              " >" +
              s.val().msg +
              "</div></div>";
          else
            document.querySelector(".message-body").innerHTML +=
              '<div class="message-holder"><div class="my-text" onclick="deleteMsg(\'' +
              s.key +
              "')\" id=" +
              s.key +
              ">" +
              s.val().msg +
              "</div></div>";
        } else {
          if (id !== s.val().user)
            document.querySelector(".message-body").innerHTML +=
              '<div class="their-name">' +
              s.val().user +
              '</div><div class="message-holder"><div class="their-text" id=' +
              s.key +
              ">" +
              s.val().msg +
              "</div></div>";
          else
            document.querySelector(".message-body").innerHTML +=
              '<div class="message-holder"><div class="their-text" id=' +
              s.key +
              ">" +
              s.val().msg +
              "</div></div>";
        }
        document.querySelector(".message-body").scrollBy(0, 1000);
        id = s.val().user;

        firebase
          .database()
          .ref("chats/example1@gmail_example2@gmail/Texts/" + s.key)
          .on("child_changed", (a) => {
            document.querySelector("#" + s.key).innerHTML =
              "<i>Message Erased</i>";
          });
      });
  };

  // Default prompt for email input if not received from Thunkable
  swal({
    text: "Enter your email?",
    content: "input",
    button: {
      text: "Go!",
      closeModal: true,
    },
    allowOutsideClick: false,
    closeOnClickOutside: false,
  }).then((value) => {
    if (value) {
      window.ThunkableWebviewerExtension(value);
    }
  });

  document.querySelector(".swal-content__input").placeholder = "e.g. John Doe";
};
