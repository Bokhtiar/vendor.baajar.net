
import DataTable from "react-data-table-component";

// Sample Data
const data = [
  {
    id: 1,
    image: "./image/logo/flagbd.jpg",
    name: "Patimax Fragrance Long...",
    items: "100 Items",
    coupon: "Sflat",
    flag: "https://flagcdn.com/w40/es.png",
  },
  {
    id: 2,
    image: "./image/logo/flagbd.jpg",
    name: "Nulo MedalSeries Adult Cat...",
    items: "100 Items",
    coupon: "Sflat",
    flag: "https://flagcdn.com/w40/de.png",
  },
  {
    id: 3,
    image: "./image/logo/flagbd.jpg",
    name: "Pedigree Puppy Dry Dog...",
    items: "100 Items",
    coupon: "Sflat",
    flag: "https://flagcdn.com/w40/gb.png",
  },
  {
    id: 4,
    image: "./image/logo/flagbd.jpg",
    name: "Biscoito Premier Cookie...",
    items: "100 Items",
    coupon: "Sflat",
    flag: "https://flagcdn.com/w40/br.png",
  },
  {
    id: 5,
    image: "./image/logo/flagbd.jpg",
    name: "Pedigree Adult Dry Dog...",
    items: "100 Items",
    coupon: "Sflat",
    flag: "https://flagcdn.com/w40/fr.png",
  },
];

// Table Columns
const columns = [
  {
    name: "Product",
    selector: (row) => row.name,
    cell: (row) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-md  flex items-center justify-center">
          <img
            src={row.image}
            alt="product"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div>
          <p className="text-sm font-semibold ">{row.name}</p>
          <p className="text-xs ">
            {row.items}
          </p>
        </div>
      </div>
    ),
    grow: 2,
  },
  {
    name: "Coupon Code",
    selector: (row) => row.coupon,
    cell: (row) => (
      <span className="text-sm font-semibold ">
        {row.coupon}
      </span>
    ),
    center: true,
  },
  {
    name: "Country",
    selector: (row) => row.flag,
    cell: (row) => (
      <img src={row.flag} alt="flag" className="w-5 h-5 rounded-full" />
    ),
    center: true,
  },
  {
    name: "Price",
    selector: () => "-",
    center: true,
  },
];

// createTheme("lightTheme", {
//   text: { primary: "#000", secondary: "#555" },
//   background: { default: "#ffffff" },
//   divider: { default: "#ddd" },
// });

// createTheme("darkTheme", {
//   text: { primary: "#ffffff", secondary: "#bbb" },
//   background: { default: "#9CA3AF" },
//   divider: { default: "#444" },
// });

const ShowTable = () => {
//   const [theme, setTheme] = useState("light");
//   console.log("theme",theme)
//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme") || "light";
//     setTheme(savedTheme);
//     document.documentElement.classList.toggle("dark", savedTheme === "dark");
//   }, []);
  return (
    <div className="p-5 rounded-lg shadow-md text-lightTitle dark:text-darkTitle bg-lightCard dark:bg-dark">
      <div className="flex justify-between items-center mb-4 ">
        <h2 className="text-lg font-bold ">Top Products</h2>
        <a
          href="#"
          className="text-sm "
        >
          View all
        </a>
      </div>
      <DataTable
        columns={columns}
        data={data}
        responsive
        highlightOnHover
        className="rdt_Table"
        // theme={theme === "dark" ? "darkTheme" : "lightTheme"}
      />
    </div>
  );
};

export default ShowTable;
