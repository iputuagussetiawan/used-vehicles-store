const carMakes = [
    { label: "Honda", value: "honda" },
    { label: "Toyota", value: "toyota" },
    { label: "Ford", value: "ford" },
    { label: "Chevrolet", value: "chevrolet" },
    { label: "BMW", value: "bmw" },
    { label: "Mercedes-Benz", value: "mercedes-benz" },
    { label: "Audi", value: "audi" },
    { label: "Hyundai", value: "hyundai" },
    { label: "Kia", value: "kia" },
    { label: "Volkswagen", value: "volkswagen" },
    { label: "Nissan", value: "nissan" },
    { label: "Mazda", value: "mazda" },
    { label: "Subaru", value: "subaru" },
    { label: "Lexus", value: "lexus" },
    { label: "Jaguar", value: "jaguar" },
    { label: "Land Rover", value: "land-rover" },
    { label: "Tesla", value: "tesla" },
    { label: "Volvo", value: "volvo" },
    { label: "Porsche", value: "porsche" },
    { label: "Mitsubishi", value: "mitsubishi" },
    { label: "Ferrari", value: "ferrari" },
    { label: "Lamborghini", value: "lamborghini" },
    { label: "Aston Martin", value: "aston-martin" },
    { label: "Bentley", value: "bentley" },
    { label: "Bugatti", value: "bugatti" },
];

const bikeMakes = [
    { label: "Yamaha", value: "yamaha" },
    { label: "Suzuki", value: "suzuki" },
    { label: "Kawasaki", value: "kawasaki" },
    { label: "Ducati", value: "ducati" },
    { label: "Harley-Davidson", value: "harley-davidson" },
    { label: "Royal Enfield", value: "royal-enfield" },
    { label: "Triumph", value: "triumph" },
    { label: "KTM", value: "ktm" },
    { label: "Indian", value: "indian" },
    { label: "Aprilia", value: "aprilia" },
    { label: "MV Agusta", value: "mv-agusta" },
    { label: "Benelli", value: "benelli" },
    { label: "Bajaj", value: "bajaj" },
    { label: "Hero", value: "hero" },
    { label: "TVS", value: "tvs" },
    { label: "Vespa", value: "vespa" },
    { label: "Husqvarna", value: "husqvarna" },
    { label: "Moto Guzzi", value: "moto-guzzi" },
    { label: "Cagiva", value: "cagiva" },
];

export const vehicleModels = [
    { label: "Civic", value: "civic" },
    { label: "Accord", value: "accord" },
    { label: "Corolla", value: "corolla" },
    { label: "Camry", value: "camry" },
    { label: "Mustang", value: "mustang" },
    { label: "F-150", value: "f-150" },
    { label: "Ranger", value: "ranger" },
    { label: "Altima", value: "altima" },
    { label: "Sentra", value: "sentra" },
    { label: "Pathfinder", value: "pathfinder" },
    { label: "Cherokee", value: "cherokee" },
    { label: "Wrangler", value: "wrangler" },
    { label: "Model 3", value: "model-3" },
    { label: "Model S", value: "model-s" },
    { label: "Model X", value: "model-x" },
    { label: "Model Y", value: "model-y" },
    { label: "RX", value: "rx" },
    { label: "NX", value: "nx" },
    { label: "CX-5", value: "cx-5" },
    { label: "CX-9", value: "cx-9" },
    { label: "CR-V", value: "cr-v" },
    { label: "Pilot", value: "pilot" },
    { label: "Rav4", value: "rav4" },
    { label: "Highlander", value: "highlander" },
    { label: "Outback", value: "outback" },
    { label: "Forester", value: "forester" },
    { label: "Impreza", value: "impreza" },
    { label: "3 Series", value: "3-series" },
    { label: "5 Series", value: "5-series" },
    { label: "C-Class", value: "c-class" },
    { label: "E-Class", value: "e-class" },
    { label: "Q5", value: "q5" },
    { label: "Q7", value: "q7" },
    { label: "X3", value: "x3" },
    { label: "X5", value: "x5" },
    { label: "Golf", value: "golf" },
    { label: "Jetta", value: "jetta" },
    { label: "Tiguan", value: "tiguan" },
    { label: "Atlas", value: "atlas" },
    { label: "Explorer", value: "explorer" },
    { label: "Edge", value: "edge" },
    { label: "Escape", value: "escape" },
    { label: "Bronco", value: "bronco" },
];

export const indiaStatesAndDistricts = [
    {
    state: "Tamil Nadu",
    districts: [
        { district: "Chennai", postalCodes: [600001, 600002, 600003] },
        { district: "Coimbatore", postalCodes: [641001, 641002, 641003] },
        { district: "Madurai", postalCodes: [625001, 625002, 625003] },
    ],
    },
    {
    state: "Maharashtra",
    districts: [
        { district: "Mumbai", postalCodes: [400001, 400002, 400003] },
        { district: "Pune", postalCodes: [411001, 411002, 411003] },
        { district: "Nagpur", postalCodes: [440001, 440002, 440003] },
    ],
    },
    {
    state: "Karnataka",
    districts: [
        { district: "Bengaluru", postalCodes: [560001, 560002, 560003] },
        { district: "Mysuru", postalCodes: [570001, 570002, 570003] },
        { district: "Mangaluru", postalCodes: [575001, 575002, 575003] },
    ],
    },
    {
    state: "Uttar Pradesh",
    districts: [
        { district: "Lucknow", postalCodes: [226001, 226002, 226003] },
        { district: "Kanpur", postalCodes: [208001, 208002, 208003] },
        { district: "Varanasi", postalCodes: [221001, 221002, 221003] },
    ],
    },
    {
    state: "West Bengal",
    districts: [
        { district: "Kolkata", postalCodes: [700001, 700002, 700003] },
        { district: "Howrah", postalCodes: [711101, 711102, 711103] },
        { district: "Darjeeling", postalCodes: [734101, 734102, 734103] },
    ],
    },
    {
    state: "Rajasthan",
    districts: [
        { district: "Jaipur", postalCodes: [302001, 302002, 302003] },
        { district: "Jodhpur", postalCodes: [342001, 342002, 342003] },
        { district: "Udaipur", postalCodes: [313001, 313002, 313003] },
    ],
    },
    {
    state: "Gujarat",
    districts: [
        { district: "Ahmedabad", postalCodes: [380001, 380002, 380003] },
        { district: "Surat", postalCodes: [395001, 395002, 395003] },
        { district: "Vadodara", postalCodes: [390001, 390002, 390003] },
    ],
    },
    {
    state: "Kerala",
    districts: [
        { district: "Thiruvananthapuram", postalCodes: [695001, 695002, 695003] },
        { district: "Kochi", postalCodes: [682001, 682002, 682003] },
        { district: "Kozhikode", postalCodes: [673001, 673002, 673003] },
    ],
    },
    {
    state: "Delhi",
    districts: [
        { district: "Central Delhi", postalCodes: [110001, 110002, 110003] },
        { district: "South Delhi", postalCodes: [110011, 110012, 110013] },
        { district: "North Delhi", postalCodes: [110006, 110007, 110008] },
    ],
    },
    {
    state: "Punjab",
    districts: [
        { district: "Amritsar", postalCodes: [143001, 143002, 143003] },
        { district: "Ludhiana", postalCodes: [141001, 141002, 141003] },
        { district: "Jalandhar", postalCodes: [144001, 144002, 144003] },
    ],
    },
];

export const indonesiaStatesAndDistricts = [
    {
        state: "Jawa Barat",
        districts: [
            { district: "Bandung", postalCodes: [401001, 401002, 401003] },
            { district: "Bogor", postalCodes: [161001, 161002, 161003] },
            { district: "Depok", postalCodes: [16411, 16412, 16413] },
        ],
    },
    {
        state: "Jawa Timur",
        districts: [
            { district: "Surabaya", postalCodes: [601001, 601002, 601003] },
            { district: "Malang", postalCodes: [65100, 65101, 65102] },
            { district: "Madiun", postalCodes: [63100, 63101, 63102] },
        ],
    },
    {
        state: "Bali",
        districts: [
            { district: "Denpasar", postalCodes: [80111, 80112, 80113] },
            { district: "Badung", postalCodes: [80361, 80362, 80363] },
            { district: "Gianyar", postalCodes: [80511, 80512, 80513] },
        ],
    },
    {
        state: "Sumatera Utara",
        districts: [
            { district: "Medan", postalCodes: [20111, 20112, 20113] },
            { district: "Binjai", postalCodes: [20711, 20712, 20713] },
            { district: "Pematang Siantar", postalCodes: [21111, 21112, 21113] },
        ],
    },
    {
        state: "Sulawesi Selatan",
        districts: [
            { district: "Makassar", postalCodes: [90111, 90112, 90113] },
            { district: "Parepare", postalCodes: [91111, 91112, 91113] },
            { district: "Maros", postalCodes: [90511, 90512, 90513] },
        ],
    },
    {
        state: "Yogyakarta",
        districts: [
            { district: "Yogyakarta", postalCodes: [55111, 55112, 55113] },
            { district: "Sleman", postalCodes: [55281, 55282, 55283] },
            { district: "Bantul", postalCodes: [55711, 55712, 55713] },
        ],
    },
    {
        state: "Jakarta",
        districts: [
            { district: "Central Jakarta", postalCodes: [10310, 10311, 10312] },
            { district: "South Jakarta", postalCodes: [12510, 12511, 12512] },
            { district: "North Jakarta", postalCodes: [14410, 14411, 14412] },
        ],
    },
    {
        state: "Kalimantan Timur",
        districts: [
            { district: "Samarinda", postalCodes: [75111, 75112, 75113] },
            { district: "Balikpapan", postalCodes: [76111, 76112, 76113] },
            { district: "Kutai Kartanegara", postalCodes: [75511, 75512, 75513] },
        ],
    },
    {
        state: "Lampung",
        districts: [
            { district: "Bandar Lampung", postalCodes: [35111, 35112, 35113] },
            { district: "Metro", postalCodes: [34111, 34112, 34113] },
            { district: "Tanggamus", postalCodes: [35311, 35312, 35313] },
        ],
    },
    {
        state: "Aceh",
        districts: [
            { district: "Banda Aceh", postalCodes: [23111, 23112, 23113] },
            { district: "Lhokseumawe", postalCodes: [24311, 24312, 24313] },
            { district: "Langsa", postalCodes: [24411, 24412, 24413] },
        ],
    },
];

  
  
  export const vehicleMakes = [...carMakes, ...bikeMakes];