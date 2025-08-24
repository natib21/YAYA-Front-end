import Search from "./features/Search"
import { useState ,useCallback} from "react";
const App = ()=>{
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = useCallback((data) => {
    setSearchResults(data);
  }, []);
 console.log(searchResults.data)
  return <div className="text-3xl font-bold bg-[#f8f8f8] ">
       <header className="bg-white text-center p-4 shadow-sm flex items-center justify-between gap-4 px-12 font-gills ">
          <div className="flex items-center gap-8">
            <a href="/" className="text-2xl font-semibold text-blue-600">
              <img src="https://yayawallet.com/images/logo.svg" alt="YayaWallet Logo" className="h-12 inline-block mr-2" />
            </a>
            <div>
              <Search onSearchResults={handleSearchResults}/>
            </div>
          </div>
         
          <h2 className="font-Roboto text-[#0d2f88] text-[16px] ">YaYa Wallet Transaction Dashboard <br />
            <p className="text-black font-light font-Roboto text-sm"> Developed by Nathnael Zelalem</p> 
          </h2>
        
       </header>
        <main className="container mx-auto p-4">
        {searchResults?.data?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults?.data?.map((transaction) => (
              <div 
                key={transaction.id} 
                className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 transition-transform transform hover:scale-105"
              >
                <div className="font-bold text-lg text-gray-800">
                  Transaction ID: <span className="font-normal">{transaction.Id}</span>
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  Sender: <span className="font-medium">{transaction.Sender}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Recipient: <span className="font-medium">{transaction.recipient}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Amount: <span className="font-medium text-blue-500">{transaction.amount}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-12 font-Roboto">
            <p className="text-xl">Start typing to search for transactions.</p>
            <p className="text-sm mt-2">
              <span className="font-semibold">Note:</span> Search by name, transaction ID, or sender.
            </p>
          </div>
        )}
      </main>
  </div>
}
export default App