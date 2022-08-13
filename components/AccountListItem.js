import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import db from '../firebase'


const AccountListItem = ({ place }) => {
    const [cafe, setCafe] = useState(null)

    useEffect(() => {
        const handler = async () => {
            const docRef = doc(db, "cafes", place)
            const docSnap = await getDoc(docRef)
            setCafe(docSnap.data().data)
        }
        handler()
    }, [place])

    return (
        <div>
            <p>{cafe?.name}</p>
        </div>
    )
}

export default AccountListItem