import React from "react";
import axios from "axios";


const WordAdd = ({ onSubmit }) => {
 
  return (
    <form>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h2 className="text-2xl text-white font-bold mb-6 text-center">
          Add New  Word
        </h2>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Created On
              </label>
              <input
                type="date"
                id="createdOn"
                name="createdOn"
                required
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Location
              </label>
              <select
                id="location"
                name="location"
                required
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Location</option>
                <option value="1th floor">1th floor</option>
                <option value="2th floor">2th floor</option>
                <option value="3th floor">3th floor</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Service
            </label>
            <input
              type="text"
              id="service"
              name="service"
              placeholder="Enter Service"
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Status</option>
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Escalated">Escalated</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                required
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Department
              </label>
              <select
                id="department"
                name="department"
                required
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Department</option>
                <option value="it">IT</option>
                <option value="Facilities">Facilities</option>
                <option value="Marketing">Marketing </option>
                <option value="Production">Production </option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Requested By
            </label>
            <input
              type="text"
              id="requestedBy"
              name="requestedBy"
              placeholder="Enter Requested By"
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Assigned To
            </label>
            <input
              type="text"
              id="assignedTo"
              name="assignedTo"
              placeholder="Enter Assigned To"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default WordAdd;
