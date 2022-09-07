/* eslint-disable @next/next/no-img-element */
import Script from 'next/script';
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query';
import axios from "axios";
import Modal from './Modal'
import dynamic from 'next/dynamic';
import Image from 'next/future/image';

const ToastComp = dynamic(() => import('../components/Toast'), {
    ssr: false
})

const VercelTest = () => {
    const [inputValue, setInputValue] = useState("")
    const [featuredCafe, setFeaturedCafe] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [open, setOpen] = useState(false)

    function initService() {
        const options = { types: ["cafe"] }
        const input = document.getElementById("pac-input");
        const autocomplete = new google.maps.places.Autocomplete(input, options);
        autocomplete.addListener('place_changed', () => {
            setFeaturedCafe(autocomplete.getPlace())
            setInputValue("")
        });
    }

    if (typeof window !== 'undefined') {
        window.initService = initService;
    }
    console.log(featuredCafe?.photos[0].getUrl());
    return (
        <div className='px-2 md:px-4'>
            {/* <Script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NODE_ENV == "development" ? process.env.NEXT_PUBLIC_GOOGLE_API_LOCAL : process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&callback=initService&libraries=places`} /> */}
            <p className='font-bold text-2xl'>Image on left is using autocomplete getUrl function, <br></br>image on right is using photo reference</p>
            <div className='flex space-x-4'>
                <Image
                    width={200}
                    height={200}
                    src={`https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAeJbb3eosTShk1CJ53gaoM416YX0EayZuQ1vTjHMHHO1Uh82_tZBAJJ4UfHaQRi4yqAxHr_b_s3NY8U3yOeBXUDXRK_IvIZaxrSy9QtN9146OZxpUMSItI5CR1hGp8_AqjCran107qkUdF35gbtsBqpGHPT2kxakImEoFpye4f1tecE-Lcfl&3u3024&5m1&2e1&callback=none&key=${process.env.NODE_ENV == "development" ? process.env.NEXT_PUBLIC_GOOGLE_API_LOCAL : process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&token=9798`}
                />
                <Image
                    width={200}
                    height={200}
                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=3024&maxheight=4032&photo_reference=AeJbb3cMXpNuZqQDfHImUW_6pPv-h7A-KX1P51-B0CN6N-l4I5p8sPDLf24ehk2MK0d1DneTSBE1weLPnoijagFwDeQV18jDsJpnZXpWN2HLUNbeIAYdmW6QAH7NlgyYIKbw1JMv2Mkqi-8-S50UeX99wKNjVOed0wFBszl4u8boldgLQst-&key=${process.env.NODE_ENV == "development" ? process.env.NEXT_PUBLIC_GOOGLE_API_LOCAL : process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
                />
            </div>
        </div>
    )
}

export default VercelTest