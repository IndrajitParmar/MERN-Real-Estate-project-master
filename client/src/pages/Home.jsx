import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import ListingItems from "../component/ListingItems";

export default function Home() {
  SwiperCore.use([Navigation]);
  const [offerListing, setOfferListing] = useState();
  const [salesListing, setSalesListing] = useState();
  const [rentListing, setRentListing] = useState();

  useEffect(() => {
    const fetchOfferListing = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListing(data);
        fetchRentListings();
        fetchSellListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListing(data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSellListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sell&limit=4");
        const data = await res.json();
        setSalesListing(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListing();
  }, []);
  return (
    <div>
      {/* //top side */}
      <div className="flex flex-col gap-6  p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-gray-400 text-xl sm:text-sm">
          Sky Estateis the best place to find your next perfect place to live{" "}
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline">
          Let's get started...
        </Link>
      </div>
      {/* // slider */}
      <Swiper navigation>
        {offerListing &&
          offerListing.length > 0 &&
          offerListing.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={listing._id}></div>
            </SwiperSlide>
          ))}
      </Swiper>
      {/* listing results for offer */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListing && offerListing.length > 0 && (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-600">
                Recent Offers
              </h2>
              <Link
                to={"/search?offer=true"}
                className="text-blue-500 hover:underline">
                Show more offers
              </Link>
            </div>
            <div className="flex gap-6 flex-wrap">
              {offerListing.map((listing) => (
                <ListingItems listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
      {/* listing results for rent */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {rentListing && rentListing.length > 0 && (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                to={"/search?type=rent"}
                className="text-blue-500 hover:underline">
                Show more offers
              </Link>
            </div>
            <div className="flex gap-6 flex-wrap">
              {rentListing.map((listing) => (
                <ListingItems listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
      {/* listing results for sell */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {salesListing && salesListing.length > 0 && (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-600">
                Recent places for sell
              </h2>
              <Link
                to={"/search?type=sell"}
                className="text-blue-500 hover:underline">
                Show more offers
              </Link>
            </div>
            <div className="flex gap-6 flex-wrap">
              {salesListing.map((listing) => (
                <ListingItems listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
