import Image from "next/image";

export default function Home() {
  return (
    const [phoneNumbers, setPhoneNumbers] = useState([]);
    const [message, setMessage] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [inputPhoneNumber, setInputPhoneNumber] = useState('');
    const [inputMessage, setInputMessage] = useState('');
  
    const createWhatsAppLink = (message, phoneNumber) => {
      const baseUrl = "https://api.whatsapp.com/send/?phone=";
      const encodedMessage = encodeURIComponent(message); // Encode the message for URL
      return `${baseUrl}${phoneNumber}&text=${encodedMessage}`;
    };
  
    const handleSendMessage = () => {
      if (currentIndex < phoneNumbers.length) {
        const link = createWhatsAppLink(message, phoneNumbers[currentIndex]);
        window.open(link, "_blank"); // Open the link in a new tab
        setCurrentIndex(currentIndex + 1); // Move to the next phone number
      } else {
        alert("All messages have been sent!"); // Alert when all messages are sent
        setCurrentIndex(0); // Reset index if you want to start over
      }
    };
  
    const handleAddPhoneNumber = () => {
      if (inputPhoneNumber) {
        setPhoneNumbers([...phoneNumbers, inputPhoneNumber]);
        setInputPhoneNumber('');
      }
    };
  
    const handleAddMessage = () => {
      if (inputMessage) {
        setMessage(inputMessage);
        setInputMessage('');
      }
    };
  
    return (
      <div>
        <h1>Send WhatsApp Messages</h1>
        
        {/* Input for phone number */}
        <div>
          <input
            type="text"
            value={inputPhoneNumber}
            onChange={(e) => setInputPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
          />
          <button onClick={handleAddPhoneNumber}>Add Phone Number</button>
        </div>
        
        {/* Input for custom message */}
        <div>
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Enter custom message"
          />
          <button onClick={handleAddMessage}>Set Message</button>
        </div>
  
        {/* Displaying the list of added phone numbers */}
        <div>
          <h2>Phone Numbers</h2>
          <ul>
            {phoneNumbers.map((phone, index) => (
              <li key={index}>{phone}</li>
            ))}
          </ul>
        </div>
  
        {/* Button to send the next message */}
        <button onClick={handleSendMessage}>Send Next Message</button>
      </div>
    );
  );
}
