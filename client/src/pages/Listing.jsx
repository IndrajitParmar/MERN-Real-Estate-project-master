import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from "../component/Contact";

function Listing() {
  SwiperCore.use([Navigation]);
  const { currentUser } = useSelector((state) => state.user);
  const params = useParams();
  const listid = params.id;
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${listid}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [listid]);
  return (
    <main>
      {loading && <p className="text-center mt-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center mt-7 text-2xl">Something went wrong</p>
      )}
      {listing && !error && !loading && (
        <>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[450px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className="fixed z-10 top-[13%] right-[3%] bg-slate-100 border rounded-full w-12 h-12 flex justify-center items-center cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 1000);
            }}>
            <FaShare className="text-slate-500" />
          </div>
          {copied && (
            <p className="fixed z-10 top-[23%] right-[5%] rounded-md bg-slate-100 p-2">
              {" "}
              Link Copied!!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} - &#8377;
              {listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && "/month"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  &#8377;{listing.discountPrice} OFF
                </p>
              )}
            </div>
            <p className="text-slate-800 ">
              <span className="font-semibold text-black"> Description - </span>
              {listing.description}
            </p>
            <ul className="flex items-center gap-4 sm:gap-6 text-green-700 font-semibold text-sm">
              <li className="flex items-center whitespace-nowrap  gap-1 ">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} Beds`
                  : `${listing.bedrooms} Bed`}
              </li>
              <li className="flex items-center whitespace-nowrap gap-1 ">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Bathrooms`
                  : `${listing.bathrooms} Bath`}
              </li>
              <li className="flex items-center whitespace-nowrap  gap-1 ">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking Available" : "No Parking"}
              </li>
              <li className="flex items-center whitespace-nowrap  gap-1 ">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "Not Furnished"}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3">
                Contact Landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </>
      )}
    </main>
  );
}

export default Listing;
