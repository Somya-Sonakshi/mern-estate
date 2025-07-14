import React,{useEffect, useState} from "react";
import { useNavigate ,useLocation} from "react-router-dom";
import ListingItem from "../components/ListingItem";
export default function Search(){
    const [sidebardata,setSidebardata] = useState({
        searchTerm:'',
        type:'all',
        parking:false,
        furnished:false,
        offer:false,
        sort:'created_at',
        order:'desc'
    })
    const location = useLocation()
    const navigate = useNavigate()
    const [listings,setListing] = useState([]);
    const [loading,setLoading] = useState(false);
    const [showMore,setShowMore] = useState(false) 
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search)
        const searchTermFromUrl = urlParams.get('searchTerm')
        const typeFromUrl = urlParams.get('type')
        const parkingFromUrl = urlParams.get('parking')
        const furnishedFromUrl = urlParams.get('furnished')        
        const offerFromUrl = urlParams.get('offer')        
        const sortFromUrl = urlParams.get('sort')        
        const orderFromUrl = urlParams.get('order') 
        if(searchTermFromUrl||
            typeFromUrl||
            parkingFromUrl||
            furnishedFromUrl||
            offerFromUrl||
            sortFromUrl||
            orderFromUrl
        ){
            setSidebardata({
              searchTerm: searchTermFromUrl || '',
              type: typeFromUrl || 'all',
              parking: parkingFromUrl === 'true',
              furnished: furnishedFromUrl === 'true',
              offer: offerFromUrl === 'true',
              sort: sortFromUrl || 'created_at',
              order: orderFromUrl || 'desc',
            })
        }
 
     const fetchListing = async()=>{
        setLoading(true);
        setShowMore(false);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`)
        const data = await res.json();
        if(data.length>8){
          setShowMore(true)
        }
        else{
          setShowMore(false)
        }
        setListing(data);
        setLoading(false);
     }
     fetchListing()
    },[location.search])

    const handleChange = (e) => {
      const { id, type, checked, value } = e.target;
      if (id === "searchTerm") {
        setSidebardata((prev) => ({ ...prev, searchTerm: value }));
      }
       if (id === "all" || id === "rent" || id === "sale") {
        setSidebardata((prev) => ({ ...prev, type: value }));
      }
       if (id === "parking" || id === "furnished" || id === "offer") {
        setSidebardata((prev) => ({ ...prev, [id]: checked }));
      }
      if(e.target.id==="sort_order"){
        const sort = e.target.value.split('_')[0]||'created_at';
        const order = e.target.value.split('_')[1]||'desc'
        setSidebardata({...sidebardata,sort,order})
      }
    };
    const handleSubmit = (e)=>{
        e.preventDefault()
        const urlParams = new URLSearchParams(location.search)
        urlParams.set('searchTerm',sidebardata.searchTerm)
        urlParams.set('type',sidebardata.type)
        urlParams.set('parking',sidebardata.parking)
        urlParams.set('furnished',sidebardata.furnished)
        urlParams.set('offer',sidebardata.offer)
        urlParams.set('sort',sidebardata.sort)
        urlParams.set('order',sidebardata.order)
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)
    }
    const onShowMoreClick = async()=>{
      const numberOfListings = listings.length;
      const startIndex = numberOfListings;
      const urlParams = new URLSearchParams(location.search)
      urlParams.set('startIndex',startIndex);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`)
      const data = await res.json();
      if(data.length<9){
        setShowMore(false);
      }
      setListing([...listings,...data]);
    }
    return(
    <div className="flex flex-col md:flex-row">
       <div className="p-7  md:min-h-screen md:w-72  rounded-lg flex flex-col gap-8 mt-6 ml-4">
        <form onSubmit={handleSubmit} action="" className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="font-semibold whitespace-nowrap">Search Term : </label>
            <input type="text"
            id="searchTerm"
            placeholder="Search..."
            className="border rounded-lg p-3 w-full cursor-pointer"
            value={sidebardata.searchTerm}
            onChange={handleChange}/>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <label className="font-semibold mb-1">Type:</label>
            <div className="flex flex-col gap-2 ml-2 md:ml-4 gap-2 md:gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" id="all"
                  name="type"
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebardata.type === 'all'}
                  value="all"
                />
                <span>Rent & Sale</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" id="rent"
                  name="type"
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebardata.type === 'rent'}
                  value="rent"
                />
                <span>Rent</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" id="sale"
                  name="type"
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebardata.type === 'sale'}
                  value="sale"
                />
                <span>Sale</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" id="offer"
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebardata.offer}/>
                <span>Offer</span>
              </label>
            </div>
          </div>
          {/* Amenities section styled vertically */}
          <div className="flex flex-col gap-2 mt-2">
            <label className="font-semibold mb-1">Amenities:</label>
            <div className="flex flex-col gap-2 ml-2 md:ml-4 gap-2 md:gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" id="parking"
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebardata.parking}/>
                <span>Parking Lot</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" id="furnished"
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebardata.furnished}/>
                <span>Furnished</span>
              </label>
            </div>
          </div>
          <div className="">
            <label className="font-semibold" htmlFor="">Sort: {' '}</label>
            <select onChange={handleChange}
            defaultValue={'created_at_desc'} 
            id="sort_order"
            className="font-semibold border rounded-lg p-4">
                <option value="regularPrice_desc">Price high to low</option>
                <option value="regularPrice_asc">Price low to high</option>
                <option value="createdAt_asc">Latest</option>
                <option value="createdAt_desc">Oldest</option>
            </select>
          </div>
          <button className="cursor-pointer bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
       </div>
       <div className="flex-1  min-h-screen p-6">
         <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-3">Listing results:</h1>
         <div className="p-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-x-8 lg:gap-y-8">
          {!loading&&listings.length===0&& 
          <p className="text-xl text-slate-700">
            No listing Found!
          </p>}
          {
            loading&&(
              <p className="text-xl text-slate-700 text-center w-full">Loading...</p>
            )
          }
          {
            !loading&&listings&&listings.map((listing)=>(
              <ListingItem key={listing._id} listing={listing}/>
            ))
          }
          {showMore&&
          <button
            className="cursor-pointer col-span-full text-green-700 hover:underline p-4 rounded text-center"
            onClick={onShowMoreClick}
          >
            Show more
          </button>}
         </div>
       </div>
    </div>
    )
}