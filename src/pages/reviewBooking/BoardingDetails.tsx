import RouteInfo from "../../components/RouteInfo.tsx";




const departure = {
    time: "11:25 pm",
    station: 'New Delhi - NDLS',
    date: "Nov 16"
}
const arrival = {
    time: "7:25 am",
    station: 'Lucknow - LJN',
    date: "Nov 17"
}

function BoardingDetails (){
    return (
        <div className="review">
            <h3 className="review__title">Boarding Details</h3>
            <p className="">22426 - VANDE BHARAT<span>Class 2A & Tatkal Quota</span></p>
            {<RouteInfo departure={departure} arrival={arrival} duration={"8 hours"}/>}
        </div>
    )
}

export default BoardingDetails