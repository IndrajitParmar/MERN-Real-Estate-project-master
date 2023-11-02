import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

function ListingItems({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="img"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="text-lg text-slate-700 truncate font-bold">
            {listing.name}
          </p>
          <div className="flex items-center gap-2  w-full">
            <MdLocationOn className="text-green-700 h-4 w-4" />
            <p className="text-gray-600 text-sm truncate">{listing.address}</p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <p className="text-slate-500 mt-2 font-semibold">
            &#8377;
            {listing.offer
              ? (listing.regularPrice - listing.discountPrice).toLocaleString(
                  "en-us"
                )
              : listing.regularPrice.toLocaleString("en-us")}
            {listing.type === "rent" && " / rent"}
          </p>
          <div className=" font-bold text-sm text-slate-700 flex items-center gap-4">
            <div>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds`
                : `${listing.bedrooms} bed`}
            </div>
            <div>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} bathrooms`
                : `${listing.bathrooms} bathroom`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ListingItems;
