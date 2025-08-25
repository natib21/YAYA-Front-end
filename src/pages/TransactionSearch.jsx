const TransactionSearch = (transaction) => {
   console.log(transaction)
  return <div>
           {transaction.transaction.map((transaction) => (
            <div  key={transaction.ID} 
                className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 transition-transform transform hover:scale-105"
              >
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
                <div className="text-sm text-gray-600">
                  Currency: <span className="font-medium text-blue-500">{transaction.Currency}</span>
                </div>
              </div>
            ))}
          </div>
  
}
export default TransactionSearch