import React, { useState, useEffect } from 'react'
import { Link,NavLink } from 'react-router-dom';
const Header = () => {
  // State to store the current time
  const [time, setTime] = useState('');

  // Function to update the time
  const updateTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0'); // Get the hours
    const minutes = now.getMinutes().toString().padStart(2, '0'); // Get the minutes
    const seconds = now.getSeconds().toString().padStart(2, '0'); // Get the seconds
    const timeString = `${hours}:${minutes}:${seconds}`;
    setTime(timeString); // Update state with the new time
  };

  // Use useEffect to call the updateTime function when the component mounts
  useEffect(() => {
    // Initial time update when component mounts
    updateTime();

    // Update time every second
    const intervalId = setInterval(updateTime, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <header className="shadow sticky z-50 top-0">
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to="/" className="flex items-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmRnedw4r748zoBY2Jhgsk9m52v0qdG8G-UA&s"
                className="mr-3 h-12"
                alt="Logo"
              />
              {/* Live Time */}
              <div className="live-time text-lg font-mono font-semibold bg-gradient-to-r from-red-500 to-red-700 text-white py-2 px-4 rounded-lg shadow-lg">
                <p>{time}</p>
              </div>
            </Link>
            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
                                        ${
                                          isActive
                                            ? "text-orange-700"
                                            : "text-gray-700"
                                        } lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/category"
                    className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
                                        ${
                                          isActive
                                            ? "text-orange-700"
                                            : "text-gray-700"
                                        } lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                    }
                  >
                    Category
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Contact"
                    className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
                                        ${
                                          isActive
                                            ? "text-orange-700"
                                            : "text-gray-700"
                                        } lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                    }
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header