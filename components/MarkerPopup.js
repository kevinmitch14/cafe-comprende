import { Popup } from "react-map-gl"
import { useState } from "react"
import ExtraInfoModal from "../components/ExtraInfoModal"


const MarkerPopup = ({ popupInfo, setPopupInfo }) => {

    const [extraInfoModal, setExtraInfoModal] = useState(false)

    return (
        <Popup
            anchor="top"
            focusAfterOpen={false}
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
            className={"w-full"}
        >
            <p className="font-bold text-sm">{popupInfo.name}</p>
            <p>{(popupInfo.reviews.reduce((prev, current) => prev + current.rating, 0) / popupInfo.reviews.length).toFixed(2)}/5 -{' '}
                <span className="text-[10px]">{popupInfo.reviews.length} {popupInfo.reviews.length > 1 ? 'reviews' : 'review'}</span></p>
            <button className="text-blue-500 underline text-[10px] hover:cursor-pointer" onClick={() => setExtraInfoModal(true)}>More details</button>
            {extraInfoModal && <ExtraInfoModal popupInfo={popupInfo} extraInfoModal={extraInfoModal} setExtraInfoModal={setExtraInfoModal} />}
        </Popup>
    )
}

export default MarkerPopup