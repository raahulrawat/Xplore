import React from 'react'

const Modal = ({ onClose }) => {
    return (
      <div className="fixed inset-0 overflow-y-auto overflow-x-hidden z-50 flex justify-center items-center">
        <div className="fixed inset-0 bg-black bg-opacity-50"></div>
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">
                Terms of Service
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                onClick={onClose}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 space-y-4">
              <p className="text-base leading-relaxed text-gray-500">
                With less than a month to go before the European Union enacts new
                consumer privacy laws for its citizens, companies around the
                world are updating their terms of service agreements to comply.
              </p>
              <p className="text-base leading-relaxed text-gray-500">
                The European Union’s General Data Protection Regulation (G.D.P.R.)
                goes into effect on May 25 and is meant to ensure a common set
                of data rights in the European Union. It requires organizations
                to notify users as soon as possible of high-risk data breaches
                that could personally affect them.
              </p>
            </div>
            <div className="flex items-center p-4 border-t rounded-b">
              <button
                onClick={onClose}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                I accept
              </button>
              <button
                onClick={onClose}
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Modal