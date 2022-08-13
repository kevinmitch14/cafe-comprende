import { LocationMarkerIcon } from "@heroicons/react/outline"

const Filters = ({ setFilters, setFilterString, triggerGeoLocation }) => {
    return (
        <div className='flex items justify-between px-4 pt-2 gap-x-2'>
            <input type="text" placeholder='Search' className='border rounded-md pl-2 flex-grow' onChange={(e) => setFilterString(e.target.value)}></input>
            <select className="border py-1.5 rounded-md px-2" onChange={(e) => setFilters(e.target.value)}>
                <option value="recentlyAdded">Recently Added</option>
                <option value="rating">Rating</option>
                <option value="popularity">Popularity</option>
                <option value="distance">Distance</option>
            </select>
            <LocationMarkerIcon className="h-8 w-8 border border-gray-300 text-gray-800 hover:bg-gray-100 hover:cursor-pointer rounded-lg p-1"
                onClick={() => triggerGeoLocation()}
            // onClick={() => setFilters('distance')}
            />
        </div>
    )
}

export default Filters