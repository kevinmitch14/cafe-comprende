import { useQuery } from "react-query";

const PlaceList = () => {
    const { isLoading, error, data } = useQuery(['cafes'], () =>
        fetch('/api/cafes').then(res =>
            res.json()
        )
    )

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <div className="divide-y">
            {data.map((cafe, index) => (
                <div key={index}>
                    <p>Name: {cafe.name}</p>
                    <p>Rating: {cafe.rating}/5</p>
                    <p>Location: {cafe.latitude}-{cafe.longitude}</p>
                </div>
            ))}
        </div>
    )

}



export default PlaceList;
