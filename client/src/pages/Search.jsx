import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItems from "../component/ListingItems";

function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sell"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]: e.target.checked,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  useEffect(() => {
    const url = new URLSearchParams(location.search);
    const searchTermFromUrl = url.get("searchTerm");
    const typeFromUrl = url.get("type");
    const offerFromUrl = url.get("offer");
    const furnishedFromUrl = url.get("furnished");
    const parkingFromUrl = url.get("parking");
    const sortFromUrl = url.get("sort");
    const orderFromUrl = url.get("order");
    if (
      searchTermFromUrl ||
      typeFromUrl ||
      offerFromUrl ||
      furnishedFromUrl ||
      parkingFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || " ",
        type: typeFromUrl || "all",
        offer: offerFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        parking: parkingFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = url.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 2) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };
    fetchListings();
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = new URLSearchParams();
    url.set("searchTerm", sidebardata.searchTerm);
    url.set("type", sidebardata.type);
    url.set("offer", sidebardata.offer);
    url.set("furnished", sidebardata.furnished);
    url.set("parking", sidebardata.parking);
    url.set("sort", sidebardata.sort);
    url.set("order", sidebardata.order);

    const searchQuery = url.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListinngs = listings.length;
    const startIndex = numberOfListinngs;
    const url = new URLSearchParams(location.search);
    url.set("startIndex", startIndex);
    const searchQuery = url.toString();
    const res = await fetch(`api/listing/get?${searchQuery}`);
    const data = await res.json();

    setListings([...listings, ...data]);
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7  border-b-2 md:border-r-2  md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Search:</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                checked={sidebardata.type === "all"}
                onChange={handleChange}
              />
              <span>Rent & Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sell"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "sell"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <span>Parking</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={"regularPrice_desc"}
              id="sort_order"
              className="border rounded-lg p-3 focus:outline-none">
              <option value={"regularPrice_desc"}>Price high to low</option>
              <option value={"regularPrice_asc"}>Price low to high</option>
              <option value={"createdAt_desc"}>Latest</option>
              <option value={"createdAt_asc"}>Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1 ">
        <h1 className="text-3xl font-semibold border-b-2 p-3 text-slate-700  mt-5 ">
          Listing results:
        </h1>
        <div className="p-4 flex flex-wrap gap-4">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700">No listing found</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItems key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button
              onClick={() => onShowMoreClick()}
              className="text-green-700 hover:underline p-7 w-full text-center">
              Show More...
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
