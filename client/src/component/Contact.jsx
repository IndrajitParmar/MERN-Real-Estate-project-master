import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Contact({ listing }) {
  const [message, setMessage] = useState(null);
  const [landlord, setLandlord] = useState(null);

  useEffect(() => {
    const fetchlandlord = async (req, res) => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchlandlord();
  }, [listing.userRef]);

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };
  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.userName}</span>{" "}
            for <span className="font-semibold">{listing.name}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            placeholder="Type your message here"
            value={message}
            onChange={handleMessage}
            className="w-full border p-3 rounded-lg focus:outline-none"></textarea>
          <Link
            to={`mailto:${landlord.userEmail}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95">
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}

export default Contact;
