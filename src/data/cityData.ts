

type City = {
    id: number;
    name: string;
    code: string;
}

export default [
    { id: 1, name: "New Delhi", code: "NDLS" },
    { id: 2, name: "Delhi", code: "DLI" },
    { id: 3, name: "Lucknow", code: "LJN" },
    { id: 4, name: "Mumbai", code: "CSTM" },
    { id: 5, name: "Bangalore", code: "SBC" },
    { id: 6, name: "Chennai", code: "MAS" },
    { id: 7, name: "Kolkata", code: "KOAA" },
    { id: 8, name: "Pune", code: "PUNE" },
    { id: 9, name: "Hyderabad", code: "HYB" },
    { id: 10, name: "Ahmedabad", code: "ADI" }
] satisfies City[]