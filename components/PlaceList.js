import { useQuery } from "react-query";

const PlaceList = () => {
    const { isLoading, error, data } = useQuery(['repoData'], () =>
        fetch('/api/users').then(res =>
            res.json()
        )
    )

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <div>
            {data.map((cafe, index) => (
                <div key={index}>
                    <p>{cafe.id}</p>
                    <p>{cafe.title}</p>
                </div>
            ))}
        </div>
    )

}



export default PlaceList;
