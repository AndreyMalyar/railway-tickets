// trainData.ts
type TrainClass = {
    type: string;
    status: "Avl" | "WL";
    available: string;
    price: number;
}

export type TrainStation = {
    time: string;
    station: string;
    date: string;
}

export type Train = {
    id: number;
    number: string;
    name: string;
    runsOn: string;
    departure: TrainStation;
    arrival: TrainStation;
    duration: string;
    classes: TrainClass[];
}

const createMockTrains = (
    departure: string,
    arrival: string,
    departureDate: string,
    returnDate: string
): Train[] => [
    {
        id: 1,
        number: "22426",
        name: "VANDE BHARAT",
        runsOn: "Everyday",
        departure: {
            time: "11:25 pm",
            station: departure || "New Delhi - NDLS", // fallback для верстки
            date: departureDate || "Nov 16"
        },
        arrival: {
            time: "7:25 am",
            station: arrival || "Lucknow - LJN",
            date: returnDate || "Nov 17"
        },
        duration: "8 hours",
        classes: [
            { type: "3A", status: "Avl", available: "046", price: 900 },
            { type: "2A", status: "Avl", available: "006", price: 1000 },
            { type: "1A", status: "WL", available: "36", price: 1200 }
        ]
    },
    {
        id: 2,
        number: "22412",
        name: "ARUNACHAL EXP",
        runsOn: "Everyday",
        departure: {
            time: "11:45 pm",
            station: departure || "New Delhi - NDLS",
            date: departureDate || "Nov 16"
        },
        arrival: {
            time: "7:45 am",
            station: arrival || "Lucknow - LJN",
            date: returnDate || "Nov 17"
        },
        duration: "8 hours",
        classes: [
            { type: "3A", status: "Avl",  available: "446", price: 800 },
            { type: "2A", status: "Avl", available: "166", price: 1000 },
            { type: "1A", status: "WL", available: "6", price: 1400 }
        ]
    },
    {
        id: 3,
        number: "12572",
        name: "SHATABDI EXPRESS",
        runsOn: "Everyday",
        departure: {
            time: "11:50 pm",
            station: departure || "New Delhi - NDLS",
            date: departureDate || "Nov 16"
        },
        arrival: {
            time: "9:50 am",
            station: arrival || "Lucknow - LJN",
            date: returnDate || "Nov 17"
        },
        duration: "10 hours",
        classes: [
            { type: "3A", status: "Avl", available: "446", price: 800 },
            { type: "2A", status: "Avl", available: "166", price: 1000 }
        ]
    }
];

export default createMockTrains;