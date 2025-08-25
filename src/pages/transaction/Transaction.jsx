import TransactionSearch from './TransactionSearch';
import TransactionTable from './TransactionTable';

const Transaction = ({ searchDetails, handleDeleteRMV }) => {
  return (
    <>
      {searchDetails.length > 0 ? (
        <TransactionSearch
          transaction={searchDetails}
          handleDeleteRMV={handleDeleteRMV}
        />
      ) : (
        <div className="text-center text-gray-500 mt-12 font-Roboto">
          <p className="text-xl">Start typing to search for transactions.</p>
          <p className="text-sm mt-2">
            <span className="font-semibold">Note:</span> Click on a search
            result to view details.
          </p>
        </div>
      )}

      <TransactionTable />
    </>
  );
};

export default Transaction;
