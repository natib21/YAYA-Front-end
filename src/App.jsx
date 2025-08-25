import { useState ,useCallback} from "react";
import Header from "./pages/header/Header";
import Transaction from "./pages/transaction/Transaction";
const App = ()=>{
  const [searchResults, setSearchResults] = useState([]);
  const [searchDetails, setSearchDetails] = useState([]); 
  const handleSearchResults = useCallback((data) => {
    setSearchResults(data);
  }, []);

   const handleDetailClick = useCallback((transaction) => {
    setSearchDetails([transaction]);
    setSearchResults([]); 
  }, []);
  const handleDeleteRMV =()=>{
    setSearchDetails([]);
   }
 console.log(searchResults.data)
  return <div className="text-3xl font-bold bg-[#f8f8f8] ">
          <Header handleSearchResults={handleSearchResults} 
                  handleDetailClick={handleDetailClick}
                  searchResults={searchResults}
                   />
         <main className="container mx-auto p-4">
         <Transaction searchDetails={searchDetails} 
                      handleDeleteRMV={handleDeleteRMV} 
                       />
      </main> 
  </div>
}
export default App