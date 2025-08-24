import Search from "./features/Search"
const App = ()=>{
  return <div className="text-3xl font-bold bg-[#f8f8f8] ">
       <header className="bg-white text-center p-4 shadow-sm flex items-center justify-between gap-4 px-12 font-gills ">
          <div className="flex items-center gap-4">
          <a href="/" className="text-2xl font-semibold text-blue-600">
            <img src="https://yayawallet.com/images/logo.svg" alt="YayaWallet Logo" className="h-12 inline-block mr-2" />
          </a>
            <div>
              <Search />
          </div>
          </div>
         
          {/* <h2 className="font-Roboto text-[#0d2f88] text-md ">YaYa Wallet Transaction Dashboard</h2> */}
        
       </header>
  </div>
}
export default App