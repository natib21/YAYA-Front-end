import Search from "./features/Search"
import { useState ,useCallback} from "react";
import TransactionSearch from "./pages/TransactionSearch";
const App = ()=>{
  const [searchResults, setSearchResults] = useState([]);
  const [searchDetails, setSearchDetails] = useState([]); 
  const handleSearchResults = useCallback((data) => {
    setSearchResults(data);
  }, []);

   const handleDetailClick = useCallback((transaction) => {
    setSearchDetails([transaction]);
    setSearchResults([]); // Hide the dropdown after a result is clicked
  }, []);
 console.log(searchResults.data)
  return <div className="text-3xl font-bold bg-[#f8f8f8] ">
       <header className="bg-white text-center p-4 shadow-sm flex items-center justify-between gap-4 px-12 font-gills ">
          <div className="flex items-center gap-8">
            <a href="/" className="text-2xl font-semibold text-blue-600">
              <img src="https://yayawallet.com/images/logo.svg" alt="YayaWallet Logo" className="h-12 inline-block mr-2" />
            </a>
            <div className="relative w-full">
              <Search onSearchResults={handleSearchResults}/>
              <div className="absolute top-full left-0 w-full mt-1 bg-white  border-gray-300 rounded-md shadow-lg z-10 p-2 max-h-60 overflow-y-auto">
                {searchResults?.data?.length > 0 && (
                 <div >
                  {searchResults?.data?.map((result, index) => (
                    <div onClick={() => handleDetailClick(result)} key={index} className="text-left text-sm text-gray-600 mt-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
                      {result.ID} - {result.Sender} to {result.Receiver}
                    </div>
                ))}
                </div>
                )}
              </div>
            </div>
          </div>
         
          <h2 className="font-Roboto text-[#0d2f88] text-[16px] ">YaYa Wallet Transaction Dashboard <br />
            <p className="text-black font-light font-Roboto text-sm"> Developed by Nathnael Zelalem</p> 
          </h2>
        
       </header>
         <main className="container mx-auto p-4">
         {searchDetails.length > 0  ? (
          <TransactionSearch transaction={searchDetails} />
        ) : (
          <div className="text-center text-gray-500 mt-12 font-Roboto">
            <p className="text-xl">Start typing to search for transactions.</p>
            <p className="text-sm mt-2">
              <span className="font-semibold">Note:</span> Click on a search result to view details.
            </p>
          </div>
        )}
        
      </main> 
  </div>
}
export default App