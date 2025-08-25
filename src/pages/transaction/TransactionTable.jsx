import React, { useState, useEffect } from 'react';

const TransactionTable = () => {
  const currentUserId = 'User Account';
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const getTransactionType = (transaction) => {
    // Top-up transaction: sender and recipient are the same user.
    if (
      transaction.Sender === transaction.Receiver &&
      transaction.Sender === currentUserId
    ) {
      return {
        type: 'Top-Up',
        label: 'Top-Up',
        style: 'bg-blue-100 text-blue-600',
        icon: '&#x2b06;', // Upwards arrow
      };
    }
    // Outgoing transaction: sender is the current user.
    if (transaction.Sender === currentUserId) {
      return {
        type: 'Outgoing',
        label: 'Outgoing',
        style: 'bg-red-100 text-red-600',
        icon: '&#x2b06;', // Upwards arrow
      };
    }
    // Incoming transaction: recipient is the current user.
    if (transaction.Receiver === currentUserId) {
      return {
        type: 'Incoming',
        label: 'Incoming',
        style: 'bg-green-100 text-green-600',
        icon: '&#x2b07;', // Downwards arrow
      };
    }
    // If the transaction doesn't involve the current user, it's neutral.
    return {
      type: 'Neutral',
      label: 'Other',
      style: 'bg-gray-100 text-gray-600',
      icon: '',
    };
  };

  useEffect(() => {
    const fetchTableData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:3333/transactions/find_by_user?p=${currentPage}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        setData(result);
        console.log(result);
        // setTotalPages(result.meta.totalPages);
        setTotalPages(result.totalPages); // Placeholder until backend provides totalPages
      } catch (err) {
        setError('Failed to fetch data. Please check your backend server.');
        console.error('Fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTableData();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderTableContent = () => {
    if (isLoading) {
      return (
        <tr>
          <td colSpan="4" className="text-center py-4 text-gray-500">
            Loading...
          </td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr>
          <td colSpan="4" className="text-center py-4 text-red-500">
            {error}
          </td>
        </tr>
      );
    }
    console.log(data.transactions);
    if (data.transactions.length === 0) {
      return (
        <tr>
          <td colSpan="4" className="text-center py-4 text-gray-500">
            No transactions found for this user.
          </td>
        </tr>
      );
    }
    return data.transactions.map((item) => {
      const type = getTransactionType(item);
      return (
        <tr key={item.ID}>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {item.ID}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {item.Sender}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {item.Receiver}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm  font-semibold">
            {item.Cause}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-semibold">
            {item.Amount}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm  font-semibold">
            {item.Currency}
          </td>

          <td className="px-6 py-4 whitespace-nowrap">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${type.style}`}
            >
              <span
                className="mr-1"
                dangerouslySetInnerHTML={{ __html: type.icon }}
              ></span>
              {type.label}
            </span>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="overflow-x-auto shadow-lg rounded-lg w-full max-w-4xl">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Transaction ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Sender
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Receiver
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Cause
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Currency
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {renderTableContent()}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-4 mt-6 text-sm font-Roboto">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-full text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-full text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default TransactionTable;
