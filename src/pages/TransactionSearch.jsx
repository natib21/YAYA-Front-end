const TransactionSearch = ({ transaction, handleDeleteRMV }) => {
   
  return <div>
           {transaction.map((transaction) => (
            <div  key={transaction.ID} 
                className="relative bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 "
              >
              <div>

                <div className="font-bold text-lg text-gray-800">
                  Transaction ID: <span className="font-normal">{transaction.ID}</span>
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  Sender: <span className="font-medium">{transaction.Sender}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Receiver: <span className="font-medium">{transaction.Receiver}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Amount: <span className="font-medium text-blue-500">{transaction.Amount}</span>
                </div>
                <br />
                <div className="text-sm text-gray-600">
                  Currency: <span className="font-medium ">{transaction.Currency}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Cause: <span className="font-medium ">{transaction.Cause}</span>
                </div>
               </div>
               <div>
                <div className="text-sm text-gray-600 mt-2">
                  Date: <span className="font-medium">{new Date(transaction.CreatedAt).toLocaleString()}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Status: <span className="font-medium">{transaction.Status}</span>
                </div>
               </div>
               <div
  className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full 
             text-gray-500 hover:text-white hover:bg-red-500 cursor-pointer transition-all duration-200"
  onClick={handleDeleteRMV}
>
  <span className="text-lg font-bold">×</span>
</div>


              </div>
            ))}
          </div>
  
}
export default TransactionSearch