import React from 'react';

const Dashboard = () => {
  const priorityData = [
    { priority: 1, pendingTasks: 3, timeLapsed: '12', timeToFinish: '8' },
    { priority: 2, pendingTasks: 5, timeLapsed: '6', timeToFinish: '3' },
    { priority: 3, pendingTasks: 1, timeLapsed: '8', timeToFinish: '7' },
    { priority: 4, pendingTasks: 0, timeLapsed: '0', timeToFinish: '0' },
    { priority: 5, pendingTasks: 6, timeLapsed: '30', timeToFinish: '6' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-radial from-gray-700 via-gray-900 to-black">
      <div className="container mx-auto py-8 px-4 flex-grow">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500 mb-6 animate-pulse">
            Dashboard
          </h1>

          <h2 className="text-2xl text-black font-semibold mb-4 ">Summary</h2>
          <div className=" text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[
              { title: 'Total Tasks', value: '25' },
              { title: 'Tasks Completed', value: '40%' },
              { title: 'Tasks Pending', value: '60%' },
              { title: 'Average Time Per\nCompleted Task', value: '3.5 Hrs' }
            ].map((stat, index) => (
              <div key={index} 
                className=" text-white bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-lg 
                         shadow-[0_0_15px_rgba(0,0,0,0.2)] backdrop-blur-sm 
                         border border-gray-700/50 
                         hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] 
                         transform hover:-translate-y-1 transition-all duration-300
                         hover:border-gray-600/50">
                <h3 className="text-white text-3xl font-bold mb-2 drop-shadow-lg">{stat.value}</h3>
                <p className="text-white text-center whitespace-pre-line">{stat.title}</p>
              </div>
            ))}
          </div>

          <h2 className=" text-black text-2xl font-semibold mb-4 ">Pending Task Summary</h2>
          <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 p-8 rounded-lg 
                         shadow-[0_0_20px_rgba(0,0,0,0.3)] backdrop-blur-sm border border-gray-700/50 
                         hover:shadow-[0_0_40px_rgba(0,0,0,0.4)] mb-8 transform transition-all duration-300">
            <h3 className="text-2xl text-white bg-gradient-to-r from-purple-500 to-teal-500 font-semibold mb-6">Time Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Pending Tasks', value: '15' },
                { title: 'Total Time Lapsed', value: '56 Hrs' },
                { title: 'Total Time to Finish\nEstimated Based on Endtime', value: '24 Hrs' }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center bg-gray-800/50 p-6 rounded-lg
                                         backdrop-blur-sm border border-gray-700/50
                                         hover:bg-gray-800/70 transition-colors duration-200">
                  <h4 className="text-white text-3xl font-bold mb-2">{item.value}</h4>
                  <p className="text-white text-center whitespace-pre-line">{item.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-lg 
                         shadow-[0_0_20px_rgba(0,0,0,0.3)] backdrop-blur-sm border border-gray-700/50 
                         hover:shadow-[0_0_40px_rgba(0,0,0,0.4)] p-6 transition-all duration-300">
            <h2 className="bg-gradient-to-r from-purple-500 to-teal-500 text-2xl text-white font-semibold mb-4 ">Priority Based Summary</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-b border-gray-700">
                    {['Task Priority', 'Pending Tasks', 'Time Lapsed (Hrs)', 'Time to Finish (Hrs)'].map((header, index) => (
                      <th key={index} className="text-white px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {priorityData.map((item) => (
                    <tr key={item.priority} className="hover:bg-gray-800/30 transition-colors duration-200">
                      <td className="px-6 py-4 text-white font-medium">{item.priority}</td>
                      <td className="px-6 py-4 text-white">{item.pendingTasks}</td>
                      <td className="px-6 py-4 text-white">{item.timeLapsed}</td>
                      <td className="px-6 py-4 text-white">{item.timeToFinish}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <footer className="bg-gradient-to-r from-purple-500 to-teal-500 text-white py-6 text-center border-t border-gray-700">
          <p className="text-lg font-medium tracking-wide animate-pulse">DEVELOPED BY SAURABH KUMAR</p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;















