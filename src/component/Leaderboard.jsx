import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState([]); // State to hold leaderboard data
    const url = import.meta.env.VITE_BASE_URL
    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const response = await fetch(`${url}getleaderboard/`);
                console.log(response)
                setLeaderboardData(response.data.results);
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
            }
        };
        fetchLeaderboardData(); // Call the fetchLeaderboardData function when the component mounts
    }, []); // Empty dependency array ensures the effect runs only once after the initial render
    return (
        <div className="flex items-center justify-center">
            <div className=" rounded-xl bg-indigo-600 items-center overflow-x-auto justify-center shadow-lg">
                <table className="text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-white uppercase  bg-indigo-600 ">
                        <tr className=''>
                            <th scope="col" className="px-6 py-3">
                                User Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ranking
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Problems Solved
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Points
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboardData.map((user, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white border-b dark:bg-gray-800' : 'bg-white border-b'}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {user.user_name}
                                </th>
                                <td className="px-6 py-4">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4">
                                    {user.solved_challenges}
                                </td>
                                <td className="px-6 py-4">
                                    {user.total_bounty_earned}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Leaderboard;